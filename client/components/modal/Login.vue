<template>
  <div v-if="modal.login.show" class="modal-outside">
    <div id="login-modal">
      <div class="head">
        <h5>{{modal.login.directLogin ? "로그인": "블라인드 OTP 안전 인증"}}</h5>
        <a @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_CLOSE')" class="close-btn">
          <img src="/icon/close.png" alt="닫기" />
        </a>
      </div>
      <!-- directLogin 이 아닌 경우에 -->
      <div v-if="!modal.login.directLogin" class="body">
        <p>블라인드 앱의 마이페이지 > 블라인드 웹 로그인 메뉴에서 아래 생성된 일회용 인증코드 8자리를 입력하시면 웹에서도 모든 기능을 이용할 수 있습니다.</p>
        <div class="info">블라인드 OTP</div>
        <button class="otp-btn">U - 460 - 6051</button>
        <!-- 남은 시간은 nuxtMoment 를 사용한다.-->
        <div class="left-time">남은 시간: {{displayTime}}</div>
      </div>
      
      <!-- 다이렉트 로그인을 한 경우. 로그인을 하기 위한 창을 띄운다 -->
      <div v-else class="body">
        <div class="row">
          <label for="user-email">이메일</label>
          <input id="user-email" type="email" v-model="email" />
        </div>
        <div class="row">
          <label for="user-password">비밀번호</label>
          <input id="user-password" type="password" v-model="password" />
        </div>
        <button class="login-btn" @click="loginWithEmail">이메일로 로그인</button>
      </div>
      <div v-if="!modal.login.directLogin" class="foot">
        <!-- div 말고 a 를 사용. 기능을 사용할 때는 button 이나 a 를 사용해서 통일성을 준다 -->
        <a @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_DIRECT_LOGIN')">블라인드에 처음이신가요?</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {

  computed: { ...mapState(["modal"]) },

  data() {
    return {
      // 로컬 상태를 만들어줘야 한다. 180토로 만든다.
      leftTime: 180,
      // 처음 보여주는 시간은 3분
      displayTime: "3분",
      email: null,
      password: null
    };
  },

  // show 가 true 일 때만 시간이 돌아가도록 하는 것.
  // to 가 현재 상태, from 이 이전 상태를 의미한다.
  watch: {
    "modal.login.show": function(to, from) {
      if (to !== from && to) {
        this.leftTime = 180;
        setInterval(() => {
          this.timeModifier();
        }, 1000);
      }
    }
  },

  methods: {
    async loginWithEmail() {
      const data = await this.$axios.$post(`http://localhost:9090/user/login`, {
        email: this.email,
        password: this.password
      });

      // 로그인에 에러가 발생했을 때
      if (data.error) {
        return;
      }

      this.$store.commit("user/SET_USER", {
        email: data.email,
        nickname: data.nickname,
        token: data.token
      });
      // 창 닫아버리기
      this.$store.commit("modal/SET_LOGIN_MODAL_CLOSE");
    },
    // 시간에 대해서 좀더 친절하게 설명해주기 위한 부분
    timeModifier() {
      // setInterval 로 계속 1초씩 없애는 것 
      this.leftTime -= 1;
      if (this.leftTime <= 0) {
        this.leftTime = 180;
        this.displayTime = `3분`;
      } else if (this.leftTime >= 120) {
        this.displayTime = `2분 ${this.leftTime - 120}초`;
      } else if (this.leftTime >= 60) {
        this.displayTime = `1분 ${this.leftTime - 60}초`;
      } else {
        this.displayTime = `${this.leftTime}초`;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#login-modal {
  background: white;
  width: 520px;
  .body {
    font-size: 16px;
    padding: 0 30px;
    line-height: 24px;
    p {
      padding: 20px 0;
      margin: 0;
    }
    .info {
      color: rgb(148, 150, 155);
      font-size: 14px;
      letter-spacing: -0.1px;
      margin: 20px 0 30px;
      line-height: 21px;
    }
    .row {
      margin: 20px 0;
      label {
        display: block;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 12px;
      }
    }
    .otp-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgb(55, 172, 201);
      border: none;
      color: white;
      font-size: 40px;
      font-weight: 400;
      width: 100%;
      height: 82px;
    }
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgb(55, 172, 201);
      border: none;
      color: white;
      font-size: 24px;
      font-weight: 400;
      width: 100%;
      height: 64px;
      margin-bottom: 30px;
    }
    .left-time {
      text-align: center;
      color: rgb(55, 172, 201);
      font-size: 14px;
      font-weight: 700;
      margin-top: 16px;
    }
  }
  .foot {
    color: rgb(160, 160, 174);
    font-size: 14px;
    line-height: 17.5px;
    text-align: center;
    text-decoration: underline;
    padding: 30px;
  }
}
</style>

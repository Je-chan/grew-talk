<template>
  <nav>
    <div class="left-side">
      <nuxt-link to="/">
        <img src="/logo/gridwiz.svg" alt="그리드위즈">
      </nuxt-link>
      <nuxt-link to="/">
        홈
      </nuxt-link>
      <nuxt-link to="/">
        부서 리뷰
      </nuxt-link>
    </div>
    <div class="right-side">
      <SmallSearchBar />
      <a @click.prevent="clickWritingButton">글쓰기</a>
      <a @click.prevent="clickLoginButton">로그인</a>
    </div>
    <LoginModal />
    <!-- <Writing /> -->
  </nav>
</template>
<script>
import LoginModal from '@/components/Modal/Login'
// import Writing from '@/components/Modal/Writing'
import SmallSearchBar from '@/components/GNB/SmallSearchBar'
import {mapState} from 'vuex'

export default {
  components: {
    LoginModal,
    // Writing,
    SmallSearchBar
  },

  computed: {
    ...mapState(["user"])
  },

  methods: {
    clickWritingButton() {
      if(!this.user.email) {
        this.$store.commit('modal/SET_LOGIN_MODAL_OPEN')
      }
    },
    clickLoginButton() {
      if(!this.user.email) {
        this.$store.commit('modal/SET_LOGIN_MODAL_OPEN')
      }
    }
  }
}
</script>
<style lang="">
  
</style>
<template>
  <div>
    <GNB />
    <Nuxt />
  </div>
</template>
<script>
export default {
  created() {
    this.initLogin();
  },
  methods: {
    async initLogin() {
      // Nuxt 는 서버와 브라우저가 같이 작동하는 거다 보니 process 가 서버일 때 호출되면 localstorage 가 undefined 로 나온다.
      // 브라우저 안에 있을 때는 localstorage 접근이 가능하다.
      if (process.browser) {
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await this.$api.$get("/user/token");

        if (!data.email) {
          return;
        }

        this.$store.commit("user/SET_USER", {
          email: data.email,
          nickname: data.nickname,
          token: token
        });
      }
    }
  }
};
</script>

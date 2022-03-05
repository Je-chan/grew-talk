// Nuxt/axios 에서 복붙해온 내용에 localStorage 접근을 위해 process.browser 내용을 추가함
export default function ({ $axios }, inject) {
  // Create a custom axios instance
  if (process.browser) {
    const token = localStorage.getItem("token");
    const api = $axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Set baseURL to something different
    api.setBaseURL(
      // process.env.NODE_ENV === "production"
      //   ? "http://fastcampusblindclone-env.eba-p687fdja.us-east-1.elasticbeanstalk.com/"
      //   : "http://localhost:8080"
      "http://localhost:9090"
    );

    // 나중에 this.$api 로 접근할 수 있도록 함
    inject("api", api);
  }
}

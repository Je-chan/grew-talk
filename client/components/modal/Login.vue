<template>
  <div v-if="modal.login.show" class="modal-outside">
    <div class="login-modal">
      <div class="head">
        <h5>블라인드 OTP 안전 인증</h5>
        <a @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_CLOSE')" class="close-btn">
          <img src="" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {...mapState(['modal'])}
}
</script>
<style lang="scss">
  
</style>
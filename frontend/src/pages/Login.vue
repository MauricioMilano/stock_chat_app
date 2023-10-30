<template>
  <div class="q-ma-md">
    <div class="q-gutter-md">
      <q-card class="my-card login-box">
        <h3 class=".text-h3 login-title"> Login</h3>
        <q-card-section>

          <q-input v-model="email" label="email" :bla="true" class="input"   v-on:keyup.enter="login"/>
          <q-input v-model="password" type="password" label="password" class="input"  v-on:keyup.enter="login" />
          <q-btn color="primary" label="Login" @click="login" :loading="isLoading" class="btn-login" />
        </q-card-section>
        <q-card-section>
          <p class="login-text-below">Not registered? <a href="/#" @click="SignupPage">Signup now</a></p>
        </q-card-section>
      </q-card>


    </div>

  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  beforeCreate() {
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$router.push({ path: '/chat' })
    }
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
    console.log(this.$moment().format('MMMM Do YYYY, h:mm:ss a'))
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  },
  methods: {
    async login() {
      try {
        this.isLoading = !this.isLoading
        await this.$store.dispatch('auth/AUTH_REQUEST', { email: this.email, password: this.password })
        this.$router.push({ path: '/chat' })
        this.isLoading = !this.isLoading
      } catch (error) {
        this.isLoading = !this.isLoading
      }
    },
    SignupPage() {
      this.$router.push({ path: '/signup' })

    }  
  }
}
</script>

<style>
.login-box {
  display: block;
  width: 800px;
  margin: 0 auto;
}

.login-text-below {
  display: block;
  width: 205px;
  margin: 0 auto;
}
.input {
  border:1px solid #e6e6e6;
  margin-bottom:10px;
  background-color: white;
  padding-left: 10px;
}
.login-title{
  position: relative;
  color: black;
  font-size: 2em;
  top:11px;
  margin-left:15px;
  margin-bottom:10px;
}
.btn-login {

  margin: 20px auto 0 auto;
  display: block;
}

</style>
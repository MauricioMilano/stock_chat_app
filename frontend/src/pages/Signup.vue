<template>
  <div class="q-ma-md">
    <div class="q-gutter-md">
      <q-card class="my-card login-box">
        <h3 class=".text-h3 login-title"> Signup</h3>
        <q-card-section>

          <q-input v-model="name" label="Name" :bla="true" class="input" v-on:keyup.enter="Signup" />
          <q-input v-model="email" label="Email" :bla="true" class="input" v-on:keyup.enter="Signup" />
          <q-input v-model="password" type="password" label="password" class="input"  v-on:keyup.enter="Signup"/>
          <q-btn color="primary" label="Enviar" @click="Signup" :loading="isLoading"  />
        </q-card-section>

        <q-card-section>
          <p class="signup-text-below">Do you have an account? <a href="/#" @click="LoginPage">Login Here</a></p>
        </q-card-section>
        </q-card>


    </div>

  </div>
</template>

<script>

export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      password: '',
      email:'',
      isLoading: false
    }
  },
  created() {
    console.log(this.$moment().format('MMMM Do YYYY, h:mm:ss a'))
  },

  methods: {
    async Signup() {
      try {
        this.isLoading = !this.isLoading
        await this.$store.dispatch('auth/SIGNUP_REQUEST', { "user_name": this.name, email: this.email, password: this.password })
        
        this.$router.push({ path: '/chat' })
        this.isLoading = !this.isLoading
      } catch (error) {
        this.isLoading = !this.isLoading
      }
    }, 
    LoginPage() {
      this.$router.push({ path: '/login' })

    }  

  }
}
</script>

<style>
.login-box {
  margin: 10% 15% 10% 15%;
}

.signup-text-below {
  display: block;
  width: 245px;
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
  top:10px;
  margin-left:15px;
  margin-bottom:10px;
}
</style>
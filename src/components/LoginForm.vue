<template>
  <form class="login" @submit.prevent="login" novalidate>
    <h2>Login</h2>
    <p class='error' v-if="$store.state.errorsLogin.auth">{{ $store.state.errorsLogin.auth }}</p>
    <p class='error' v-if="$store.state.errorsLogin.email">{{ $store.state.errorsLogin.email }}</p>
    <input
    type="email"
    placeholder="Email Address"
    v-model="loginForm.email"
    />
    <p class='error' v-if="$store.state.errorsLogin.password">{{ $store.state.errorsLogin.password}}</p>
    <input
    type="password"
    placeholder="Password"
    v-model="loginForm.password"
    />
    <input type="submit" value="Login" />
    <NavAccess />
  </form>
</template>

<script>
import { ref } from 'vue'
import router from '../router'
import store from '../store'

import NavAccess from '../components/NavAccess'

export default {
  name: 'LoginForm',
  components: {
    NavAccess
  },
  data () {
    return {}
  },
  setup () {
    store.dispatch('clearFormErrors')
    const loginForm = ref({})
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // console.table(loginForm)
    const login = async () => {
      store.dispatch('clearFormErrors')
      if (!loginForm.value.email) {
        store.dispatch('setLoginErrors', { id: 'login', type: 'email', message: 'Enter your email' })
      } else {
        if (!emailRegex.test(loginForm.value.email)) {
          store.dispatch('setLoginErrors', { id: 'login', type: 'email', message: 'invalid email' })
        }
      }
      if (!loginForm.value.password) {
        store.dispatch('setLoginErrors', { id: 'login', type: 'password', message: 'Enter your password' })
      }
      if (Object.keys(store.state.errorsLogin).length > 0) {
        console.log('store.state.errorsLogin')
        return
      }
      try {
        await store.dispatch('login', loginForm.value)
        router.push('/dashboard')
      } catch (error) {
        // console.log(error.code)
        switch (error.code) {
          case 'auth/user-not-found':
            store.dispatch('setLoginErrors', { id: 'login', type: 'auth', message: 'User Not Found' })
            break
          case 'auth/wrong-password':
            store.dispatch('setLoginErrors', { id: 'login', type: 'auth', message: 'Invalid Password' })
            break
          case 'auth/invalid-email':
            store.dispatch('setLoginErrors', { id: 'login', type: 'auth', message: 'Invalid Email' })
            break
          default:
            store.dispatch('setLoginErrors', { id: 'login', type: 'auth', message: error.code })
        }
      }
    }
    return {
      loginForm,
      login
    }
  },
  methods: {},
  mounted () {}
}
</script>

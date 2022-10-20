<template>
  <form class="register" @submit.prevent="register" novalidate>
    <h2>Register</h2>
    <p class='error' v-if="$store.state.errorsRegister.auth">{{ $store.state.errorsRegister.auth }}</p>
    <p class='error' v-if="$store.state.errorsRegister.displayName">{{ $store.state.errorsRegister.displayName }}</p>
    <input
      type="displayName"
      placeholder="Display Name"
      v-model="registerForm.displayName"
    />
    <p class='error' v-if="$store.state.errorsRegister.email">{{ $store.state.errorsRegister.email }}</p>
    <input
      type="email"
      placeholder="Email Address"
      v-model="registerForm.email"
    />
    <p class='error' v-if="$store.state.errorsRegister.password">{{ $store.state.errorsRegister.password }}</p>
    <input
      type="password"
      placeholder="Password"
      v-model="registerForm.password"
    />
    <p class='error' v-if="$store.state.errorsRegister.confirmPassword">{{ $store.state.errorsRegister.confirmPassword }}</p>
    <input
      type="password"
      placeholder="Confirm Password"
      v-model="registerForm.confirmPassword"
    />
    <input type="submit" value="Register" />
    <NavAccess />
  </form>
</template>

<script>
import { ref } from 'vue'
import router from '../router'
import store from '../store'

import NavAccess from '../components/NavAccess'

export default {
  name: 'RegisterForm',
  components: {
    NavAccess
  },
  setup () {
    store.dispatch('clearFormErrors')
    const registerForm = ref({})
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const register = async () => {
      console.log('reg')
      store.dispatch('clearFormErrors')
      if (!registerForm.value.email) {
        store.dispatch('setRegisterErrors', { id: 'register', type: 'email', message: 'Enter your email' })
      } else {
        if (!emailRegex.test(registerForm.value.email)) {
          store.dispatch('setRegisterErrors', { id: 'register', type: 'email', message: 'invalid email' })
        }
      }
      if (!registerForm.value.displayName) {
        store.dispatch('setRegisterErrors', { id: 'register', type: 'displayName', message: 'Enter your display name' })
      }
      if (!registerForm.value.password) {
        store.dispatch('setRegisterErrors', { id: 'register', type: 'password', message: 'Enter a password' })
      }
      if (!registerForm.value.confirmPassword) {
        store.dispatch('setRegisterErrors', { id: 'register', type: 'confirmPassword', message: 'Confirm your password' })
      }
      // match passwords
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        store.dispatch('setRegisterErrors', { id: 'register', type: 'confirmPassword', message: 'Passwords do not match' })
      }
      if (Object.keys(store.state.errorsRegister).length > 0) {
        console.log('store.state.errorsRegister')
        return
      }
      try {
        await store.dispatch('register', registerForm.value).then((res) => {
          store.dispatch('update', registerForm.value).then((res) => {
            console.log(res)
          }).then((res) => {
            store.dispatch('sendVerify', registerForm.value).then((res) => {
              console.log(res)
            }).then((res) => {
              console.log(res)
              router.push('/dashboard')
            })
          })
        })
      } catch (error) {
        console.log(error.code)
        switch (error.code) {
          case 'auth/email-already-in-use':
            store.dispatch('setRegisterErrors', { id: 'register', type: 'email', message: 'Email is already registered' })
            break
          case 'auth/invalid-email':
            store.dispatch('setRegisterErrors', { id: 'register', type: 'email', message: 'Email is invalid' })
            break
          default:
            store.dispatch('setRegisterErrors', { id: 'register', type: 'auth', message: error.code })
        }
      }
    }
    return {
      registerForm,
      register
    }
  }
}
</script>

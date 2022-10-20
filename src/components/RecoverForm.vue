<template>
  <form class="recover" @submit.prevent="recover" novalidate>
    <h2>Recover</h2>
    <p class='error' v-if="$store.state.errorsRecover.auth">{{ $store.state.errorsRecover.auth }}</p>
    <p class='error' v-if="$store.state.errorsRecover.email">{{ $store.state.errorsRecover.email}}</p>
    <input
    type="email"
    placeholder="Email Address"
    v-model="recoverForm.email"
    />
    <input type="submit" value="Recover" />
    <NavAccess />
  </form>
</template>

<script>
import { ref } from 'vue'
import router from '../router'
import store from '../store'

import NavAccess from '../components/NavAccess'

export default {
  name: 'RecoverForm',
  components: {
    NavAccess
  },
  data () {
    return {}
  },
  setup () {
    store.dispatch('clearFormErrors')
    const recoverForm = ref({})
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const recover = async () => {
      store.dispatch('clearFormErrors')
      if (!recoverForm.value.email) {
        store.dispatch('setRecoverErrors', { id: 'recover', type: 'email', message: 'Enter your email' })
      } else {
        if (!emailRegex.test(recoverForm.value.email)) {
          store.dispatch('setRecoverErrors', { id: 'recover', type: 'email', message: 'invalid email' })
        }
      }
      if (Object.keys(store.state.errorsRecover).length > 0) {
        return
      }
      try {
        await store.dispatch('recover', recoverForm.value)
        router.push('/recover')
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            store.dispatch('setRecoverErrors', { id: 'recover', type: 'auth', message: 'User Not Found' })
            break
          case 'auth/wrong-password':
            store.dispatch('setRecoverErrors', { id: 'recover', type: 'auth', message: 'Invalid Password' })
            break
          case 'auth/invalid-email':
            store.dispatch('setRecoverErrors', { id: 'recover', type: 'auth', message: 'Invalid Email' })
            break
          default:
            store.dispatch('setRecoverErrors', { id: 'recover', type: 'auth', message: error.code })
        }
      }
    }
    return {
      recoverForm,
      recover
    }
  },
  methods: {},
  mounted () {}
}
</script>

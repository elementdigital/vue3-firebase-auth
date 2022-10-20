<template>
  <div class="home">
    <h1>Home</h1>
    <p v-if="$store.state.user"><b>Display Name:</b> {{ this.$store.state.user.displayName }}</p>
    <p v-if="$store.state.user"><b>Email Address:</b> {{ $store.state.user.email }}</p>
    <p>Vue3 / Firebase user authentication</p>
    <div>
    <ul>
      <li>Persistent login</li>
      <li>Direct URLs</li>
      <li>email verification</li>
      <li>Field Validation</li>
      <li>Field Validation</li>
      <li>Field Validation</li>
    </ul>
    </div>
    <div class="navaccess">
      <router-link to="/register" v-if="!$store.state.user">Register</router-link>
      <router-link to="/login" v-if="!$store.state.user">Login</router-link>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
// import NavAccess from '../components/NavAccess'

export default {
  name: 'HomeView',
  setup () {}
}
</script>

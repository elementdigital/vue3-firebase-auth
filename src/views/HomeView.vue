<template>
  <div class="home">
    <h1>Vue3 Firebase User Authentication</h1>
    <div class="home-logo">
      <img alt="Vue logo" src="../assets/logo.png" />
      <span class="plussign">+</span>
      <img alt="Vue logo" src="../assets/firebase-logo-vertical-200.jpg" />
    </div>
    <p>This is a basic starting point up for building a user authentication based vue3 application using Google Firebase Authentication.</p>
    <p>Utilizing; Create User, Sign In, Email Verification, Password Reset, Persistant Log In, and Delete methods from the Firebase API.</p>
    <p>Includes form validation and re-authentication methods allowing direct authenticated url access to sections of the single page application.</p>
    <p>Includes auth and not auth routing guards and 404 routing.</p>
    <p>Initially generated using Vue3 CLI, including router and vuex libraries</p>
    <div class="navaccess">
      <router-link v-if="!$store.state.user" to="/register" >Register</router-link>
      <router-link v-if="!$store.state.user" to="/login" >Login</router-link>
      <router-link to="/dashboard" v-if="$store.state.user">Dashboard ({{ $store.state.user.displayName }})</router-link>
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

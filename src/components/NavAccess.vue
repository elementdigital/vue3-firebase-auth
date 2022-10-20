<template>
    <div class="navaccess">
      <router-link to="/access" v-if="!$store.state.user">Access</router-link>
      <router-link to="/register" v-if="!$store.state.user">Register</router-link>
      <router-link to="/login" v-if="!$store.state.user">Login</router-link>
      <router-link to="/recover" v-if="!$store.state.user">Forgot Password</router-link>
    </div>
</template>

<script>
export default {
  name: 'NavAccess'
}
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/dashboard" v-if="$store.state.user">Dashboard</router-link>
    <router-link to="/access" v-if="!$store.state.user">Access</router-link>
    <router-link to="/register" v-if="!$store.state.user">Register</router-link>
    <router-link to="/login" v-if="!$store.state.user">Login</router-link>
    <button @click.prevent="logout()" v-if="$store.state.user">Log Out</button>
    <button @click.prevent="deleteUser()" v-if="$store.state.user">Delete User</button>
    <div>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/access">Access</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationMain',
  props: ['logout', 'deleteUser']
}
</script>

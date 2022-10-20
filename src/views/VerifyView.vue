<template>
  <div class="verify">
    <h1>verify</h1>
    <p v-if="$store.state.user"><b>Display Name:</b> {{ this.$store.state.user.displayName }}</p>
    <p v-if="$store.state.user"><b>Email Address:</b> {{ $store.state.user.email }}</p>
  </div>
  <button @click="logout()" v-if="$store.state.user">Log Out</button>
  <button @click="deleteUser()" v-if="$store.state.user">Delete User</button>
  <div>
    <p style="text-align:left;" v-if="$store.state.user"><b>User Data:</b> <pre>{{ $store.state.user }}</pre></p>
  </div>
</template>

<script>
export default {
  name: 'verifyView',
  props: ['logout', 'deleteUser'],
  setup () {}
}
</script>

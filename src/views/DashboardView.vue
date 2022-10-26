<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <img v-if="$store.state.user" v-bind:src="$store.state.user.photoURL" />
    <!--p v-if="$store.state.user">{{ $store.state.user.photoURL }}</p-->
    <p v-if="$store.state.user"><b>Display Name:</b> {{ $store.state.user.displayName }}</p>
    <p v-if="$store.state.user"><b>Email Address:</b> {{ $store.state.user.email }}</p>
    <p v-if="$store.state.user"><b>Is Verified Email:</b> {{ $store.state.user.emailVerified }}</p>
    <p v-if="$store.state.user"><b>Is Annonomyous User:</b> {{ $store.state.user.isAnonymous }}</p>
    <p v-if="$store.state.user"><b>Created:</b> {{$store.state.user.metadata.createdAt}}, {{ $store.state.user.metadata.creationTime }}</p>
    <p v-if="$store.state.user"><b>Last Login:</b> {{ $store.state.user.metadata.lastLoginAt }}, {{ $store.state.user.metadata.lastSignInTime }}</p>
    <button @click="logout()" v-if="$store.state.user">Log Out</button>
    <button @click="deleteUser()" v-if="$store.state.user">Delete User</button>
    <!--div>
      <p style="text-align:left;" v-if="$store.state.user"><b>User Data:</b> <pre>{{ $store.state.user }}</pre></p>
    </div-->
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  props: ['logout', 'deleteUser'],
  setup () {}
}
</script>

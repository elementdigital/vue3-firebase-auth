<template>
  <main class="login">
    <section class="forms">
      <LoginForm />
    </section>
  </main>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  name: 'LoginView',
  props: [],
  components: {
    LoginForm
  },
  setup () {
    return {}
  }
}
</script>

<style scoped>
</style>

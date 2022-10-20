<template>
  <main class="login">
    <section class="forms">
      <RegisterForm />
      <LoginForm />
    </section>
  </main>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default {
  name: 'AccessView',
  props: [],
  components: {
    LoginForm,
    RegisterForm
  },
  setup () {
    return {}
  }
}
</script>

<style>
</style>

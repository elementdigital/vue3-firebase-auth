<template>
  <main class="login">
    <section class="forms">
      <RegisterForm />
    </section>
  </main>
</template>

<script>
import RegisterForm from '../components/RegisterForm'

export default {
  name: 'LoginView',
  props: [],
  components: {
    RegisterForm
  },
  setup () {
    return {}
  }
}
</script>

<style scoped>
</style>

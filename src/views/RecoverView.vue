<template>
  <main class="recover">
    <section class="forms">
      <RecoverForm />
    </section>
  </main>
</template>

<script>
import RecoverForm from '../components/RecoverForm'

export default {
  name: 'RecoverView',
  props: [],
  components: {
    RecoverForm
  },
  setup () {
    return {}
  }
}
</script>

<style scoped>
</style>

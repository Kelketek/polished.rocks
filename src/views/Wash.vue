<template>
<v-container>

</v-container>
</template>

<script>
export default {
  name: 'Wash.vue',
  created () {
    if (this.$store.state.running) {
      this.router.replace({ name: 'Placeholder' })
    }
  }
}
</script>

<style scoped>

</style>

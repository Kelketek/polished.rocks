<template>
  <v-container>
    <TheTumbler />
  </v-container>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import TheTumbler from '../components/TheTumbler.vue'

export default defineComponent({
  name: 'Tumbler',
  components: {
    TheTumbler
  }
})
</script>

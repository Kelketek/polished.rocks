<template>
  <v-container>
    <TrophyCase />
  </v-container>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import TrophyCase from '../components/TrophyCase.vue'

export default defineComponent({
  name: 'Trophy',
  components: {
    TrophyCase
  }
})
</script>

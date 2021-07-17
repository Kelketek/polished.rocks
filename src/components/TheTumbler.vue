<template>
  <h1>Next Stop: {{ nextStop }}</h1>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheTumbler',
  computed: {
    nextStop () {
      return new Date(this.$store.state.nextStop)
    }
  }
})

// export const getSecondsUntilStageIsDone = (): number => {
//   return 0
// }

</script>

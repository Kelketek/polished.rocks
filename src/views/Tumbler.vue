<template>
  <v-container>
    <v-row class="align-center">
      <v-col class="align-center">
        <TheTumbler />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import TheTumbler from '../components/TheTumbler.vue'

export default defineComponent({
  name: 'Tumbler',
  components: {
    TheTumbler
  }
})

</script>

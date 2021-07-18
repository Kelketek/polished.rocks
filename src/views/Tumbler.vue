<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="text-left">
          <v-card-title elevation="2">
            Info about what is currently tumbling
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit architecto tempora a quaerat itaque harum veritatis repellat officia fugit commodi numquam laboriosam, omnis, quasi delectus deserunt dolor est perspiciatis ab.
          </v-card-text>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>
          <v-card-subtitle>
            Last recorded image of what is currently tumbling
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
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

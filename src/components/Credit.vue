<template>
    <v-card>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
        height="200px"
      ></v-img>

      <v-card-title>
        <a :href="link" target="_none">{{ firstName }} {{ lastName }}</a>
      </v-card-title>
      <v-card-text>
        <v-card-subtitle>
          {{ title }}
        </v-card-subtitle>
        <v-divider class="py-2" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptates magnam ratione mollitia. Tempore quam repudiandae autem ex dolor adipisci corrupti molestias ipsa architecto sed, aliquid nemo ad quas quod!</p>
      </v-card-text>
    </v-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Credit',
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: false
    }
  }
})
</script>

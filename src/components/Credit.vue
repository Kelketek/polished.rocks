<template>
    <v-card class="credit-card">
      <v-img
        :src="image"
      ></v-img>

      <v-card-title class="title-text">
        <a :href="link" target="_none">{{ firstName }} {{ lastName }}</a>
      </v-card-title>

      <v-card-subtitle class="name-text">
        {{ title }}
      </v-card-subtitle>

      <hr>
      <v-card-subtitle class="description-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptates magnam ratione mollitia. Tempore quam repudiandae autem ex dolor adipisci corrupti molestias ipsa architecto sed, aliquid nemo ad quas quod!
      </v-card-subtitle>
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
    },
    blurb: {
      type: String,
      required: false
    }
  }
})
</script>

<style scoped>
.title-text {
  padding: 0 0.5em;
}
.name-text {
  padding: 1em;
}
.description-text {
  padding: 1em;
}
.credit-card {
  width: auto;
  background-color: darkgray;
  color: white;
}
</style>

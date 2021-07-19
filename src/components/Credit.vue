<template>
    <v-card>
      <v-img
        :src="image"
        :aspect-ratio="800/1198"
      ></v-img>

      <v-card-title>
        <a :href="link" target="_none">{{ firstName }} {{ lastName }}</a>
      </v-card-title>
      <v-card-text>
        <v-card-subtitle>
          {{ title }}
        </v-card-subtitle>
        <v-divider class="py-2" />
        <v-col v-html="blurb" />
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
    },
    blurb: {
      type: String,
      required: false
    }
  }
})
</script>

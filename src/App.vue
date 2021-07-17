<template>
  <v-app theme="dark">
    <v-main>
      <router-view/>
    </v-main>
    <div id="footer" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  }
})
</script>

<template>
  <v-container>
    <v-row class="pun-blurb">
      <h1>Get your shine on!</h1>

      <p>
        Our team has been rocking hard to bring you the most imersive, complete rock-tumbling experience that you won't take for granite!
        So don't quarry about it!  Even if you've hit rock bottom, we're here to bring the power to the pebble with our marbelous virtual tumbler!
        Now you don't have to wait for rocks to go on shale in order to get your shine on!  Click on our names below if you'd like to chalk to one of us
        or just send us some lava!
      </p>
    </v-row>
    <hr style="margin:1em;">
    <v-row>
      <v-col cols="4" v-for="(item, index) in items" :key="index">
        <Credit :firstName="item.firstName" :lastName="item.lastName" :title="item.title" :link="item.link" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Credit from '../components/Credit.vue'
export default defineComponent({
  name: 'Credits',
  components: {
    Credit
  },
  data () {
    return {
      items: [
        { firstName: 'Fox', lastName: 'Piacenti', title: 'Founder & CEO', link: 'https://www.artconomy.com' },
        { firstName: 'Joseph', lastName: 'Piacenti', title: 'Animator & Sound Engineer' },
        { firstName: 'Jeremy', lastName: 'Evans', title: 'Visual Artist' },
        { firstName: 'Brad', lastName: 'Rogers', title: 'Designer' },
        { firstName: 'Corey', lastName: 'Pon', title: 'Software Engineer', link: 'https://www.github.com/cjames9001' },
        { firstName: 'Taylor', lastName: 'Glenn', title: 'Software Engineer' }
      ]
    }
  }
})

</script>

<style>
body {
  margin: 1em !important;
}
.pun-blurb {
  margin: 0;
}
</style>

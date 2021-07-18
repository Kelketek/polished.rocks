<template>
  <v-container>
    <v-row class="pun-blurb">
      <v-col>
        <h1>Get your shine on!</h1>
        <p>
          Our team has been rocking hard to bring you the most imersive, complete rock-tumbling experience that you won't take for granite!
          So don't quarry about it!  Even if you've hit rock bottom, we're here to bring the power to the pebble with our marbelous virtual tumbler!
          Now you don't have to wait for rocks to go on shale in order to get your shine on!  Click on our names below if you'd like to chalk to one of us
          or just send us some lava!
        </p>
      </v-col>
    </v-row>
    <v-divider class="py-2" />
    <v-row>
      <v-col cols="4" v-for="(item, index) in items" :key="index">
        <Credit :firstName="item.firstName" :lastName="item.lastName" :title="item.title" :link="item.link" :image="item.image" :blurb="item.blurb" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Credit from '../components/Credit.vue'
import { CREW_DATA } from '@/constants'

export default defineComponent({
  name: 'Credits',
  components: {
    Credit
  },
  data () {
    return {
      items: [
        { firstName: CREW_DATA.FOX.FIRST_NAME, lastName: CREW_DATA.FOX.LAST_NAME, title: CREW_DATA.FOX.TITLE, link: CREW_DATA.FOX.LINK, image: CREW_DATA.FOX.PHOTO_PATH, blurb: CREW_DATA.FOX.BLURB },
        { firstName: CREW_DATA.JOE.FIRST_NAME, lastName: CREW_DATA.JOE.LAST_NAME, title: CREW_DATA.JOE.TITLE, link: CREW_DATA.JOE.LINK, image: CREW_DATA.JOE.PHOTO_PATH, blurb: CREW_DATA.JOE.BLURB },
        { firstName: CREW_DATA.JEREMY.FIRST_NAME, lastName: CREW_DATA.JEREMY.LAST_NAME, title: CREW_DATA.JEREMY.TITLE, link: CREW_DATA.JEREMY.LINK, image: CREW_DATA.JEREMY.PHOTO_PATH, blurb: CREW_DATA.JEREMY.BLURB },
        { firstName: CREW_DATA.BRAD.FIRST_NAME, lastName: CREW_DATA.BRAD.LAST_NAME, title: CREW_DATA.BRAD.TITLE, link: CREW_DATA.BRAD.LINK, image: CREW_DATA.BRAD.PHOTO_PATH, blurb: CREW_DATA.BRAD.BLURB },
        { firstName: CREW_DATA.COREY.FIRST_NAME, lastName: CREW_DATA.COREY.LAST_NAME, title: CREW_DATA.COREY.TITLE, link: CREW_DATA.COREY.LINK, image: CREW_DATA.COREY.PHOTO_PATH, blurb: CREW_DATA.COREY.BLURB },
        { firstName: CREW_DATA.TAYLOR.FIRST_NAME, lastName: CREW_DATA.TAYLOR.LAST_NAME, title: CREW_DATA.TAYLOR.TITLE, link: CREW_DATA.TAYLOR.LINK, image: CREW_DATA.TAYLOR.PHOTO_PATH, blurb: CREW_DATA.TAYLOR.BLURB }
      ]
    }
  }
})

</script>

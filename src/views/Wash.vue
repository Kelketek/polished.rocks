<template>
  <div class="text-center">
    <!-- Can't factor out the require call into a computed property or webpack will choke on it. -->
    <img :src="require('../assets/hoseopen.svg')" width="30%" :class="{'d-inline-block': playing, 'd-none': !playing, shrunk: true}" />
    <img :src="require('../assets/hoseclosed.svg')" width="30%" :class="{'d-inline-block': !playing, 'd-none': playing, shrunk: true}" />
  </div>
  <div class="text-center">
    <img :src="require('../assets/waterstream.svg')" width="30%" :class="{'d-inline-block': !alternate && playing, 'd-none': alternate || !playing, 'waterfall-image': true, shrunk: true}" />
    <img :src="require('../assets/waterstream2.svg')" width="30%" :class="{'d-inline-block': alternate && playing, 'd-none': !alternate || !playing, 'waterfall-image': true, shrunk: true}" />
  </div>
  <div class="footer-vid-container">
    <video :class="{'position-relative': true, 'footer-vid': true, 'd-none': !playing}" :src="require('../assets/watersplash_VP9.webm')" loop muted autoplay></video>
  </div>
  <teleport to="#footer">
    <v-footer app>
      <v-container>
        <v-row>
          <v-col v-for="rock in rocks" :key="rock.id" cols="4" md="3" lg="2">
            <v-img :src="rockData(rock)" :class="{unwashed: !washed, rock: true}" contain aspect-ratio="1" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-btn @click="washRocks" :disabled="washed" block color="primary">Perform wash</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn v-if="washed && !playing" :to="{name: 'Tumbler'}" color="secondary" block>Return to Tumbler</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </teleport>
</template>

<style>
  .rock img {
    transition: filter 3s ease;
  }
  .unwashed img {
    filter: sepia(100%);
  }
  .shrunk {
    width: 30%;
  }
  .waterfall-image {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    height: 50vh;
  }
  .footer-vid-container {
    position: fixed;
    z-index: 100;
    bottom: 0;
  }
  .footer-vid {
    width: 100vw;
    z-index: 101;
    position: relative;
    opacity: .5;
    pointer-events: none;
    margin-top: 25vh;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { ROCK_DATA } from '@/constants'
import Rock from '@/types/Rock'

export default defineComponent({
  name: 'Wash.vue',
  methods: {
    markWashed () {
      this.playing = false
    },
    flipWaterfall () {
      if (this.playing) {
        setTimeout(this.flipWaterfall, 100)
      }
      this.alternate = !this.alternate
    },
    washRocks () {
      this.playing = true
      this.$store.commit('setWashed', true)
      setTimeout(this.markWashed, 3000)
      setTimeout(this.flipWaterfall, 50)
    },
    rockData (rock: Rock) {
      return ROCK_DATA[rock.type].assets[this.currentStage]
    }
  },
  computed: {
    washed () { return this.$store.state.washed },
    rocks () { return this.$store.state.rockLists.tumbling },
    currentStage () { return this.$store.state.cycle }
  },
  created () {
    this.$store.commit('forceNeedWash')
    const state = this.$store.state
    if (state.running || state.washed || state.rockLists.tumbling.length) {
      // It's not time to wash.
      this.$router.replace({ name: 'Tumbler' })
    }
  },
  data (): {playing: boolean, alternate: boolean} {
    return {
      playing: false,
      alternate: false
    }
  }
})
</script>

<style scoped>

</style>

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
    <video :class="{'position-relative': true, 'footer-vid': true, 'd-none': !playing}" loop muted autoplay>
      <source :src="require('../assets/watersplash.webm')" type="video/webm">
      <source :src="require('../assets/watersplash.mov')" type="video/quicktime">
    </video>
    <audio class="tumbler-page-audio" :autoplay="playing" ref="audio">
      <source :src="require('../assets/audio/washing.mp4')" type="audio/mp4">
    </audio>
  </div>
  <teleport to="#footer">
    <v-footer app>
      <v-container>
        <v-row>
          <v-col v-for="rock in rocks" :key="rock.id">
            <v-img :src="rockData(rock)" :class="{unwashed: !washed, rock: true}" contain aspect-ratio="1" max-height="20vh" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" v-if="!washed || playing">
            <v-btn @click="washRocks" :disabled="washed" block color="primary">Perform wash</v-btn>
          </v-col>
          <v-col cols="12" v-if="washed && !playing && !finished">
            <v-btn :to="{name: 'Tumbler'}" color="secondary" block>Go to Tumbler</v-btn>
          </v-col>
          <v-col cols="12" v-if="finished && !playing">
            <v-btn v-if="finished" color="success" @click="moveToTrophy" block>Add to Trophies</v-btn>
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
import { ROCK_DATA, TARGET_ROCK_COUNT } from '@/constants'
import Rock from '@/types/Rock'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'
import { collectTrophies } from '@/lib'

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
      if (this.$store.state.cycle !== POLISH_CYCLES.POLISH) {
        this.$store.commit('setCanChangeGrit', true)
      }
      setTimeout(this.markWashed, 3000)
      setTimeout(this.flipWaterfall, 50)
    },
    rockData (rock: Rock) {
      return ROCK_DATA[rock.type].assets[this.currentStage]
    },
    moveToTrophy () {
      collectTrophies(this.$store)
      this.$router.push({ name: 'Trophy' })
    }
  },
  watch: {
    playing (value: boolean) {
      const audio = this.$refs.audio as HTMLAudioElement
      if (value) {
        audio.play()
      }
    }
  },
  computed: {
    washed () { return this.$store.state.washed },
    rocks () { return this.$store.state.rockLists.tumbling },
    currentStage () { return this.$store.state.cycle },
    finished () {
      return (
        (this.$store.state.cycle === POLISH_CYCLES.POLISH) &&
        this.$store.state.washed &&
        this.$store.state.cycleCompleted)
    }
  },
  created () {
    const state = this.$store.state
    if (state.running || state.washed) {
      // It's not time to wash.
      this.$router.replace({ name: 'Tumbler' })
    }
    if (state.rockLists.tumbling.length < TARGET_ROCK_COUNT) {
      this.$router.replace({ name: 'RockPicker' })
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

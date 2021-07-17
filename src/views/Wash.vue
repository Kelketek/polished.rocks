<template>
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
            <v-btn v-if="washed && !playing" :to="{name: 'Tumbler'}" block>Return to Tumbler</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </teleport>
</template>

<style>
  .rock img {
    transition: filter 5s ease;
  }
  .unwashed img {
    filter: sepia(100%);
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
    washRocks () {
      this.playing = true
      this.$store.commit('setWashed', true)
      setInterval(this.markWashed, 5000)
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
    // if (state.running || state.washed || state.rockLists.tumbling.length) {
    //   // It's not time to wash.
    //   this.$router.replace({ name: 'Tumbler' })
    // }
  },
  data (): {playing: boolean} {
    return {
      playing: false
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="4" lg="3" v-for="rock in rocks" :key="rock.id">
        <v-card
          @click.stop="openDialog(rock)">
          <v-img :src="assetForRockAtStage(rock, POLISH_CYCLES.POLISH)" :aspect-ratio="1"></v-img>
        </v-card>
      </v-col>
    </v-row>
    <showcased-rock v-if="selectedRock" v-model="dialog" :rock="selectedRock" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'
import { ROCK_DATA } from '@/constants'
import Rock from '@/types/Rock'
import ShowcasedRock from '@/components/ShowcasedRock.vue'
import { assetForRockAtStage } from '@/lib'

declare interface TrophyCaseData {
  dialog: boolean,
  selectedRock: null|Rock,
  POLISH_CYCLES: unknown
}

export default defineComponent({
  name: 'TrophyCase',
  components: { ShowcasedRock },
  methods: {
    assetForRockAtStage,
    openDialog (rock: Rock) {
      this.selectedRock = rock
      this.dialog = true
    }
  },
  computed: {
    rocks () { return this.$store.state.rockLists.polished },
    rockData (rock: Rock) {
      return ROCK_DATA[rock.type]
    }
  },
  created () {
    this.$store.commit('forceTrophies')
  },
  data (): TrophyCaseData {
    return {
      dialog: false,
      selectedRock: null,
      POLISH_CYCLES
    }
  }
})
</script>

<style scoped>

</style>

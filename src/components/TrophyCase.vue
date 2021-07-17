<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="4" lg="3" v-for="rock in rocks" :key="rock.id">
        <v-card
          @click.stop="openDialog(rock)">
          <v-img :src="assetForRock(rock)"></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card v-if="selectedRock">
        <v-card-title class="justify-center">Checkout your {{ selectedRock.type }} rock!</v-card-title>
        <v-divider></v-divider>
        <v-img
          :src="assetForRock(selectedRock)"
          contain
          height="200"
        />
        <v-card-text>
          Bio?
        </v-card-text>
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-img
                :src="assetForRockAtStage(selectedRock, POLISH_CYCLES.UNPOLISHED)"
              />
            </v-col>
            <v-col cols="3">
              <v-img
                :src="assetForRockAtStage(selectedRock, POLISH_CYCLES.COARSE)"
              />
            </v-col>
            <v-col cols="3">
              <v-img
                :src="assetForRockAtStage(selectedRock, POLISH_CYCLES.FINE)"
              />
            </v-col>
            <v-col cols="3">
              <v-img
                :src="assetForRockAtStage(selectedRock, POLISH_CYCLES.PREPOLISH)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <h6 class="text-center">
              {{ POLISH_CYCLES.UNPOLISHED }}
              </h6>
            </v-col>
            <v-col cols="3">
              <h6 class="text-center">
              {{ POLISH_CYCLES.COARSE }}
              </h6>
            </v-col>
            <v-col cols="3">
              <h6 class="text-center">
              {{ POLISH_CYCLES.FINE }}
              </h6>
            </v-col>
            <v-col cols="3">
              <h6 class="text-center">
              {{ POLISH_CYCLES.PREPOLISH }}
              </h6>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'
import { ROCK_DATA } from '@/constants'
import Rock from '@/types/Rock'

declare interface TrophyCaseData {
  dialog: boolean,
  selectedRock: null|Rock,
  POLISH_CYCLES: unknown
}

export default defineComponent({
  name: 'TrophyCase',
  methods: {
    assetForRock (rock: Rock) {
      return this.assetForRockAtStage(rock, POLISH_CYCLES.POLISH)
    },
    assetForRockAtStage (rock: Rock, stage: POLISH_CYCLES) {
      console.log(rock + 'at ' + stage)
      console.log(ROCK_DATA[rock.type])
      return ROCK_DATA[rock.type].assets[stage]
    },
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
      POLISH_CYCLES: POLISH_CYCLES
    }
  }
})
</script>

<style scoped>

</style>

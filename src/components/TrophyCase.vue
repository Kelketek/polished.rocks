<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="4" lg="3" v-for="rock in rocks" :key="rock.id">
        <v-card
          @click.stop="openDialog(rock)">
          <v-img :src="assetForRockAtStage(rock, POLISH_CYCLES.POLISH)" :aspect-ratio="1"></v-img>
        </v-card>
      </v-col>
      <v-col v-if="rocks.length === 0" cols="12" sm="8" offset-sm="1" md="6" offset-md="3" lg="4" offset-lg="4">
        <v-card>
          <v-card-title class="text-center">Nothing to see here, yet!</v-card-title>
          <v-card-text class="text-center">
            You'll see some rocks here once you've finished polishing them.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="newCycle">
      <v-col cols="12" sm="8" offset-sm="1" md="6" offset-md="3" lg="4" offset-lg="4">
        <v-btn color="error" block :to="{ name: 'RockPicker' }">
          <v-icon left>mdi-shovel</v-icon>
          Go pick some dang rocks
        </v-btn>
      </v-col>
    </v-row>
    <showcased-rock v-if="selectedRock" v-model="dialog" :rock="selectedRock" @click:outside="() => { dialog = false }" />
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
    },
    newCycle () {
      return this.$store.state.rockLists.tumbling.length === 0
    }
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

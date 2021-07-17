<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="4" lg="3" v-for="rock in rocks" :key="rock.id">
        <v-card>
          <v-img :src="rockInfo(rock).assets[POLISH_CYCLES.POLISH]"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'
import { ROCK_DATA } from '@/constants'
import Rock from '@/types/Rock'

export default defineComponent({
  name: 'TrophyCase',
  computed: {
    rocks () { return this.$store.state.rockLists.polished },
    rockData (rock: Rock) {
      return ROCK_DATA[rock.type]
    }
  },
  created () {
    this.$store.commit('forceTrophies')
  },
  data () {
    return {
      POLISH_CYCLES: POLISH_CYCLES
    }
  }
})
</script>

<style scoped>

</style>

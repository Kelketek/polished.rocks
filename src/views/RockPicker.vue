<template>
  <v-container>
    <h1>Choose A Rock To Polish</h1>
    <v-row>
      <v-col v-for="(rock, index) in rocks" :key="index" cols="12" sm="4">
        <v-card
          class="pa-2 text-center"
          outlined
          tile
          @click.stop="openDialog(rock)"
          v-bind:id="rock.id"
        >
          <v-img
            :src="assetForRock(rock)"
            contain
            height="200"
          />
          {{ rock.name }}
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card v-if="selectedRock">
        <v-card-title class="justify-center">This looks like a pretty neat rock.</v-card-title>
        <v-divider></v-divider>
        <v-img
          :src="assetForRock(selectedRock)"
          contain
          height="200"
        />
        <v-card-text>
          Wanna polish it?
        </v-card-text>
        <v-card-actions>
          <v-col>
            <v-btn
              color="error"
              dark
              @click.stop="chuckRock(selectedRock)">
              <v-icon dark left>mdi-cancel</v-icon>
              Chuck it!
            </v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn
              color="primary"
              dark
              @click.stop="rockChosen(selectedRock)"
            >
              Polish it!
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Rock from '@/types/Rock'
import { makeRock } from '@/lib'
import { ROCK_DATA } from '@/constants'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'

declare interface RockPickerData {
  dialog: boolean,
  selectedRock: null|Rock,
}

export default defineComponent({
  name: 'RockPicker',
  methods: {
    openDialog (rock: Rock) {
      this.selectedRock = rock
      this.dialog = true
    },
    rockChosen (rock: Rock) {
      this.$store.commit('addRocks', { rockList: 'tumbling', rocks: [rock] })
      this.$router.push({ name: 'Tumbler' })
    },
    assetForRock (rock: Rock) {
      return ROCK_DATA[rock.type].assets[POLISH_CYCLES.UNPOLISHED]
    },
    chuckRock (rock: Rock) {
      this.dialog = false
      this.selectedRock = null
      this.$store.commit('removeRocks', { rockList: 'outside', rocks: [rock] })
    }
  },
  watch: {
    'rocks.length': {
      immediate: true,
      handler (length: number) {
        if (length) {
          return
        }
        if (this.tumbling.length === 0) {
          const rocks = [makeRock(), makeRock(), makeRock(), makeRock(), makeRock()]
          this.$store.commit('addRocks', { rockList: 'outside', rocks: rocks })
        }
      }
    }
  },
  created () {
    if (this.tumbling.length) {
      this.$router.push({ name: 'Tumbler' })
    }
  },
  computed: {
    // mapState doesn't seem to work with TypeScript? Would have made this more succinct...
    rocks () { return this.$store.state.rockLists.outside },
    tumbling () { return this.$store.state.rockLists.tumbling },
    running () { return this.$store.state.running }
  },
  data (): RockPickerData {
    return {
      dialog: false,
      selectedRock: null
    }
  }
})
</script>

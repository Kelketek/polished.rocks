<template>
<div class="background">
</div>
<v-container class="alert-title">
  <v-alert
      v-model="alert"
      color="primary"
      closable
    >
      Choose A Rock To Polish
    </v-alert>
</v-container>
  <v-container>
    <div>
      <div
        v-for="(rock, index) in rocks"
        :key="index"
        :style="{ width: rockWidth + 'px',
        position: 'absolute',
        top: yCoordinates[rock.id] + 'px',
        left: xCoordinates[rock.id] + 'px',
        transform: `rotate(${rockRotation[rock.id]}deg)`}">
        <div
          class="pa-2 text-center clickable"
          outlined
          tile
          @click.stop="openDialog(rock)"
          v-bind:id="rock.id"
        >
          <v-img
            :src="assetForRock(rock)"
            contain
          />
        </div>
      </div>
    </div>
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
.background {
  background-image: url(~@/assets/sand.jpg);
  background-repeat: repeat;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.alert-title {
  width: 30%;
  min-width: 300px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Rock from '@/types/Rock'
import { generateRockPlacement, makeRock } from '@/lib'
import { ROCK_DATA } from '@/constants'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'

declare interface RockPickerData {
  dialog: boolean,
  selectedRock: null|Rock,
  rockWidth: number,
  rockHeight: number,
  xCoordinates: unknown,
  yCoordinates: unknown,
  rockRotation: unknown,
  alert: boolean,
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
    },
    calculateRockPlacement () {
      var rockSizeAdjustment = window.innerWidth <= 700 ? 0.3 : 0.2
      var verticalBoundaryReductionFactor = 0.39
      var horizontalBoundaryReductionFactor = 0.24

      this.rockWidth = (rockSizeAdjustment) * window.innerWidth
      this.xCoordinates = generateRockPlacement(this.rocks, 0, window.innerWidth, horizontalBoundaryReductionFactor)
      this.yCoordinates = generateRockPlacement(this.rocks, 72, window.innerHeight, verticalBoundaryReductionFactor)
      this.rockRotation = generateRockPlacement(this.rocks, -365, 365, 0)
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
          this.calculateRockPlacement()
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
      selectedRock: null,
      rockWidth: 0,
      rockHeight: 0,
      xCoordinates: null,
      yCoordinates: null,
      rockRotation: null,
      alert: true
    }
  },
  mounted () {
    this.calculateRockPlacement()
  }
})
</script>

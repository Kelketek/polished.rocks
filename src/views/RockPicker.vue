<template>
  <v-container>
    <h1>Choose A Rock To Polish</h1>
    <div>
      <div
        v-for="(rock, index) in rocks"
        :key="index"
        :style="{ width: rockWidth + 'px',
        position: 'absolute',
        top: yCoordinates[rock.id] + 'px',
        left: xCoordinates[rock.id] + 'px',
        transform: `rotate(${rockRotation[rock.id]}deg)`}"
        v-bind:id="'parentdiv'">
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
  rockWidth: number,
  rockHeight: number,
  xCoordinates: unknown,
  yCoordinates: unknown,
  rockRotation: unknown
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
      console.log(rock)
    },
    calculateRockPlacement () {
      var rockSizeAdjustment = window.innerWidth <= 700 ? 0.3 : 0.2
      var rockBoundaryAdjustment = 0.35

      this.rockWidth = (rockSizeAdjustment) * window.innerWidth
      const randomArray = (length: number, min: number, max: number) => Array(length).fill(0).map(() => Math.round(Math.random() * (max - min) + min))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapToObject = (arrayToMap: Array<number>) : unknown => {
        return arrayToMap.reduce((acc: { [key: string]: number}, current: number, index) => {
          acc[this.rocks[index].id] = current
          return acc
        }, {})
      }

      this.xCoordinates = mapToObject(randomArray(this.rocks.length, 72, window.innerWidth - rockBoundaryAdjustment * window.innerWidth))
      this.yCoordinates = mapToObject(randomArray(this.rocks.length, 72, window.innerHeight - rockBoundaryAdjustment * window.innerHeight))
      this.rockRotation = mapToObject(randomArray(this.rocks.length, -365, 365))
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
      rockRotation: null
    }
  },
  mounted () {
    this.calculateRockPlacement()
  }
})
</script>

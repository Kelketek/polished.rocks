<template>
<div class="background">
  <div class="bush left" :style="{ width: rockWidth + 'px'}">
    <v-img
      :src="require('../assets/bush.svg')"
    />
  </div>
  <div class="bush right" :style="{ width: rockWidth + 'px'}">
    <v-img
      :src="require('../assets/bush.svg')"
    />
  </div>
</div>
<v-container class="alert-title">
  <v-alert
      v-model="alert"
      color="primary"
      closable
    >
    <div class="alert-text text-center">
      Choose A Rock To Polish
    </div>
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
            class="unwashed"
            aspect-ratio="1"
          />
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog">
      <v-card v-if="selectedRock">
        <v-card-title class="justify-center">This looks like a pretty neat rock</v-card-title>
        <v-divider></v-divider>
        <v-img
          :src="assetForRock(selectedRock)"
          contain
          aspect-ratio="1"
          class="unwashed"
          height="200"
        />
        <v-card-text>
          {{ bioForRock(selectedRock) }}
        </v-card-text>
        <v-card-text>
          Wanna polish it?
        </v-card-text>
        <v-card-actions>
          <v-col>
            <v-btn
              color="error"
              @click.stop="chuckRock(selectedRock)">
              <v-icon dark left>mdi-cancel</v-icon>
              Chuck it!
            </v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn
              color="primary"
              @click.stop="rockChosen(selectedRock)"
            >
              Polish it!
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <div class="grass">
    <v-img
      :src="require('../assets/grass.svg')"
    />
  </div>
  </v-container>
</template>

<style scoped>
.background {
  background-image: url(~@/assets/sand.svg);
  background-repeat: repeat;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: #c2b280;
}

.alert-title {
  width: 30%;
  min-width: 300px;
}

.alert-text {
  width: 100%;
}

.clickable {
  cursor: pointer;
}

.bush {
  position: absolute;
  pointer-events: none;
}

.bush.left {
  transform: rotate(150deg);
  animation: linear infinite alternate;
  animation-name: bush-left;
  animation-duration: 20s;
  -webkit-animation:linear infinite alternate;
  -webkit-animation-name: bush-left;
  -webkit-animation-duration: 20s;
  top: 10px;
  left: 12px;
}

@keyframes bush-left {
  0% { transform: rotate(150deg);}
  50%{ transform: rotate(160deg);}
  100%{ transform: rotate(150deg);}
}

@-webkit-keyframes bush-left {
  0% { transform: rotate(150deg);}
  50%{ transform: rotate(160deg);}
  100%{ transform: rotate(150deg);}
}

.bush.right {
  transform: rotate(-170deg);
  animation: linear infinite alternate;
  animation-name: bush-right;
  animation-duration: 20s;
  -webkit-animation:linear infinite alternate;
  -webkit-animation-name: bush-right;
  -webkit-animation-duration: 20s;
  top: 32px;
  right: 25px;
}

@keyframes bush-right {
  0% { transform: rotate(-170deg);}
  50%{ transform: rotate(-160deg);}
  100%{ transform: rotate(-170deg);}
}

@-webkit-keyframes bush-right {
  0% { transform: rotate(-170deg);}
  50%{ transform: rotate(-160deg);}
  100%{ transform: rotate(-170deg);}
}

.bush img {
  height: 0;
}

.grass {
  position: fixed;
  bottom: 0;
  width:120%;
  left: -50px;
  opacity: 90%;
  animation: linear infinite alternate;
  animation-name: grass;
  animation-duration: 10s;
  -webkit-animation:linear infinite alternate;
  -webkit-animation-name: grass;
  -webkit-animation-duration: 10s;
  pointer-events: none;
}

@keyframes grass {
  0% { left: -50px;}
  50%{ left : -60px;}
  100%{ left: -50px;}
}

@-webkit-keyframes grass {
    0% { left: -50px;}
    50%{ left : -60px;}
    100%{ left: -50px;}
}
</style>

<style>
.unwashed img {
  filter: sepia(100%);
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
  xCoordinates: { [key: string]: number },
  yCoordinates: { [key: string]: number },
  rockRotation: { [key: string]: number },
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
      this.$store.commit('setWashed', false)
      this.$router.push({ name: 'Wash' })
    },
    assetForRock (rock: Rock) {
      return ROCK_DATA[rock.type].assets[POLISH_CYCLES.UNPOLISHED]
    },
    bioForRock (rock: Rock) {
      return ROCK_DATA[rock.type].bio
    },
    chuckRock (rock: Rock) {
      this.dialog = false
      this.selectedRock = null
      this.$store.commit('removeRocks', { rockList: 'outside', rocks: [rock] })
    },
    calculateRockPlacement () {
      const rockSizeAdjustment = window.innerWidth <= 700 ? 0.3 : 0.2
      const verticalBoundaryReductionFactor = 0.39
      const horizontalBoundaryReductionFactor = 0.24

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
      if (this.$store.state.washed) {
        this.$router.push({ name: 'Tumbler' })
      } else {
        this.$router.push({ name: 'Wash' })
      }
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
      xCoordinates: {},
      yCoordinates: {},
      rockRotation: {},
      alert: true
    }
  },
  mounted () {
    this.calculateRockPlacement()
  }
})
</script>

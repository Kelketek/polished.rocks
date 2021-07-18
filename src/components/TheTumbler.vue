<template>

<v-row>
  <v-col>
    <v-card>
      <v-card-title>
        Next Stop: {{ nextStop }}
      </v-card-title>
      <v-card-text>
        Current Grit: {{ getCurrentGrit }}
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
<v-row>
  <v-col>
    <v-card>
      <video
        class="tumbler-page-video"
        :src="require('../assets/tumbler.webm')"
        type="video/webm"
        :autoplay="isRunning"
        loop
        muted
        playsinline
      ></video>
      <audio
        class="tumbler-page-audio"
        autoplay
        loop
        :muted="!isRunning">
        <source :src="require('../assets/audio/tumbler.mp4')" type="audio/mp4">
      </audio>
      <v-card-actions>
        <v-row align="center" justify="center">
          <v-col>
            <v-btn
              elevation="2"
              color="error"
              v-if="!rockExists"
              :to="{ name: 'RockPicker' }"
              block>
              <v-icon left>mdi-shovel</v-icon>
              Go pick a dang rock
            </v-btn>
            <v-btn
              elevation="2"
              color="secondary"
              v-if="canWash"
              :to="{ name: 'Wash' }"
              block>
              <v-icon left>mdi-watering-can</v-icon>
              Wash
            </v-btn>
            <v-btn
              elevation="2"
              color="primary"
              v-if="canChangeGrit"
              @click.stop="updateGritCycle"
              block>
              <v-icon left>mdi-skip-next-circle</v-icon>
              Change grit
            </v-btn>
            <v-btn
              elevation="2"
              color="pink darken-1"
              v-if="canPolish"
              @click.stop="startPolishing"
              block>
              <v-icon left>mdi-reload</v-icon>
              Polish
            </v-btn>
            <v-btn
              elevation="2"
              color="success"
              v-if="canMoveToTrophy"
              :to="{ name: 'Trophy' }"
              block>
              <v-icon left>mdi-diamond-stone</v-icon>
              Move to Trophy Case
            </v-btn>
            <v-btn
              elevation="2"
              color="white"
              style="color:black;"
              v-if="godmode && isRunning"
              @click.stop="godmodeTimeSkip"
              block>
              <v-icon left>mdi-clock-time-four-outline</v-icon>
              Godmode time skip
            </v-btn>
            <v-btn
              elevation="2"
              color="white"
              style="font-size:2em;color:black;"
              v-if="godmode || isRunning"
              block
              disabled>
                {{ timer }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>

</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { differenceInSeconds, formatRelative } from 'date-fns'
import { POLISH_CYCLES } from '../types/POLISH_CYCLES'
import { ROCK_DATA } from '@/constants'

export default defineComponent({
  name: 'TheTumbler',
  data: () => {
    return {
      timerDisplay: '',
      interval: 0
    }
  },
  mounted () {
    // this.$store.commit('incrementNextStop', 5) // for debugging purposes only
  },
  methods: {
    updateTimer () {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        const nextStop = new Date(this.$store.state.nextStop)
        const currentTime = new Date()
        const distance = differenceInSeconds(nextStop, currentTime)

        if (distance < 0) {
          this.timerDisplay = 'Complete'
          const cycle = this.$store.state.cycle
          if (cycle !== POLISH_CYCLES.POLISH) {
            this.$store.commit('setRunning', false)
            this.$store.commit('setWashed', false)
          }
          return
        }

        const days = Math.floor(distance / (60 * 60 * 24))
        const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60))
        const minutes = Math.floor((distance % (60 * 60)) / 60)
        const seconds = Math.floor(distance % 60)

        this.timerDisplay = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
        console.log(this.$store.state.godmode)
      }, 1000)
    },
    updateGritCycle () {
      this.$store.commit('setNextGritCycle')
    },
    startPolishing () {
      const cycle = this.$store.state.cycle
      const timeToPolish = ROCK_DATA.POLISH_CYCLE_TIMES[cycle]

      this.$store.commit('incrementNextStop', timeToPolish)
      this.$store.commit('setRunning', true)
    },
    godmodeTimeSkip () {
      // sets next stop to be 10 seconds from now
      const newTime = new Date()
      newTime.setSeconds(newTime.getSeconds() + 10)
      this.$store.commit('setNextStop', newTime)
    }
  },
  computed: {
    nextStop (): string {
      const nextStop = new Date(this.$store.state.nextStop)
      const currentTime = new Date()

      return formatRelative(nextStop, currentTime)
    },
    godmode (): boolean {
      return this.$store.state.godmode
    },
    timer (): string {
      if (this.interval === 0) this.updateTimer()
      return this.timerDisplay
    },
    getCurrentGrit (): POLISH_CYCLES {
      return this.$store.state.cycle
    },
    rockExists (): boolean {
      return this.$store.state.rockLists.tumbling.length > 0
    },
    isRunning (): boolean {
      return this.$store.state.running
    },
    isUnpolished (): boolean {
      return this.$store.state.cycle === POLISH_CYCLES.UNPOLISHED
    },
    isPolished (): boolean {
      return this.$store.state.cycle === POLISH_CYCLES.POLISH
    },
    canWash (): boolean {
      // can wash if rock exists, is not tumbling, has not been washed, and is not in polished state
      return this.rockExists && !this.isRunning && !this.$store.state.washed && !this.isPolished
    },
    canChangeGrit (): boolean {
      // can change grit if rock exists, is not tumbling, is washed, and is not in unpolished or polished state
      return this.rockExists && !this.isRunning && this.$store.state.washed && !this.isUnpolished && !this.isPolished
    },
    canPolish (): boolean {
      // can polish if rock exists, is not tumbling, grit is one step up from last, is washed, and is not in polished state
      return this.rockExists && !this.isRunning && !this.canChangeGrit && this.$store.state.washed && !this.isPolished
    },
    canMoveToTrophy (): boolean {
      return this.isPolished
    }
  }
})

</script>

<style scoped>
.v-btn {
  margin-left: 8px;
}
</style>

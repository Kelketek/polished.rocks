<template>

<v-row>
  <v-col>
    <v-card>
      <v-card-title>
        Next Stop: {{ nextStop }}
      </v-card-title>
      <v-card-text>
        Current Grit: {{ getCurrentGrit }}

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit architecto tempora a quaerat itaque harum veritatis repellat officia fugit commodi numquam laboriosam, omnis, quasi delectus deserunt dolor est perspiciatis ab.
      </v-card-text>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>
      <v-card-subtitle>
        {{ getCurrentGrit }}
      </v-card-subtitle>
    </v-card>
  </v-col>
</v-row>
<v-row>
  <v-col>
    <v-card>
      <video
        :src="require('../assets/tumbler.webm')"
        type="video/webm"
        autoplay
        loop
        muted
        playsinline
      ></video>
      <v-card-actions>
        <v-row align="center" justify="center">
          <v-col>
            <v-btn
              elevation="2"
              color="secondary"
              v-if="canWash"
              to="../views/Wash.vue"
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
              to="../views/TrophyCase.vue"
              block>
              <v-icon left>mdi-diamond-stone</v-icon>
              Move to Trophy Case
            </v-btn>
            <p v-if="showTimer">
              {{ timer }}
            </p>
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

export default defineComponent({
  name: 'TheTumbler',
  data: () => {
    return {
      timerDisplay: '',
      interval: 0
    }
  },
  methods: {
    updateTimer () {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        const nextStop = new Date(this.$store.state.nextStop)
        const currentTime = new Date()

        nextStop.setDate(nextStop.getDate() + 5) // for debugging purposes only

        const distance = differenceInSeconds(nextStop, currentTime)

        if (distance < 0) {
          this.timerDisplay = 'Complete'
          return
        }

        var days = Math.floor(distance / (60 * 60 * 24))
        var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60))
        var minutes = Math.floor((distance % (60 * 60)) / 60)
        var seconds = Math.floor(distance % 60)

        this.timerDisplay = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
      }, 1000)
    },
    updateGritCycle () {
      this.$store.commit('setNextGritCycle')
    },
    startPolishing () {
      const cycle = this.$store.state.cycle
      const timeToPolish = (cycle === POLISH_CYCLES.UNPOLISHED ? 7
        : cycle === POLISH_CYCLES.COARSE ? 7
          : cycle === POLISH_CYCLES.FINE ? 3
            : cycle === POLISH_CYCLES.PREPOLISH ? 3
              : cycle === POLISH_CYCLES.POLISH ? 0
                : 0)

      this.$store.commit('incrementNextStop', timeToPolish)
      this.$store.commit('setRunning', true)
    }
  },
  computed: {
    nextStop (): string {
      const nextStop = new Date(this.$store.state.nextStop)
      const currentTime = new Date()

      nextStop.setDate(nextStop.getDate() + 5) // for debugging purposes only

      return formatRelative(nextStop, currentTime)
    },
    timer (): string {
      if (this.interval === 0) this.updateTimer()
      return this.timerDisplay
    },
    getCurrentGrit (): POLISH_CYCLES {
      return this.$store.state.cycle
    },
    isPolished (): boolean {
      return this.$store.state.cycle === POLISH_CYCLES.POLISH
    },
    canWash (): boolean {
      // can wash if rock is not tumbling, has not been washed, and is not in polished state
      return !this.$store.state.running && !this.$store.state.washed && !this.isPolished
    },
    canChangeGrit (): boolean {
      // can change grit if is not tumbling, is washed, and is not in polished state
      return !this.$store.state.running && this.$store.state.washed && !this.isPolished
    },
    canPolish (): boolean {
      // can polish if rock is not tumbling, grit is one step up from last, is washed, and is not in polished state
      return !this.$store.state.running && !this.canChangeGrit && !this.isPolished
    },
    canMoveToTrophy (): boolean {
      return this.isPolished
    },
    showTimer (): boolean {
      return this.$store.state.running
    }
  }
})

</script>

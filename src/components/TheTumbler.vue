<template>
<v-row>
  <v-col>
    <v-card class="text-left">
      <v-card-title elevation="2">
        Info about what is currently tumbling
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit architecto tempora a quaerat itaque harum veritatis repellat officia fugit commodi numquam laboriosam, omnis, quasi delectus deserunt dolor est perspiciatis ab.
      </v-card-text>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>
      <v-card-subtitle>
        Last recorded image of what is currently tumbling
      </v-card-subtitle>
    </v-card>
  </v-col>
  <v-col>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Next Stop: {{ nextStop }}
          </v-card-title>
          <v-card-subtitle>
            {{ timer }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <video
            src="../assets/tumbler.webm"
            type="video/webm"
          ></video>
          <v-card-actions>
            <v-row align="center" justify="center">
              <v-col>
                <v-btn
                  elevation="2"
                  color="secondary"
                  :disabled="!canWash">
                  <v-icon left>mdi-watering-can</v-icon>
                  Wash
                </v-btn>
                <v-btn
                  elevation="2"
                  color="primary"
                  :disabled="!canChangeGrit">
                  <v-icon left>mdi-skip-next-circle</v-icon>
                  Change grit
                </v-btn>
                <v-btn
                  elevation="2"
                  color="pink darken-1"
                  :disabled="!canPolish">
                  <v-icon left>mdi-reload</v-icon>
                  Polish
                </v-btn>
                <v-btn
                  elevation="2"
                  color="success"
                  :disabled="!canComplete">
                  <v-icon left>mdi-diamond-stone</v-icon>
                  Complete
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
    getNextGrit (): POLISH_CYCLES {
      const currentCycle = this.$store.state.cycle
      if (currentCycle === POLISH_CYCLES.UNPOLISHED) return POLISH_CYCLES.COARSE
      if (currentCycle === POLISH_CYCLES.COARSE) return POLISH_CYCLES.FINE
      if (currentCycle === POLISH_CYCLES.FINE) return POLISH_CYCLES.PREPOLISH
      if (currentCycle === POLISH_CYCLES.PREPOLISH) return POLISH_CYCLES.POLISH
      if (currentCycle === POLISH_CYCLES.POLISH) return POLISH_CYCLES.UNPOLISHED
      return POLISH_CYCLES.UNPOLISHED
    },
    isTumbling (): boolean {
      return parseInt(this.timerDisplay) > 0 && this.$store.state.running
    },
    canWash (): boolean {
      // can wash if rock is not tumbling, has not been washed, and is not in polished state
      return !this.isTumbling && !this.$store.state.washed && !(this.$store.state.cycle === POLISH_CYCLES.POLISH)
    },
    canChangeGrit (): boolean {
      // can change grit if is not tumbling, is washed, and is not in polished state
      return !this.isTumbling && this.$store.state.washed && !(this.$store.state.cycle === POLISH_CYCLES.POLISH)
    },
    canPolish (): boolean {
      // can polish if rock is not tumbling, grit is one step up from last, is washed, and is not in polished state
      return false
    },
    canComplete (): boolean {
      return true
    }
  }
})

</script>

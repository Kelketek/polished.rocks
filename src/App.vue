<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <div id="footer" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },

  mounted () {
    window.addEventListener('keypress', this.doCommand)
  },
  unmounted () {
    window.removeEventListener('keypress', this.doCommand)
  },
  methods: {
    doCommand (event: KeyboardEvent) {
      event = event || window.event
      const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13]
      const keybuffer = []
      keybuffer.push(event.keyCode)
      if (keybuffer.length > konamiCode.length) {
        // to prevent a big ass keybuffer array
        keybuffer.pop()
      }
      if (JSON.stringify(keybuffer) === JSON.stringify(konamiCode)) {
        alert('Godmode enabled')
        // this.$store.commit('setGodmode')
      }
    }
  }
})

</script>

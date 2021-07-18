<template>
  <v-app theme="dark">
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>&nbsp;polished.rocks</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
        app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-for="navigationItem in navigationItems" :key="navigationItem.title"
        >
          <v-list-item :to="navigationItem.path" :disabled="navigationItem.disabled">
            <v-list-item-title>{{ navigationItem.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
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
      drawer: false
    }
  },
  computed: {
    navigationItems () {
      return [
        {
          title: 'Choose Rocks',
          path: this.$router.resolve({ name: 'RockPicker' }),
          disabled: !!this.$store.state.rockLists.tumbling.length
        },
        {
          title: 'Tumble Rocks',
          path: this.$router.resolve({ name: 'Tumbler' }),
          disabled: false
        },
        {
          title: 'Trophy Case',
          path: this.$router.resolve({ name: 'Trophy' }),
          disabled: false
        },
        {
          title: 'Team',
          path: this.$router.resolve({ name: 'Credits' }),
          disabled: false
        }
      ]
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  mounted () {
    window.addEventListener('keydown', this.doCommand)
  },
  unmounted () {
    window.removeEventListener('keydown', this.doCommand)
  },
  methods: {
    doCommand (event: KeyboardEvent) {
      event = event || window.event
      const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13]

      window.keybuffer.push(event.keyCode)
      if (window.keybuffer.length > konamiCode.length) {
        // to prevent a big ass keybuffer array
        window.keybuffer.pop()
      }

      if (JSON.stringify(window.keybuffer) === JSON.stringify(konamiCode)) {
        alert('Godmode enabled')
        this.$store.commit('setGodmode', true)
      }
    }
  }
})
</script>

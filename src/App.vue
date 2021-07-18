<template>
  <v-app theme="dark">
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>&nbsp;polished.rocks</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
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
  watch: {
    '$route.name': function () {
      this.drawer = false
    }
  },
  computed: {
    navigationItems () {
      return [
        {
          title: 'Choose Rocks',
          path: this.$router.resolve({ name: 'RockPicker' }),
          disabled: this.$store.state.rockLists.tumbling.length >= 3
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
        },
        {
          title: 'Save/Load',
          path: this.$router.resolve({ name: 'SaveAndLoad' }),
          disabled: false
        }
      ]
    }
  }
})
</script>

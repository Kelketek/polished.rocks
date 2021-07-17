<template>
  <v-app theme="dark">
    <v-system-bar color="deep-purple darken-3"></v-system-bar>
      <v-app-bar>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>&nbsp;polished.rocks</v-toolbar-title>
      </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-for="navigationItem in navigationItems" :key="navigationItem.title"
            v-model="group"
          >
            <v-list-item :to="navigationItem.path">
              <v-list-item-title>{{ navigationItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <div id="footer" />
  </v-app>
</template>

<style scoped>
.v-system-bar{
  /* No idea why, but this pushes all the content down, hiding it seems to fix */
  display: none;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      drawer: false,
      group: null,
      navigationItems: [
        {
          title: 'Choose Rocks',
          path: '/'
        },
        {
          title: 'Tumble Rocks',
          path: '/Tumbler'
        },
        {
          title: 'Trophy Case',
          path: '/Trophy'
        },
        {
          title: 'Team',
          path: '/hackathon'
        }
      ]
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  }
})
</script>

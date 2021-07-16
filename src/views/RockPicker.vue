<template>
  <v-container>
    <h1>Choose A Rock To Polish</h1>
    <v-row>
      <v-col v-for="(rock, index) in rocks" :key="index" cols="12" sm="4">
        <v-card
          class="pa-2 text-center"
          outlined
          tile
          @click.stop="openDialog(rock)"
          v-bind:id="rock.id"
        >
          <v-img
            :src="require(`../assets/${rock.assetName}`)"
            contain
            height="200"
          />
          {{ rock.name }}
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="justify-center">{{
          selectedRock.name
        }}</v-card-title>
        <v-divider></v-divider>
        <v-img
          :src="require(`../assets/${selectedRock.assetName}`)"
          contain
          height="200"
        />
        <v-card-text class="modal">{{ selectedRock.description }}</v-card-text>
        <v-card-actions>
          <v-col>
            <v-btn
              class="ma-2"
              color="error"
              dark
              @click.stop="dialog = false">
              <v-icon dark left> mdi-cancel </v-icon>
              Don't Polish
            </v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn
              class="ma-2"
              color="primary"
              dark
              @click.stop="rockChosen(selectedRock.id)"
            >
              Polish
              <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.modal {
  height: 200px;
  min-width: 500px;
  overflow-y: auto;
}

.button {
  cursor: pointer;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

interface Rock {
  name: string;
  description: string;
  assetName: string;
}

export default defineComponent({
  name: 'RockPicker',
  methods: {
    openDialog (rock: Rock) {
      this.dialog = true
      this.selectedRock = rock
    },
    rockChosen (id: string) {
      this.dialog = false
      alert(`You chose ${id}`)
    }
  },
  data () {
    return {
      dialog: false,
      selectedRock: Object as unknown as Rock,
      rocks: [
        {
          id: 'rock-1',
          name: 'Rock 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          assetName: 'unpolished_rock_1_01.svg'
        },
        {
          id: 'rock-2',
          name: 'Rock 2',
          description: 'This is rock 2',
          assetName: 'unpolished_rock_1_01.svg'
        },
        {
          id: 'rock-3',
          name: 'Rock 3',
          description: 'This is rock 3',
          assetName: 'unpolished_rock_1_01.svg'
        },
        {
          id: 'rock-4',
          name: 'Rock 4',
          description: 'This is rock 4',
          assetName: 'unpolished_rock_1_01.svg'
        },
        {
          id: 'rock-5',
          name: 'Rock 5',
          description: 'This is rock 5',
          assetName: 'unpolished_rock_1_01.svg'
        }
      ]
    }
  }
})
</script>

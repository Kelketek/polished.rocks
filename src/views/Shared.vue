<template>
  <v-container>
    <showcased-rock :model-value="true" :rock="rock" v-if="validRock" :shared="true" />
    <v-row v-else>
      <v-card>
        <v-card-title>
          Sorry, we couldn't find that rock.
        </v-card-title>
        <v-card-text>Maybe you'd like to polish one of your own?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" :to="{ name: 'RockPicker' }" block>Polish some rocks!</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ShowcasedRock from '@/components/ShowcasedRock.vue'
import { ROCK_TYPES } from '@/types/ROCK_TYPES'
import { makeRock } from '@/lib'
import { ROCK_DATA } from '@/constants'

export default defineComponent({
  name: 'Shared',
  components: { ShowcasedRock },
  computed: {
    validRock () {
      return !!ROCK_DATA[`${this.$route.query.type}` as ROCK_TYPES]
    },
    rock () {
      return makeRock({ type: `${this.$route.query.type}` as ROCK_TYPES })
    }
  },
  data () {
    return { dialog: true }
  }
})
</script>

<style scoped>

</style>

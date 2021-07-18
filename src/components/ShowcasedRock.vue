<template>
  <v-dialog :model-value="modelValue" min-width="25%">
    <v-card>
      <v-card-title class="justify-center">
        <span v-if="shared">Check out your friend's {{ rock.type }} rock!</span>
        <span v-else>Checkout your {{ rock.type }} rock!</span>
      </v-card-title>
      <v-divider />
      <v-img
        :src="assetForRockAtStage(rock, POLISH_CYCLES.POLISH)"
        contain
        height="200"
      />
      <v-card-text>
        <v-row>
          <v-col cols="12" v-html="profileForRock(rock)" />
        </v-row>
        <v-row>
          <v-col cols="3">
            <h6 class="text-center">
              {{ POLISH_CYCLES.UNPOLISHED }}
            </h6>
            <v-img
              :src="assetForRockAtStage(rock, POLISH_CYCLES.UNPOLISHED)"
              aspect-ratio="1"
            />
          </v-col>
          <v-col cols="3">
            <h6 class="text-center">
              {{ POLISH_CYCLES.COARSE }}
            </h6>
            <v-img
              :src="assetForRockAtStage(rock, POLISH_CYCLES.COARSE)"
              aspect-ratio="1"
            />
          </v-col>
          <v-col cols="3">
            <h6 class="text-center">
              {{ POLISH_CYCLES.FINE }}
            </h6>
            <v-img
              :src="assetForRockAtStage(rock, POLISH_CYCLES.FINE)"
              aspect-ratio="1"
            />
          </v-col>
          <v-col cols="3">
            <h6 class="text-center">
              {{ POLISH_CYCLES.PREPOLISH }}
            </h6>
            <v-img
              :src="assetForRockAtStage(rock, POLISH_CYCLES.PREPOLISH)"
              aspect-ratio="1"
            />
          </v-col>
        </v-row>
        <v-row v-if="!shared && !shareAPIAvailable">
          <v-col cols="12">
            <v-card-subtitle>Sharing Link</v-card-subtitle>
          </v-col>
          <v-col cols="12">
            <input :value="urlForRock" ref="linkInput" class="share-link-input" />
          </v-col>
        </v-row>
        <v-alert v-model="copied" color="success" closable>
            Sharing link copied!
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :to="{ name: 'RockPicker' }" block v-if="shared">Polish some rocks!</v-btn>
        <v-btn color="primary" block v-else-if="shareAPIAvailable" @click="shareRock">Share this rock!</v-btn>
        <v-btn color="primary" block v-else @click="copyShareLink">Copy Share Link!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
  .share-link-input {
    color: lightgray;
    width: 100%;
  }
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Rock from '@/types/Rock'
import { assetForRockAtStage, profileForRock } from '@/lib'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    shared: {
      type: Boolean,
      default: false
    },
    rock: {
      type: Object as PropType<Rock>,
      required: true
    }
  },
  methods: {
    assetForRockAtStage,
    profileForRock,
    shareRock () {
      navigator.share({
        title: `Check out your friend's ${this.rock.type} rock!`,
        text: 'Your friend polished a virtual rock. Now they want to show you how shiny it is.',
        url: this.urlForRock
      })
    },
    copyShareLink () {
      const input = this.$refs.linkInput as HTMLInputElement
      input.select()
      document.execCommand('copy')
      this.copied = true
    }
  },
  computed: {
    urlForRock (): string {
      return `${location.protocol}//${location.host}${this.$router.resolve({ name: 'Shared' }).path}?type=${encodeURIComponent(this.rock.type)}`
    },
    shareAPIAvailable (): boolean {
      return !!navigator.share
    }
  },
  data () {
    return {
      POLISH_CYCLES,
      copied: false
    }
  }
})
</script>

<template>
  <v-container>
    <v-card class="text-center">
      <v-card-title class="justify-center">Wanna save your precious rocks?</v-card-title>
      <v-btn
        color="primary"
        @click.stop="exportFromStore()"
        class="ma-2"
      >
      Export
        <v-icon dark right>mdi-file-download</v-icon>
      </v-btn>
    </v-card>
    <v-card class="text-center">
      <v-card-title class="justify-center">Fill up your rocks</v-card-title>
      <input type="file" @change="importToStore">
      <!-- <v-btn
        color="primary"
        @click.stop="importToStore()"
        class="ma-2"
      >
      Import
        <v-icon dark right>mdi-cloud-upload</v-icon>
      </v-btn> -->
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export default defineComponent({
  name: 'Import',
  methods: {
    exportFromStore () {
      const dataToExport = JSON.stringify(this.$store.state)
      const blob = new Blob([dataToExport], { type: 'text/plain' })
      const event = document.createEvent('MouseEvents')
      const linkElement = document.createElement('a')
      linkElement.download = 'myrocks.json'
      linkElement.href = window.URL.createObjectURL(blob)
      linkElement.dataset.downloadurl = ['text/json', linkElement.download, linkElement.href].join(':')
      event.initEvent('click', true, false)
      linkElement.dispatchEvent(event)
    },
    importToStore (event: HTMLInputEvent) {
      if (event.target.files) {
        this.readFiles(event.target.files[0])
      }
    },
    readFiles (file: Blob): void {
      const fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.onload = () => {
        console.log(fileReader.result)
      }

      fileReader.onerror = () => {
        console.log(fileReader.error)
      }
    }
  },
  data () {
    return {
    }
  }
})
</script>

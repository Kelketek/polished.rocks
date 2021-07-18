<template>
  <v-container class="alert-title">
    <v-alert
        v-model="alert"
        color="primary"
        closable
      >
      <div class="alert-text text-center">
        {{ alertMessage }}
      </div>
      </v-alert>
  </v-container>
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
      <label for="file-upload" class="custom-file-upload v-btn v-btn--elevated v-theme--dark bg-primary v-btn--density-default v-btn--size-default v-btn--variant-contained ma-2">
        <v-icon dark right>mdi-cloud-upload</v-icon>&nbsp;&nbsp;Upload File
      </label>
      <input
        id="file-upload"
        type="file"
        @change="importToStore"
        class="file-upload ma-2">
    </v-card>
  </v-container>
</template>

<style scoped>

input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: rgb(187, 134, 252)
}
</style>

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
        const file = event.target.files[0]
        if (file.name.slice(-5) !== '.json') {
          this.alertMessage = 'Cannot import file!'
          this.alert = true
        } else {
          this.readFiles(file)
        }
        event.target.value = ''
      }
    },
    readFiles (file: Blob): void {
      const fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.onload = () => {
        const importedData = JSON.parse(fileReader.result as string)
        this.$store.commit('importState', importedData)
        this.alertMessage = `Your ${this.$store.state.rockLists.tumbling.length} tumbling rocks and ${this.$store.state.rockLists.polished.length} polished rocks have been imported`
        this.alert = true
      }

      fileReader.onerror = () => {
        this.alertMessage = fileReader.error?.toString() ?? 'Error reading file'
        this.alert = true
      }
    }
  },
  data () {
    return {
      alert: false,
      alertMessage: ''
    }
  }
})
</script>

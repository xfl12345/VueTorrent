<template>
  <v-dialog v-model="dialog" scrollable :width="dialogWidth" :fullscreen="isPhone">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar-title class="ma-4 primarytext--text">
          <h3>{{ $t('modals.changeLocation.title') }}</h3>
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="torrent.name" :label="$t('modals.changeLocation.torrentName')" :prepend-icon="mdiFile" readonly />
              <v-text-field v-model="newPath" :label="$t('directory')" :prepend-icon="mdiFolder" @keydown.enter="setLocation" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn class="accent white--text elevation-0 px-4" @click="setLocation">
          {{ $t('save') }}
        </v-btn>
        <v-btn class="error white--text elevation-0 px-4" @click="close">
          {{ $t('cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { mdiFile, mdiFolder, mdiClose } from '@mdi/js'
import { Modal, FullScreenModal } from '@/mixins'
import qbit from '@/services/qbit'

export default {
  name: 'ChangeLocationModal',
  mixins: [Modal, FullScreenModal],
  props: {
    hash: String
  },
  data() {
    return {
      newPath: '',
      mdiFile,
      mdiFolder,
      mdiClose
    }
  },
  computed: {
    ...mapGetters(['getTorrent']),
    dialogWidth() {
      return this.phoneLayout ? '100%' : '750px'
    },
    torrent() {
      return this.getTorrent(this.hash)
    },
    isPhone() {
      return this.$vuetify.breakpoint.xsOnly
    }
  },
  created() {
    this.newPath = this.torrent.savePath
  },
  methods: {
    setLocation() {
      qbit.setTorrentLocation([this.hash], this.newPath)
      this.close()
    },
    close() {
      this.dialog = false
      //this.$store.commit('DELETE_MODAL', this.guid)
    }
  }
}
</script>

import { formatBytes } from '@/helpers'
import store from '../store'

export class DocumentTitle {
  static setDefault() {
    this.set('qBittorrent')
  }

  static setGlobalSpeed() {
    const status = store.getters.getStatus()
    this.set(`[D: ${formatBytes(status.dlspeed)}/s, U: ${formatBytes(status.upspeed)}/s] VueTorrent`)
  }

  static setFirstTorrentStatus() {
    const torrents = store.getters.getTorrents()
    if (!torrents && !torrents.length) return
    const torrent = torrents[0]
    this.set(`[D: ${formatBytes(torrent.dlspeed)}/s, U: ${formatBytes(torrent.upspeed)}/s] ${torrent.progress}%`)
  }

  static update() {
    const mode = store.getters.getWebuiSettings().title
    switch (mode) {
      case 'Default':
        return this.setDefault()
      case 'Global Speed':
        return this.setGlobalSpeed()
      case 'First Torrent Status':
        return this.setFirstTorrentStatus()
      default:
        return this.setDefault()
    }
  }

  static set(title) {
    document.title = title
  }
}

// import { computed, reactive, ref } from "vue";
import { useGun, useUser } from "../gun-vue/composables/src";
import { globalState } from "../stores/globalState"
import { IVideo, IChannel } from "../types"
import { prefers, videos } from "../stores"
const gun = useGun()
const { user } = useUser()
const pvideos = reactive({})
const gvideos = reactive({})
const tvideos = reactive({})
const gchannels = reactive({})
// const vref = gun.user(globalState.sa.pub).get("youtube").get("videos")
// const cref = gun.user(globalState.sa.pub).get("youtube").get("channels")
const pref = gun.get("bcapps").get("moi").get("youtube").get("published")
const vref = gun.get("bcapps").get("moi").get("youtube").get("videos")
const cref = gun.get("bcapps").get("moi").get("youtube").get("channels")
const tref = gun.get("bcapps").get("moi").get("youtube").get("videos").get(`${new Date().toJSON().substring(0,7)}`)
// structure tests
// /channels
// /channels/channel
// /channels/channel/videos/video
let listening = false

watch(tvideos, (value, old_value) => {
  console.log(`watched test videos change ${Object.keys(value).length}`)
  Object.values(value).forEach((gvideo: IVideo) => {
    if (gvideo.videoPublishedAt > `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}`) {
      // only count the last two months
      const video = { ...gvideo }
      if (gchannels.hasOwnProperty(gvideo.channelId)) {
        video.channel = gchannels[gvideo.channelId]
        videos.add(video) // direct store operation
      }
    }
  })
})
// watch(pvideos, (value, old_value) => {
//   console.log(`watched videos change ${Object.keys(value).length}`)
//   Object.values(value).forEach((gvideo: IVideo) => {
//     if (gvideo.videoPublishedAt > `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}`) {
//       // only count the last two months
//       const video = { ...gvideo }
//       if (gchannels.hasOwnProperty(gvideo.channelId)) {
//         video.channel = gchannels[gvideo.channelId]
//         videos.add(video) // direct store operation
//       }
//     }
//   })
// })
watch(gchannels, (value, old_value) => {
  console.log(`watched channels change ${Object.keys(value).length}`)
})

export function initChannels() {
  console.log(`init channels`)
  cref.map().once((d,k) => {
    if (d && d._) {
      delete d._
      if (gchannels.hasOwnProperty(k)) {
        Object.assign(gchannels[k], d)
      } else {
        console.log(`channel ${d.name}`)
        gchannels[k] = d
      }
    }
  })
  setTimeout(() => prefers.channels_playlists.forEach(async (c) => {
    if (!gchannels[c.id]) {
      await put_channel({id: c.id, name: c.name, title: c.title})
    }
  }), 500)
  return { gvideos, vref, gchannels, cref, pvideos, pref, tvideos, tref }
}

export function initVideos() {
  // vref.map().once((d,k) => {
  //   if (d && d._) {
  //     delete d._
  //     if (gvideos.hasOwnProperty(k)) {
  //       Object.assign(gvideos[k], d)
  //     } else {
  //       if (d.videoId) {
  //         gvideos[k] = d
  //       } else {
  //         console.log(`incomplete video ${k}`)
  //         console.log(d)
  //       }
  //     }
  //   }
  // })
  // pref.map().once((d,k) => {
  //   if (d && d._) {
  //     delete d._
  //     if (pvideos.hasOwnProperty(k)) {
  //       Object.assign(pvideos[k], d)
  //     } else {
  //       if (d.videoId && d.videoPublishedAt) {
  //         pvideos[k] = d
  //       } else {
  //         console.log(`incomplete video ${k}`)
  //         console.log(d)
  //       }
  //     }
  //   }
  // })
  tref.map().map().once((d,k) => {
    if (d && d._) {
      delete d._
      if (tvideos.hasOwnProperty(k)) {
        Object.assign(tvideos[k], d)
      } else {
        if (d.videoId && d.videoPublishedAt) {
          tvideos[k] = d
        } else {
          console.log(`incomplete video ${k}`)
          console.log(d)
        }
      }
    }
  })
}

export function useVideos() {
  if (!listening) {
    listening = true
    // vref.map().on((d, k) => {
    //   if (d && d._) {
    //     delete d._
    //     if (gvideos.hasOwnProperty(k)) {
    //       Object.assign(gvideos[k], d)
    //     } else {
    //       if (d.videoId) {
    //         gvideos[k] = d
    //       } else {
    //         console.log(`video ${k} ${d.videoId}`)
    //         console.log(d)
    //       }
    //     }
    //   }
    // // })
    // }, true)  // delta value
    // pref.map().on((d, k) => {
    //   if (d && d._) {
    //     delete d._
    //     if (pvideos.hasOwnProperty(k)) {
    //       Object.assign(pvideos[k], d)
    //     } else {
    //       if (d.videoId && d.videoPublishedAt) {
    //         pvideos[k] = d
    //       } else {
    //         console.log(`video ${k} ${d.videoId}`)
    //         console.log(d)
    //       }
    //     }
    //   }
    // // })
    // }, true)  // delta value
    tref.map().map().on((d, k) => {
      if (d && d._) {
        delete d._
        if (tvideos.hasOwnProperty(k)) {
          Object.assign(tvideos[k], d)
        } else {
          if (d.videoId && d.videoPublishedAt) {
            tvideos[k] = d
          } else {
            console.log(`video ${k} ${d.videoId}`)
            console.log(d)
          }
        }
      }
    // })
    }, true)  // delta value
    cref.map().on((d, k) => {
      if (d && d._) {
        delete d._
        if (gchannels.hasOwnProperty(k)) {
          Object.assign(gchannels[k], d)
        } else {
          console.log(`channel ${d.name}`)
          gchannels[k] = d
        }
      }
    }, true)  // delta value
    // })
  }
}

export async function put_channel(pchannel) {
  if (!gchannels[pchannel.id]) {
    if (pchannel.id && pchannel.name && pchannel.title) {
      const channel = {id: pchannel.id, name: pchannel.name, title: pchannel.title}
      const node = await cref.get(channel.id).then()
      if (!node) {
        gchannels[channel.id] = channel
        // cref.get(channel.id).put(channel, null, {opt: {cert: globalState.cert}})
        cref.get(channel.id).put(channel)
        globalState.debug && console.log(`... put channel ${channel.id}`)
      }
    }
  }
}

export async function put_video(video_object) {
  if (gvideos[video_object.videoId] && gvideos[video_object.videoId].videoId) return
  if (video_object.videoId && video_object.videoPublishedAt && video_object.channel) {
    const video: IVideo = {
      videoId: video_object.videoId,
      videoPublishedAt: video_object.videoPublishedAt,
      channelId: video_object.channel.id
    }
    if (video_object.ipfs) { video.ipfs = video_object.ipfs }
    if (!gchannels.hasOwnProperty(video.channelId)) {
      await put_channel(video_object.channel)
    }
    const node = await vref.get(video.videoId).then()
    if (!node) { // video is already in gun, check if needs update
      // vref.get(video.videoId).put(video, null, {opt: {cert: globalState.cert}})
      vref.get(video.videoId).put(video)
    } else if (!node.videoId) {
      console.log(video)
      vref.get(video.videoId).put(video)
    } else {}
    gvideos[video.videoId] = video
  }
}

export async function put_video_published(video_object) {
  if (pvideos[video_object.videoPublishedAt] && pvideos[video_object.videoPublishedAt].videoPublishedAt) return
  if (video_object.videoId && video_object.videoPublishedAt && video_object.channel) {
    const video: IVideo = {
      videoId: video_object.videoId,
      videoPublishedAt: video_object.videoPublishedAt,
      channelId: video_object.channel.id
    }
    if (video_object.ipfs) { video.ipfs = video_object.ipfs }
    if (!gchannels.hasOwnProperty(video.channelId)) {
      await put_channel(video_object.channel)
    }
    const node = await pref.get(video.videoPublishedAt).then()
    if (!node) {
      // pref.get(video.videoId).put(video, null, {opt: {cert: globalState.cert}})
      pref.get(video.videoPublishedAt).put(video)
    } else if (!node.videoId && video.videoPublishedAt) {
      console.log(video)
      pref.get(video.videoPublished).put(video)
    } else {}
    pvideos[video.videoPublishedAt] = video
  }
}

export async function put_video_test(video_object) {
  if (tvideos[video_object.videoId] && tvideos[video_object.videoId].videoId) return
  if (video_object.videoId && video_object.videoPublishedAt && video_object.channel) {
    const video: IVideo = {
      videoId: video_object.videoId,
      videoPublishedAt: video_object.videoPublishedAt,
      channelId: video_object.channel.id
    }
    if (video_object.ipfs) { video.ipfs = video_object.ipfs }
    if (!gchannels.hasOwnProperty(video.channelId)) {
      await put_channel(video_object.channel)
    }
    const node = await pref.get(video.channelId).get(video.videoId).then()
    if (!node) {
      tref.get(video.channelId).get(video.videoId).put(video)
    } else if (!node.videoId && video.videoId) {
      console.log(video)
      tref.get(video.channelId).get(video.videoId).put(video)
    } else {}
    tvideos[video.videoId] = video
  }
}
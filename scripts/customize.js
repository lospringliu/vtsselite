const fsp = require('fs/promises')
const fs = require('fs')
const AsyncForEach = require('async-await-foreach')
const chalk = require('chalk')

const customize = {
  './src/gun-vue/gun/useGun.ts': {
    replaces: [
      ['import "gun/lib/webrtc"', 'import "gun/lib/open";\nimport "gun/lib/load";\nimport "gun/lib/webrtc"'],
    ],
  },
  './src/gun-vue/user/usePass.ts': {
    replaces: [
      [' "#\\/auth\\/" ', ' auth_url '], // history mode
      ['indexOf\\("#\\/auth\\/"', 'indexOf(auth_url'], // history mode
      ['link.substr\\(index \\+ 7\\)', 'link.substr(index + auth_url.length)'], // paramize
      ['function genLink\\(text = ""\\)', 'function genLink(text = "", auth_url = "#/auth/")'], // params
      ['function parseLink\\(link: string\\)', 'function parseLink(link: string, auth_url = "#/auth/")'], // params
    ],
  },
  './src/gun-vue/user/useUser.ts': {
    replaces: [
      ['gun.user\\(\\).leave\\(\\);', 'user.wallets = {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}};\n\tgun.user().leave();'],
      ['pair\\(\\): ISEAPair {', 'wallets: {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}},\n\tpair(): ISEAPair {'],
      ['user.pulser = setInterval', 'gun.user()\n\t\t.get("wallets")\n\t\t.get("defaults")\n\t\t.map()\n\t\t.on((d, k) => {\n\t\t\tif (d) {\n\t\t\t\tdelete d._\n\t\t\t\tdelete d["#"]\n\t\t\t\tdelete d[">"]\n\t\t\t\tuser.wallets[k] = d;\n\t\t\t}\n\t\t});\n\tuser.pulser = setInterval'],
    ],
  },
  './src/gun-vue/post/action/PostActionReact.vue': {
    replaces: [
      ['v-if="list.length < 4', 'v-if="4 > list.length'],
    ],
  },
  './src/gun-vue/post/PostList.vue': {
    replaces: [
      ['\\(title="Upload feed"', '(v-if="1 > 2" title="Upload feed"'],
      ['v-if="countPosts < -1"', 'v-if="-1 > countPosts"'],
    // [`v-if="countPosts > 0"`, `v-if="-1 > countPosts"`],
    // [`{{ tag }}`, "{{ t(`tags.${tag}`) }}"]
    ],
  },
  './src/gun-vue/space/SpaceDraw.vue': {
    replaces: [
      ['<.i-carbon-erase />', '<div class="i-carbon-erase" />'],
    // [`z-10.absolute`, `z-500.absolute`]
    ],
  },
  './src/gun-vue/space/SpacePlane.vue': {
    replaces: [
      ['svg.max-h-78vh.w-98vw', 'svg.h-96vh.w-98vw'],
    ],
  },
  './src/gun-vue/room/RoomPage.vue': {
    replaces: [
      ['pt-32.px-2', 'pt-12.px-2'],
    ],
  },
  './src/pages/space.vue': {
    replaces: [
      ['space-plane.h-90vh', 'space-plane.h-95vh'],
    ],
  },
  './src/gun-vue/chat/ChatInput.vue': {
    replaces: [
      ['textarea.p-2.rounded-xl.bg-light-200', 'textarea.px-2.rounded-xl.bg-light-200'],
      ['p-4.flex.flex-col.items-center', 'p-2.flex.flex-col.items-center'],
    ],
  },
  './src/gun-vue/chat/ChatMessages.vue': {
    replaces: [
      ['flex.flex-col.bg-opacity-80.p-4.gap-2', 'flex.flex-col.bg-opacity-80.p-2.gap-1'],
    ],
  },
  './src/gun-vue/chat/ChatRoom.vue': {
    replaces: [
      ['flex.flex-col.overflow-y-scroll.*', 'flex.flex-col.w-full.h-full('],
      ['p-4.bg-dark-50.bg-opacity-80', 'p-1.bg-dark-50.bg-opacity-80'],
    ],
  },
  './src/gun-vue/post/PostForm.vue': {
    replaces: [
      ['text: false', 'ipfs: false,\n  text: false'],
      ['ui-layer\\(:open="add.text"', 'ui-layer(:open="add.ipfs" @close="add.ipfs = false" :offset="\'22vh\'")\n  ui-layer(:open="add.text"'],
      ['form-youtube\\(@update="postData.youtube = \\$event"\\)', 'form-youtube(@update="postData.youtube = $event")\n    form-ipfs(@update="postData.ipfs = $event")'],
    ],
  },
  './src/gun-vue/post/PostCard.vue': {
    replaces: [
      ['.i-mdi-text-long.mx-1', '.i-simple-icons-ipfs.mx-1(v-if="post?.ipfs")\n        .i-mdi-text-long.mx-1'],
    ],
  },
  './src/gun-vue/post/PostLine.vue': {
    replaces: [
      ['.i-mdi-text-long', '.i-simple-icons-ipfs(v-if="post?.ipfs")\n          .i-mdi-text-long'],
    ],
  },
  './src/gun-vue/post/PostPage.vue': {
    replaces: [
      ['button.button.flex.items-center\\(@click', 'button.button.flex.items-center(v-if="false" @click'],
      ['v-if="post\\?.cover \\|\\| post\\?.youtube', 'v-if="post?.cover || post?.youtube || post?.ipfs'],
      ['embed-youtube.mb-6', 'embed-ipfs.mb-6.shadow-xl.flex-1(\n        v-if="post?.ipfs"\n        :video="post?.ipfs"\n        )\n      embed-youtube.mb-6'],
    ],
  },
  './src/gun-vue/user/UserAvatar.vue': {
    replaces: [
    // [`form-picture.absolute\\(\n    :options`, `form-picture.absolute(\n    v-if="false"\n    :options`],
      ['form-picture.absolute\\(', 'form-picture.absolute(\n    v-if="user.wallets?.jingtum?.activated"'],
    ],
  },
  './src/gun-vue/user/UserAuth.vue': {
    replaces: [
      ['  console.log\\(p\\)', '// console.log(p)'],
    ],
  },
  // "./src/gun-vue/composables/src/user/useAccount.ts": { replaces: [
  //   [`db: gun.user`, `wallets: {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}},\n      db: gun.user`],
  //   [`return obj;`, `gun.user(pub.value)\n      .get("wallets")\n      .get("defaults")\n      .map()\n      .on((d, k) => {\n        delete d._\n        delete d["#"]\n        delete d[">"]\n        obj.wallets[k] = d;\n      });\n    return obj;`]
  // ]},
  './src/gun-vue/ui/Uilayer.vue': {
    replaces: [
      ['10vh', '5vh'],
    ],
  },
  './src/pages/space.vue': {
    replaces: [
      [':key="currentRoom.pub" @enter=', ':key="currentRoom.pub" :pad="20" @enter='],
    ],
  },
  './src/gun-vue/user/UserHome.vue': {
    i18n: true,
    replaces: [
      ['chat-private-list\\(@chat', 'chat-private-list(:title="t(\'customize.chat_title\')" @chat'],
    ],
  },
  // "./src/pages/chats.vue": { i18n: true, replaces: [
  //   [`chat-private-list\\(@chat`, `chat-private-list(:title="t('customize.chat_title')" @chat`],
  // ]},
  './src/gun-vue/styles/index.css': {
    replaces: [
      ['10px', '0'],
    ],
  },
  './src/pages/my/chat/index.vue': {
    i18n: true,
    replaces: [
      ['chat-private-list\\(@chat', 'chat-private-list(:title="t(\'customize.chat_title\')" @chat'],
    ],
  },
}

Promise.resolve().then(async () => {
  Object.keys(customize).forEach((file) => {
    replace(file, customize[file])
  })
})

function log(message = '', color = 'green') {
  console.log(chalk[color](message))
}

function replace(file, config = []) {
  log(`... processing ${file}`)
  let content = fs.readFileSync(file, 'utf8').split('\n')
  config.replaces.forEach((replacer) => {
    content = content.map(line => line.replace(new RegExp(replacer[0], 'g'), replacer[1]))
  })
  if (config.i18n) {
    log(`... ... replace i18n ${file}`)
    const index = content.findIndex(line => line === '</script>')
    if (index !== -1) { // has script section in sfc
      const exists = content.findIndex(line => /useI18n/.test(line))
      if (exists === -1)
        content.splice(index, 0, 'const { t } = useI18n()')
    }
    else {
      content.unshift('</script>')
      content.unshift('const { t } = useI18n')
      content.unshift('<script setup>')
    }
  }
  fs.writeFileSync(file, content.join('\n'), 'utf8')
}

function i18n(file, i18n = false) {

}

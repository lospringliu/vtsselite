#!/bin/bash

rm -fr src/gun-vue/*
cp -av /Users/xcliu/tests/gun-vue/composables/src src/gun-vue/composables
git checkout src/gun-vue/composables/room/rootRoom.js
cp -av /Users/xcliu/tests/gun-vue/components/src src/gun-vue/components
git checkout src/gun-vue/components/embed/EmbedIpfs.vue
git checkout src/gun-vue/components/form/FormIpfs.vue

cat << ENDF >> src/gun-vue/components/form/index.js

export { default as FormIpfs } from "./FormIpfs.vue";
ENDF
cat << ENDF >> src/gun-vue/components/embed/index.js

export { default as EmbedIpfs } from "./EmbedIpfs.vue";
ENDF
# sed -ibak 's|import "virtual:windi.css"|// import "virtual:windi.css"|' src/gun/components/index.js
# rm -fv src/gun/components/index.jsback

cp -av /Users/xcliu/tests/gun-vue/app/src/components/*  src/components/
rm -frv src/pages/*
cp -av /Users/xcliu/tests/gun-vue/app/src/pages/*  src/pages/
# cp -av /Users/xcliu/tests/gun-vue/app/public/*  public/
git checkout src/pages/about.md 2>/dev/null || true
git checkout src/pages/videos.vue src/pages/wallets.vue src/pages/upload.vue src/pages/nft src/pages/nfts.vue

# cp -av /Users/xcliu/tests/gun-vue/app/src/main.js src/main.ts
# cp -av /Users/xcliu/tests/gun-vue/app/src/app.vue src/App.vue
# sed -iback 's|virtual:windi.css|./index.css|' src/main.ts
# rm -fv src/main.tsback
cp -av /Users/xcliu/tests/gun-vue/components/histoire.config.js .
sed -i "" 's|./app/public|/public|' histoire.config.js
cp -av /Users/xcliu/tests/gun-vue/components/histoire.setup.js .
sed -i "" 's|src/styles|src/gun-vue/components/styles|' histoire.setup.js

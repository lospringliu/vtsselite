#!/bin/bash

rm -fr src/gun-vue/*
cp -av /Users/xcliu/tests/gun-vue/src/* src/gun-vue
git checkout src/gun-vue/room/rootRoom.json
# sed -ibak 's|import "virtual:windi.css"|// import "virtual:windi.css"|' src/gun/components/index.js
# rm -fv src/gun/components/index.jsback

cp -av /Users/xcliu/tests/gun-vue/app/src/components/*  src/components/
rm -frv src/pages/*
cp -av /Users/xcliu/tests/gun-vue/app/src/pages/*  src/pages/
# cp -av /Users/xcliu/tests/gun-vue/app/public/*  public/
git checkout src/pages/about.md 2>/dev/null || true
git checkout src/pages/videos.vue src/pages/wallets.vue src/pages/upload.vue src/pages/nft src/pages/nfts.vue

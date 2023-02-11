#!/bin/bash

rm -fr src/gun-vue/*
cp -av ../gun-vue/src/* src/gun-vue
mv src/gun-vue/account/AccountStars.vux src/gun-vue/account/AccountStars.vue || true
# git checkout src/gun-vue/room/rootRoom.json
# sed -ibak 's|import "virtual:windi.css"|// import "virtual:windi.css"|' src/gun/components/index.js
# rm -fv src/gun/components/index.jsback

cp -av ../gun-vue/app/src/components/*  src/components/
rm -frv src/pages/*
cp -av ../gun-vue/app/src/pages/*  src/pages/
# cp -av ../gun-vue/app/public/*  public/
# git checkout src/pages/about.md 2>/dev/null || true

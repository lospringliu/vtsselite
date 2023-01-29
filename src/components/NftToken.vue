<script setup lang="ts">
import axios from "axios"
import { INftToken, IContract } from "../types"
import { useContract } from '../composables/useContract';
const open = ref(false)
const layer = ref("<p> ... retrieving info</p>")
const props = defineProps<{
  token: INftToken 
  contract: IContract
}>()
const goto = async () => {
  const {contract} = useContract(props.contract.address, props.contract.standard, props.contract.chain)
  let uri = props.token.uri
  if (contract.api && !uri) {
    uri = await contract.obj.methods.tokenURI(props.token.index).call()
  }
  const response = await axios.get(uri)
  const data = response.data
  layer.value = `<p class="text-2xl text-center">${props.token.name}</p>
  <p> ${data.description} </p>
  <img src="${props.token.image}" />
  `
  if (data.attributes) {
    layer.value += `<div class="text-left"><pre>\n`
    data.attributes.forEach(attribute => {
      layer.value += `${attribute.trait_type.padEnd(24)}${attribute.value}\n`
    })
    layer.value += `</pre></div>`
  }
  open.value = true
}
</script>

<template>
  <div class="relative cursor-pointer border-b-2 border-light-200 dark-border-dark-200 hover-opacity-90 hover-border-teal-700" @click="goto()">
    <img :src="token.image" />
    <p class="absolute text-center top-1 font-semibold text-xl text-teal-700 hover-scale-125 hover-text-teal-400">{{ token.name }} @ {{ contract.chain }}</p>
  </div>
  <UiLayer :open="open" @close="open = false">
    <div class="max-w-md p-2 bg-dark-200 text-light-700 flex flex-col place-content-center" v-html="layer">
    </div>
  </UiLayer>
</template>
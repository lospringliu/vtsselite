<script setup>
import { useContract, useContracts } from '../composables/useContract'

const props = defineProps({
  standard: { type: String, default: 'erc721' },
  chain: { type: String, default: 'polygon' },
  address: { type: String, default: '0x67Baa8575168623822106dee880a2c63B0EBE705' },
  index: { type: Number, default: 1 },
  list_tokens: { type: Boolean, default: false },
})
const { contract, sync_contract, read_contract } = useContract(props.address, props.standard, props.chain)
useContracts().then(async () => {
  read_contract(contract)
})

const load_more = async () => {
  await sync_contract(contract)
}
</script>

<template lang='pug'>
.container.overflow-x-hidden
  .flex.flex-col.gap-2.max-w-full.sm-max-w-sm.bg-gray-200.dark-bg-gray-400.shadow-lg.mx-auto.rounded.mb-1(v-if="contract.total_supply > 0")
    .flex.justify-center.items-center.gap-4.text-blue-600.bg-gray-200.mx-auto
      p {{ standard }}
      p {{ chain }}
      p {{ contract.name }}
    .mx-auto total {{ contract.total_supply }}
    .font-sm.font-extralight.tracking-tighter.overflow-truncate.px-1.mx-auto
      p {{ address }}
  .bg-white.dark-bg-gray-800.grid.grid-col.grid-cols-1.gap-2.min-w-xs.place-content-center.sm-px-2.sm-gap-4.md-px-4.md-gap-6.md-grid-cols-2.lg-gap-8.lg-grid-cols-3.xl-grid-cols-4.text-center.text-gray-700.dark-text-gray-200(v-if="list_tokens")
    div(v-for="(token,index) in contract.tokens" :key="index")
      NftToken(:token="token" :contract="{address, chain, standard}")
  .text-xl.mx-auto
    button.button(@click="load_more()" v-if="contract.total_supply > Object.keys(contract.tokens).length") load more
</template>

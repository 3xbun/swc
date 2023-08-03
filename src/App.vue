<template>
  <router-view></router-view>
</template>

<script setup>
import { provide, ref } from 'vue';

const orderInformation = ref({
  orderID: "",
  orderStdID: "",
  orderName: "",
  class: "no",
  room: "no",
  number: "",
  ig: "",
  orderTime: "",
  orders: []
})

provide('orderInformation', orderInformation)
</script>

<style scoped></style>

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


const DB_URI = "http://localhost:8080/db/data"
// const DB_URI = "https://seawalkclub.sytes.net/db/data"

provide('DB_URI', DB_URI)
provide('orderInformation', orderInformation)
</script>

<style scoped></style>

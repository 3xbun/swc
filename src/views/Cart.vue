<template>
  <div class="container" id="cart">
    <h1>
      <i class="fa-solid fa-circle-chevron-left" @click="router.go(-1)"></i>
      <p>รถเข็น</p>
      <i class="fa-solid fa-cart-shopping"></i>
    </h1>

    <div class="contents">
      <table>
        <tr v-for="item in orderInformation.orders">
          <td class="itemImg"><img :src="item.itemImg"></td>
          <td class="itemName">{{ item.itemName }} <br> <span class="grey">({{ size(item) }})</span></td>
          <td>
            <i class="fa-solid fa-minus" @click="cart(item, false)"></i>
          </td>
          <td>{{ item.amt }}</td>
          <td>
            <i class="fa-solid fa-plus" @click="cart(item, true)"></i>
          </td>
          <td>{{ item.amt * 280 }}.-</td>
        </tr>
      </table>
      <p class="total">รวมราคา: {{ total }} บาท</p>

      <div class="btn" @click="checkout()">
        ยืนยันการจอง
      </div>
      <p class="error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import axios from 'axios';
import { computed, inject, ref } from 'vue';
import router from '../routes';

// const DB_URI = "http://localhost:8080/db/data"
const DB_URI = "https://seawalkclub.sytes.net/db/data"

const orderInformation = inject('orderInformation')

const error = ref('')

const size = (i) => {
  console.log(i);
  if (i.itemID.charAt(0) == 'k') {
    return "Kid Size"
  } else {
    return "Adult Size"
  }
}

const cart = (i, isIncrease) => {
  if (isIncrease) {
    i.amt++
  } else {
    i.amt--
  }
}

const total = computed(() => {
  let t = 0
  const orders = orderInformation.value.orders
  orders.forEach(element => {
    t += 280 * element.amt
  });

  return t
})

const checkout = () => {
  orderInformation.value.orderID = "SWC" + dayjs().format("SSS");
  orderInformation.value.orderTime = dayjs().format('MMM DD - HH:mm');

  const payload = orderInformation.value

  axios.post(DB_URI, payload).catch(err => {
    error.value = err
    console.log(err);
  })

  router.push('success')
}
</script>

<style scoped>
img {
  width: 100%;
}

.itemImg {
  width: 30%;
}

.itemName {
  padding-left: .5em;
  text-align: left;
}

td {
  text-align: center;
}

.grey {
  color: lightgrey;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1em;
}
</style>
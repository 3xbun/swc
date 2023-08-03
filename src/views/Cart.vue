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
      <div class="loading" v-if="showLoad">
        <img src="https://cdn.dribbble.com/users/359314/screenshots/2379673/untitled-3.gif" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import axios from 'axios';
import { computed, inject, ref, onMounted } from 'vue';
import router from '../routes';

const DB_URI = inject('DB_URI')

const orderInformation = inject('orderInformation')

const error = ref('')
const showLoad = ref(false)

const size = (i) => {
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

  sessionStorage.setItem('sessionCart', JSON.stringify(orderInformation.value.orders))
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
  const orderID = "SWC" + dayjs().format("SSS");
  orderInformation.value.orderID = orderID;
  orderInformation.value.orderTime = dayjs().format('MMM DD - HH:mm');

  const payload = orderInformation.value

  showLoad.value = true
  axios.post(DB_URI, payload).then(data => {
    console.log(data);
    if (data) {
      showLoad.value = false
      router.push('success/' + orderID)
    }
  }).catch(err => {
    error.value = err
    showLoad.value = false
  })
}

onMounted(() => {
  const prevRoute = router.options.history.state.back
  const sessionCart = sessionStorage.getItem("sessionCart")
  const session = sessionStorage.getItem("orderInformation")

  if (session) {
    orderInformation.value = JSON.parse(session)
  }

  if (sessionCart) {
    orderInformation.value.orders = JSON.parse(sessionCart)
  }

  if (prevRoute !== '/shop') {
    router.push('/information')
  }
})
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

.loading {
  width: 20%;
  margin: auto;
}
</style>
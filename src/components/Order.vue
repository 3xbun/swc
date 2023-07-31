<template>
  <div class="container" id="admin" v-if="orderInformation.orderName == 'seawalkclub'">
    <h1>Dashboard</h1>

    <div class="contents">
      <input type="text" placeholder="Enter Order ID">

      <table>
        <thead>
          <td>Order #</td>
          <td>Std ID</td>
          <td>Name</td>

        </thead>
        <tbody>
          <tr v-for="o in Orders.data">
            <td>{{ o.orderID }}</td>
            <td>{{ o.orderStdID }}</td>
            <td>{{ o.orderName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else>
    <div class="container" id="home" v-if="page == 'home'">
      <h1>Welcome to Order</h1>
      <div class="btn" @click="page = 'order'">สั่งซื้อ</div>
    </div>

    <div class="container" id="order" v-if="page == 'order'">
      <h1>ข้อมูลผู้ซื้อ <i class="fa-solid fa-user"></i></h1>

      <div class="contents">
        <form @click="error = ''">
          <label for="fullName">ชื่อ - นามสกุล</label>
          <input type="text" id="fullName" v-model="orderInformation.orderName">
          <label for="fullName">เลขประจำตัว</label>
          <input type="number" id="fullName" v-model="orderInformation.orderStdID">
        </form>

        <div class="error">
          {{ error }}
        </div>

        <div class="btn" @click="formValidation()">
          ต่อไป
        </div>
      </div>
    </div>

    <div class="container" id="cart" v-if="page == 'cart'">
      <h1>
        <i class="fa-solid fa-circle-chevron-left" @click="page = 'order'"></i>
        <p>รถเข็น</p>
        <i class="fa-solid fa-cart-shopping"></i>
      </h1>

      <div class="contents">
        <table>
          <tr v-for="item in items">
            <td><img :src="item.itemImg"></td>
            <td class="itemName">{{ item.itemName }}</td>
            <td>
              <i class="fa-solid fa-minus" @click="cart(item, false)"></i>
            </td>
            <td>{{ item.amt }}</td>
            <td>
              <i class="fa-solid fa-plus" @click="cart(item, true)"></i>
            </td>
            <td>{{ item.amt * item.itemPrice }}</td>
          </tr>
        </table>
        <p class="total">รวมราคา: {{ total }} บาท</p>

        <div class="btn" @click="page = 'summary'">
          ต่อไป
        </div>
      </div>
    </div>

    <div class="container" id="summary" v-if="page == 'summary'">
      <h1>
        <i class="fa-solid fa-circle-chevron-left" @click="page = 'cart'"></i>
        <p>สรุปคำสั่งซื้อ</p>
        <i class="fa-solid fa-list-check"></i>
      </h1>

      <div class="contents">
        <table>
          <div v-for="item in items">
            <tr v-if="item.amt">
              <td>
                <img :src="item.itemImg">
              </td>
              <td>
                {{ item.itemName }}
              </td>
              <td>
                x{{ item.amt }}
              </td>
              <td>
                {{ item.amt * item.itemPrice }}.-
              </td>
            </tr>
          </div>
        </table>
        <p class="total">รวมราคา: {{ total }} บาท</p>

        <div class="btn" @click="page = 'success'; order()">
          สั่งจอง
        </div>
      </div>
    </div>

    <div class="container" id="success" v-if="page == 'success'">
      <h1>
        <i class="fa-solid fa-circle-check"></i>
        <p>
          การสั่งจองสำเร็จ
        </p>
        <p class="id">Order <span>#{{ orderInformation.orderID }}</span></p>
        <p class="date">{{ orderInformation.orderTime }}</p>
      </h1>

      <div class="contents">
        <table>
          <div v-for="item in items">
            <tr v-if="item.amt">
              <td>
                <img :src="item.itemImg">
              </td>
              <td>
                {{ item.itemName }}
              </td>
              <td>
                x{{ item.amt }}
              </td>
              <td>
                {{ item.amt * item.itemPrice }}.-
              </td>
            </tr>
          </div>
        </table>
        <p class="total">รวมราคา: {{ total }} บาท</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import axios from 'axios';
import { computed, ref } from 'vue';

import Orders from '../database/Orders.json';

console.log(typeof Orders.data);
console.log(Orders.data);

const page = ref('home');
const error = ref('');

const total = computed(() => {
  let t = 0
  items.value.forEach(i => {
    t += i.amt * i.itemPrice
  });

  return t
})

const items = ref([
  {
    itemName: "item #1",
    itemImg: "https://placehold.co/600x400",
    amt: 0,
    itemPrice: 1
  },
  {
    itemName: "item #2",
    itemImg: "https://placehold.co/600x400",
    amt: 0,
    itemPrice: 1
  },
  {
    itemName: "item #3",
    itemImg: "https://placehold.co/600x400",
    amt: 0,
    itemPrice: 1
  }
])

const orderInformation = ref({
  orderID: "",
  orderStdID: "",
  orderName: "",
  orderTime: "",
  orders: []
})

const cart = (i, increase) => {
  let amt = i.amt

  if (increase) {
    amt++
  } else {
    amt--
  }

  if (amt > 99 || amt < 0) {
    console.log(amt);
    return
  } else {
    i.amt = amt
  }
}

const order = () => {
  orderInformation.value.orderID = "SWC" + dayjs().format("SSS");
  orderInformation.value.orderTime = dayjs().format('MMM DD - HH:mm');

  items.value.forEach(i => {
    if (i.amt) {
      orderInformation.value.orders.push(i)
    }
  });

  const payload = orderInformation.value

  axios.post("http://localhost:8080/db/data", payload)
  console.log(payload);

}

const formValidation = () => {
  const o = orderInformation.value
  if (o.orderName && o.orderStdID) {
    page.value = 'cart'
  } else {
    error.value = "กรุณากรอกข้อมูลให้ครบถ้วน"
  }
}
</script>

<style scoped>
table {
  width: 100%;
}

img {
  width: 100%;
  border-radius: .5rem;
}

td:first-child {
  width: 30%;
  padding: 0;
}

.itemName {
  text-align: left;
  padding-left: 1em;
}

td {
  padding: .5em 0;
  text-align: right;
  vertical-align: middle;
}

td:last-child {
  font-weight: bold;
  padding-left: 1em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 2em;
}

input {
  border: none;
  font-family: inherit;
  padding: .5em 1em;
  border-radius: .5em;
  background-color: var(--dark);
}

.btn {
  margin-top: 2em;
  text-decoration: none;
  color: white;
  background-color: var(--white);
  width: 50%;
  margin: 2em auto;
  padding: 1em;
  border-radius: 1em;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}

i {
  cursor: pointer;
  font-size: .8em;
}

h1 {
  display: flex;
  align-items: center;
  gap: .5em;
}

.total {
  text-align: right;
  font-weight: bold;
}

.contents,
h1 {
  background-color: white;
  padding: .5rem 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

#cart .contents,
#summary .contents {
  padding-top: 2rem;
}

#summary li {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;
}

#summary img {
  width: 100%;
}

#summary td:nth-child(2) {
  text-align: left;
  padding-left: 1em;
}

#success {
  text-align: center;
}

#success h1 {
  justify-content: center;
  flex-direction: column;
  gap: 0 !important;
  padding: 1em;
}

#success .id {
  color: lightblue;
  font-size: 1.5rem;
}

#success .id span {
  color: var(--white);
}

.fa-circle-check {
  color: green;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.date {
  color: lightgray;
  font-size: 1rem;
  margin-top: .5rem;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1em;
}
</style>
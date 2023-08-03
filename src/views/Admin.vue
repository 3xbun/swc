<template>
  <div class="container" id="admin">
    <h1>Total</h1>

    <div class="contents">
      <table class="total">
        <tr v-for="item in items">
          <td><strong>{{ item.itemName }}</strong></td>
          <td>
            <p>KID</p>
            <p>ADULT</p>
          </td>
          <td>
            <p>รวม</p>
            <p>รวม</p>
          </td>
          <td>
            <p>{{ totalCal("k" + item.itemID) }}</p>
            <p>{{ totalCal("a" + item.itemID) }}</p>
          </td>
        </tr>
      </table>
    </div>

    <header>
      <h1>Dashboard</h1>

      <h1>
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="number" class="searchID" v-model="id">
      </h1>
    </header>

    <div class="contents">
      <table>
        <thead>
          <td class="orderid">Order #</td>
          <td>Information</td>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders">
            <td class="orderid">
              <p class="tab">
                {{ order.orderID }}
              </p>
            </td>
            <td>{{ order.orderName }}</td>
            <td>{{ order.class }}/{{ order.room }}</td>
            <td>{{ order.orderStdID }}</td>
            <td>
              <router-link :to="{ name: 'success', params: { orderid: order.orderID } }">
                <i class="fa-regular fa-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, inject } from 'vue';
import axios from 'axios';

const Orders = ref([])

const id = ref('')
const filteredOrders = computed(() => {
  return Orders.value.filter(i => i.orderID.startsWith('SWC' + id.value))
})

const items = [
  {
    itemName: "Light Wave",
    itemID: "LW"
  },
  {
    itemName: "Navy Wave",
    itemID: "NW"
  },
  {
    itemName: "The School of Fish",
    itemID: "SF"
  }
]

const totalCal = (itemID) => {
  let t = 0

  Orders.value.forEach(O => {
    O.orders.forEach(o => {
      if (o.itemID == itemID) {
        t += o.amt
      }
    })
  });
  return t
}

onMounted(() => {
  const URI = inject('DB_URI')
  axios.get(URI).then(data => {
    Orders.value = data.data
  })
})
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
}

input {
  font-size: inherit;
  border: none;
  font-family: inherit;
  width: 2em;
  text-align: center;
  border-radius: .5em;
}

table {
  width: 100%;
}

thead {
  font-weight: bold;
}

thead td:first-child {
  text-align: center;
}

.tab {
  background-color: var(--white);
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: .5em;
  padding: .25em .5em;
}

td {
  padding: .5em;
}

.orderid {
  width: 30%;
}

.total td {
  text-align: right;
}
</style>
<template>
  <div class="container" id="success">
    <h1>
      <i class="fa-solid fa-circle-check"></i>
      การสั่งจองสำเร็จ
    </h1>
    <p class="alert">** อย่าลืมบันทึกภาพหน้าจอเพื่อเป็นหลักฐานในการรับสินค้า **</p>
    <div class="contents">
      <div class="header">
        <div class="left">
          <span class="orderID">
            {{ order.orderID }}
          </span>
          <span class="orderName">
            {{ order.orderName }}
          </span>
        </div>

        <p class="orderTime">
          {{ order.orderTime }}
        </p>
      </div>
      <div class="information">
        <p><i class="fa-solid fa-user"></i> {{ order.class }}/{{ order.room }} | {{ order.orderStdID }}</p>
        <p><i class="fa-solid fa-phone"></i> {{ order.number }}</p>
        <p><i class="fa-brands fa-instagram"></i> {{ order.ig }}</p>
      </div>
      <hr>
      <strong>รายละเอียดการจอง</strong>
      <table>
        <tr v-for="item in order.orders">
          <td class="itemImg"><img :src="item.itemImg"></td>
          <td class="itemName">{{ item.itemName }} <br> <span class="grey">({{ size(item) }})</span></td>
          <td>x{{ item.amt }}</td>
          <td>{{ item.amt * 280 }}.-</td>
        </tr>
      </table>

      <p class="total">รวมราคา: {{ total }} บาท</p>
    </div>
    <div class="footer">
      <p>
        ขอบคุณที่สั่งซื้อกางเกงของเรา และเป็นส่วนหนึ่งในการสนับสนุนเงินบริจาคให้โรงพยาบาลสัตว์ทะเลหายาก จ.ระยอง
        สามารถมารับกางเกงได้ในวันที่ 29 ส.ค. และเมื่อนำขวดมา 5 ขวด สามารถรับส่วนลด 10 บาท</p>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router'

const order = ref({})

const size = (i) => {
  if (i.itemID.charAt(0) == 'k') {
    return "Kid Size"
  } else {
    return "Adult Size"
  }
}

const total = ref(0)

onMounted(() => {
  const route = useRoute()
  axios.get(inject('DB_URI') + "?orderID=" + route.params.orderid).then(data => {
    let t = 0
    order.value = data.data[0]

    const orders = order.value.orders
    orders.forEach(element => {
      t += 280 * element.amt
    });

    total.value = t
  })
})
</script>

<style scoped>
.fa-circle-check {
  color: #459843;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
}

.orderName {
  margin-left: .5em;
}

.orderID {
  background-color: var(--white);
  border-radius: 1em;
  color: white;
  font-weight: bold;
  padding: .25em .5em;
}

.orderTime {
  font-style: italic;
  color: grey;
}

.information {
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

hr {
  border-top: 1px solid var(--white);
}

img {
  width: 100%;
}

.itemImg {
  width: 20%;
}

.itemName {
  padding-left: .5em;
  text-align: left;
}

td {
  text-align: right;
}

.footer {
  font-size: 1em;
  color: gray;
  text-align: center;
}

.alert {
  color: #e5665a;
  font-size: .8em;
  margin: 1em 0;
  text-align: center;
}

.total {
  font-weight: bold;
  text-align: right;
}

/* img {
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

#success {
  text-align: center;
}

#success h1 {
  justify-content: center;
  gap: 0 !important;
  padding: 1em;
  align-items: center;
}

#success .id {
  color: lightblue;
  font-size: 1.5rem;
}

#success .id span {
  color: var(--white);
}

.date {
  color: lightgray;
  font-size: 1rem;
  margin-top: .5rem;
}

.footer {
  font-size: 1em;
  color: gray;
}

.alert {
  color: #e5665a;
  font-size: .5em;
  margin-top: 1em;
} */
</style>
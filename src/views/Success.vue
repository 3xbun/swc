<template>
  <div class="container" id="success">
    <h1>
      <i class="fa-solid fa-circle-check"></i>
      <p>
        การสั่งจองสำเร็จ
      </p>
      <p class="id">Order <span>#{{ order.orderID }}</span></p>
      <p class="date">{{ order.orderTime }}</p>
      <p class="alert">** อย่าลืมบันทึกภาพหน้าจอเพื่อเป็นหลักฐานในการรับสินค้า **</p>
    </h1>

    <div class="contents">
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
import { computed, inject, onMounted, ref } from 'vue';
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

    if (order.value != {}) {
      const orders = order.value.orders
      orders.forEach(element => {
        t += 280 * element.amt
      });
    }

    total.value = t
  })
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
  color: #459843;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
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
}
</style>
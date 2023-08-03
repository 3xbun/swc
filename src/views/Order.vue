<template>
  <div class="container" id="cart">
    <h1>
      <i class="fa-solid fa-circle-chevron-left" @click="router.go(-1)"></i>
      <p>สั่งจองสินค้า</p>
      <i class="fa-solid fa-cart-arrow-down"></i>
    </h1>

    <div class="contents">
      <img class="productImg" :src="selectedProduct.itemImg">

      <div class="informations">
        <p class="price">฿280</p>
        <table>
          <tr>
            <td>ตัวเลือก</td>
            <td>
              <ul>
                <li v-for="p in products">
                  <img :src="p.itemImg" :alt="p.itemName" @click="selectedProduct = p; amount = 1">
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>ไซส์</td>
            <td>
              <ul>
                <li @click="size = 'a'" class="size" :class="{ active: size === 'a' }">Adult</li>
                <li @click="size = 'k'" class="size" :class="{ active: size === 'k' }">Kid</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>จำนวน</td>
            <td>
              <div class="slider">
                <i class="fa-solid fa-minus" @click="addAmt(false)"></i>
                <input type="number" v-model="amount">
                <i class="fa-solid fa-plus" @click="addAmt(true)"></i>
              </div>
              <p style="color: lightgray;">มีสินค้าทั้งหมด 999 ชิ้น</p>
            </td>
          </tr>
        </table>

        <div class="btn addCart" @click="addToCart()">
          <i class="fa-solid fa-cart-plus"></i>
          เพิ่มไปยังรถเข็น
        </div>
        <router-link to="/cart">
          <div class="btn">
            ตรวจสอบรถเข็น
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import router from '../routes';

const products = ref([
  {
    itemName: "Light Wave",
    itemImg: "/imgs/item1.png",
    itemPrice: 1,
    itemID: "LW"
  },
  {
    itemName: "Navy Wave",
    itemImg: "/imgs/item2.png",
    itemPrice: 1,
    itemID: "NW"
  },
  {
    itemName: "The School of Fish",
    itemImg: "/imgs/item3.png",
    itemPrice: 1,
    itemID: "SF"
  }
])

const size = ref('a')
const amount = ref(1)

const selectedProduct = ref(products.value[0])

const addAmt = (increase) => {
  let amt = amount.value

  if (increase) {
    amt++
  } else {
    amt--
  }

  if (amt > 99 || amt < 0) {
    return
  } else {
    amount.value = amt
  }
}

const orderInformation = inject('orderInformation')
const cart = inject('orderInformation').value.orders

const addToCart = () => {
  const product = {
    itemID: size.value + selectedProduct.value.itemID,
    itemName: selectedProduct.value.itemName,
    itemImg: selectedProduct.value.itemImg,
    size: size.value,
    amt: amount.value
  }

  let uniq = true

  cart.filter((i) => {
    if (i.itemID == product.itemID) {
      i.amt += product.amt
      uniq = false
    }
  })

  if (uniq) {
    cart.push(product)
  }

  amount.value = 1

  sessionStorage.setItem('sessionCart', JSON.stringify(cart))
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

  if (prevRoute !== '/information') {
    router.push('/information')
  }
})
</script>

<style scoped>
table {
  width: 100%;
  border-spacing: 1em;
}

.productImg {
  width: 100%;
  height: 100%;
  margin: 1em 0;
}

img {
  width: 100%;
}

td {
  vertical-align: top
}

td:first-child {
  padding-right: 1em;
  text-align: right;
  width: 30%;
}

.price {
  font-size: 2em;
  font-weight: bold;
  background-color: #fafafa;
  padding: .25em .5em;
}

.product>div {
  width: 50%;
  padding: 2em 1em;
}

ul {
  display: flex;
  gap: 1em;
}

li {
  cursor: pointer;
}

.size {
  border: 2px solid lightgray;
  padding: .25em .5em;
  color: lightgray;
}

.active {
  color: var(--white);
  border-color: var(--white);
}

.slider {
  display: flex;
  width: 50%;
  border: 1px solid lightgray;
  margin-bottom: 1em;
  justify-content: space-between;
  padding: .25em .5em;
}

.slider p,
.slider input {
  width: 30%;
  text-align: center;
}

.slider input {
  border: none;
  color: inherit;
}

.addCart {
  width: 100%;
  margin: .5em 0;
}
</style>
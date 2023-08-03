<template>
  <div class="container" id="order">
    <h1 class="shadow"><i class="fa-solid fa-user"></i> ข้อมูลผู้ซื้อ</h1>

    <div class="contents shadow">
      <form @click="error = ''">
        <label for="fullName">เลขประจำตัว*</label>
        <input placeholder="กรอกเลขประจำตัว" type="number" id="fullName" v-model="orderInformation.orderStdID">
        <label for="fullName">ชื่อ - นามสกุล*</label>
        <input placeholder="กรอกชื่อ - นามสกุล" type="text" id="fullName" v-model="orderInformation.orderName">
        <div class="cl2">
          <label for="class">ชั้น*</label>
          <select name="class" v-model="orderInformation.class">
            <option value="no" hidden>เลือกระดับชั้น</option>
            <option value="p3">ป.3</option>
            <option value="p4">ป.4</option>
            <option value="p5">ป.5</option>
            <option value="p6">ป.6</option>
            <option value="m1">ม.1</option>
            <option value="m2">ม.2</option>
            <option value="m3">ม.3</option>
            <option value="m4">ม.4</option>
            <option value="m5">ม.5</option>
            <option value="m6">ม.6</option>
          </select>
          <label for="room">ห้อง*</label>
          <select name="room" v-model="orderInformation.room">
            <option value="no" hidden>เลือกระดับห้อง</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div class="cl2">
          <label for="number" style="width: 25%;">เบอร์โทร*</label>
          <input placeholder="กรอกเบอร์โทร" type="text" id="number" v-model="orderInformation.number">
          <div class="optional">
            <label for="ig">Instagram</label> <br>
            <label for="ig" class="fade">(ไม่จำเป็น)</label>
          </div>
          <input placeholder="Instagram ID" type="text" id="ig" v-model="orderInformation.ig">
        </div>
      </form>

      <div class="error">
        {{ error }}
      </div>

      <div class="btn" @click="formValidation()">
        ต่อไป
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '../routes';
import { inject, ref } from 'vue';

const error = ref('');
const orderInformation = inject('orderInformation')

const formValidation = () => {
  const o = orderInformation.value

  // if (o.orderName && o.orderStdID && o.class && o.room && o.number) {
  if (true) {
    router.push('/shop')
  } else {
    error.value = "กรุณากรอกข้อมูลให้ครบถ้วน"
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 2em;
}

input,
select {
  border: none;
  font-family: inherit;
  padding: .5em 1em;
  border-radius: .5em;
  background-color: var(--dark);
  width: 100%;
}

.cl2 {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 1em;
  align-items: center;
  margin: 1em 0;
}

.fade {
  color: lightgrey;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1em;
}
</style>
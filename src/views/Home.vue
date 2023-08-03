<template>
  <div class="container" id="home">
    <img class="logo" src="../assets/imgs/welcome.png">
    <h1 class="shadow">Welcome to Order</h1>
    <img class="preview" src="../assets/imgs/home.png">
    <router-link to="/information">
      <div class="btn shadow">
        สั่งซื้อ
      </div>
    </router-link>
  </div>
</template>

<style scoped>
h1 {
  justify-content: center;
}

img {
  width: 100%;
}

.logo {
  margin: 3em auto;
}

.preview {
  margin-top: 1em;
  border-radius: 1em;
}

#home {
  text-align: center;
}
</style>
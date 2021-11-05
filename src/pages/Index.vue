<template>
  <div>
    <div class="row top">
      <div class="col">
        <q-img
          src="ui_elements/home_1.svg"
          spinner-color="primary"
          spinner-size="82px"
        />
      </div>
      <div class="col">
        <div class="content">
          <div class="row">
            <div class="col heading">
              SELAMAT DATANG
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input  type="email" label="Email" />
              <q-input  type="password" label="Password" />
              <br>
              <q-btn color="secondary" label="Masuk" />
            </div>
          </div>
          <div class="row">
            <div class="col"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Zen+Kurenaido&display=swap");

.top {
  background: rgb(255, 255, 255);
  // background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(199,245,255,1) 100%);
  height: 800px;
  overflow: hidden;
}
.content {
  background-color: $primary;
  padding: 50px;
  width: 500px;
  border-radius: 20px;
  margin-top: 200px;
  margin-left: 200px;
}
.heading {
  color: white;
  font-family: "Zen Kurenaido", sans-serif;
  font-size: 30px;
}

.text-glow-0 {
  text-shadow: red 0 0 5px;
}

.text-glow-animated-1 {
  animation: textglow1 1.5s infinite alternate;
}
@keyframes textglow1 {
  from {
    text-shadow: rgb(83, 118, 186) 0 0 -5px;
  }
  to {
    text-shadow: rgb(83, 118, 186) 0 0 10px;
  }
}

.text-glow-animated-2 {
  animation: textglow1 1.5s infinite alternate;
}
@keyframes textglow1 {
  from {
    text-shadow:rgb(238, 57, 104) 0 0 -5px;
  }
  to {
    text-shadow: rgb(238, 57, 104) 0 0 10px;
  }
}
</style>

<template>
  <div>
      <div class="cpbContainer">
          <div class="cpb row">
              <div class="col-9 button">
                  <q-icon :name="icon" /> {{label}}
              </div>
              <div class="col-3 number">
                  {{number}}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        icon: String,
        label: String,
        number: Number,
    },
};
</script>

<style lang="scss" scoped>
.cpbContainer{
    padding: 0 20px;
}
.cpb{
    background-color: $secondary;
    // padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
.button{
    border-radius: 5px 0 0 5px;
    padding: 5px 0;
    transition: all 1s;
}
.number{
    background-color: rgb(184, 29, 29);
    border-radius: 0 5px 5px 0;
    padding: 5px 0;
    transition: all 1s;
}

.cpb:hover>.button{
    background-color: rgb(184, 29, 29);
}

.cpb:hover>.number{
    background-color: $secondary;
}
</style>

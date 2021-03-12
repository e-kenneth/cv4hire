<template>
  <div class="container q-ma-md q-pa-md">
      <div class="row">
          <div>{{talent.name}}</div>
          <div>{{talent.name}}</div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    talent: Object,
  },
};
</script>

<style lang="scss" scoped>
    .container{
        background-color: $accent;
        border-radius: 5px;
    }
</style>
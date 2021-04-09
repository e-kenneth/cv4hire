<template>
  <q-item
    clickable
    tag="a"
    exact
    :to="link"
  >
    <q-item-section
      v-if="icon && position != 'top'"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    position: {
      type: String,
      default: 'left'
    },
  }
})
</script>
<style lang="scss" scoped>
.q-item{
  margin: 5px;
  border-radius: 5px;
}
.q-router-link--active, .q-item--active{
  background-color: $secondary;
  color:white;
}

</style>
<template>
<<<<<<< HEAD
  <div>
    {{ jobCategories }}
  </div>
</template>

<script>
export default {
  computed: {
    jobCategories() {
      return this.$store.state.main.jobCategories;
    },
  },
};
=======
  <q-page class="row">
    <example-component
      title="Example componenta"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  components: { ExampleComponent },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);
    const meta = ref<Meta>({
      totalCount: 1200
    });
    return { todos, meta };
  }
});
>>>>>>> f6b426364fcf5def0cea25144c1bdf3bc36b1af3
</script>

<style lang="scss" scoped>
</style>
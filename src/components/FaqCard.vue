<template>
  <q-card class="my-card" flat bordered>
    <q-img :src="card.img" height="400px"/>

    <q-card-section>
      <div class="text-caption text-secondary q-mt-sm q-mb-xs">{{ card.text1 }}</div>
      <div class="text-h5">
        {{ card.title }}
      </div>
    </q-card-section>
    <q-card-actions>
      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          {{ card.text2 }}
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  data() {
    return {
      expanded: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
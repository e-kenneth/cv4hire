<template>
  <div>
    <q-btn color="secondary" icon="person" @click="opened = true" />
    <q-dialog v-model="opened">
      <q-card>
        <q-card-section class="column">
          <q-btn class="q-mb-md" color="secondary" label="Masuk" @click="opened = false"/>
          <q-btn class="q-mb-md" color="secondary" label="Daftar sebagai professional" @click="opened = false" to="/professional/register/"/>
          <q-btn class="q-mb-none" color="secondary" label="Daftar sebagai perusahaan" @click="opened = false" to="/recruiter/register/"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            opened: false,
        }
    },
};
</script>

<style lang="scss" scoped>
</style>
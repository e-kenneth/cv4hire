<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="q-mb-none">Daftar akun baru</h5>
      <q-input v-model="user.email" type="text" label="Nama lengkap" />
      <div class="text-primary">Tanggal lahir:</div>
      <q-date v-model="user.birthday" />
      <q-input v-model="user.email" type="text" label="Alamat email" />
      <q-input v-model="user.password" type="text" label="Kata sandi" />
      <div>
        <q-btn label="Daftar sekarang" type="submit" color="primary" />
        <q-btn
          label="Saya sudah punya akun"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        birthday: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // axios dsb
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
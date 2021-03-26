<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="q-mb-none">Daftar akun baru</h5>
      <q-input
        v-model="user.name"
        type="text"
        label="Nama lengkap"
        required="required"
      />
      <div class="row">
        <div class="text-primary self-center q-pr-lg">Tanggal lahir:</div>
        <q-input type="date" v-model="user.birthdate" required="required" />
      </div>
      <!-- <q-date v-model="user.birthday" /> -->
      <q-input
        v-model="user.email"
        type="email"
        label="Alamat email"
        required="required"
      />
      <q-input
        v-model="user.password"
        type="password"
        label="Kata sandi"
        required="required"
      />
      <q-input
        v-model="user.password"
        type="password"
        label="Ulang sandi"
        required="required"
      />
      <q-select
        v-model="user.domisili_id"
        :options="options.kota"
        emit-value
        map-options
        label="Domisili"
      />
      <q-select
        v-model="temporary.kota_id"
        :options="options.kota"
        emit-value
        map-options
        label="Kota universitas"
      />
      <q-select
        v-model="temporary.universitas_id"
        :options="options.universitas"
        emit-value
        map-options
        label="Universitas"
      />
      <q-select
        v-model="temporary.fakultas_id"
        :options="options.fakultas"
        emit-value
        map-options
        label="Fakultas"
      />
      <q-select
        v-model="user.jurusan_id"
        :options="options.jurusan"
        emit-value
        map-options
        label="Jurusan"
      />
      <q-input
        v-model="user.tahun_lulus"
        type="number"
        min="1950"
        max="2022"
        label="Tahun lulus (1950-2022)"
        required="required"
      />
      <q-input
        v-model="user.ipk"
        type="number"
        min="0"
        max="4.00"
        step="0.01"
        label="Index Prestasi Kumulatif (0.00-4.00)"
        required="required"
      />
      <q-select
        v-model="user.gender_id"
        :options="options.gender"
        emit-value
        map-options
        label="Gender"
      />
      <q-select
        v-model="user.religion_id"
        :options="options.religion"
        emit-value
        map-options
        label="Religion"
      />
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
        email: "",
        password: "",
        password_repeat: "",
        name: "",
        birthdate: "",
        // birthdate: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
        domisili_id: "",
        jurusan_id: "",
        tahun_lulus: 1950,
        ipk: 0,
        religion_id: "",
        gender_id: "",
      },
      temporary: {
        kota_id: "",
        universitas_id: "",
        fakultas_id: "",
      },
      options: {
        kota: [],
        universitas: [],
        fakultas: [],
        jurusan: [],
        gender: [
          { label: "Pria", value: 0 },
          { label: "Wanita", value: 1 },
        ],
        religion: [
          "Kristen",
          "Katolik",
          "Islam",
          "Buddha",
          "Hindu",
          "Konghucu",
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.user);
      // axios dsb
    },
  },
  mounted () {
    // load axios daftar kota > options.kota
  },
};
</script>

<style lang="scss" scoped>
</style>
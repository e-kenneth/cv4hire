<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="form-header">Daftar akun baru</h5>
      <q-input color="secondary"
        v-model="user.name"
        type="text"
        label="Nama Perusahaan"
        required="required"
      />
      <q-input color="secondary"
        v-model="user.name"
        type="text"
        label="Alamat perusahaan"
        required="required"
      />
      <q-input color="secondary"
        v-model="user.name"
        type="int"
        label="NPWP"
        required="required"
      />

      <q-select color="secondary"
        v-model="user.domisili_id"
        :options="options.kota"
        emit-value
        map-options
        label="Domisili"
      />

      <q-input color="secondary"
        v-model="user.password"
        type="int"
        label="Nomer telpon kantor"
        required="required"
      />

      <q-input color="secondary"
        v-model="user.email"
        type="int"
        label="Nomer HP/ WA"
        required="required"
      />
      <q-input color="secondary"
        v-model="user.email"
        type="email"
        label="Alamat email perusahaan"
        required="required"
      />
      <q-input color="secondary"
        v-model="user.password"
        type="password"
        label="Kata sandi"
        required="required"
      />
      <q-input color="secondary"
        v-model="user.password"
        type="text"
        label="website perusahaan (jika mempunyai)"
      />

      <q-select color="secondary"
        v-model="user.religion_id"
        :options="options.religion"
        emit-value
        map-options
        label="Bidang bisnis"
      />
      <div>
        <q-btn label="Daftar sekarang" type="submit" color="secondary" />
        <q-btn
          label="Saya sudah punya akun"
          color="secondary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { api } from "boot/axios";
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
  mounted() {
    // load axios daftar kota > options.kota
  },

  mounted() {
    api
      .get("kota/")
      .then((response) => {
        response.data.forEach((currentData) => {
          const newKota = {
            label: currentData.name,
            value: currentData.id,
          };
          this.options.kota.push(newKota);
        });
      })
      .catch(() => {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Loading failed",
          icon: "report_problem",
        });
      });
  },
};
</script>

<style lang="scss" scoped>
</style>
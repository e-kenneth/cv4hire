<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="form-header">Daftar akun baru</h5>
      <q-input color="secondary"
        v-model="user.name"
        type="text"
        label="Nama lengkap"
        required="required"
      />
      <div class="row">
        <div class=" self-center q-pr-lg">Tanggal lahir:</div>
        <q-input color="secondary" type="date" v-model="user.birthdate" required="required" />
      </div>
      <!-- <q-date v-model="user.birthday" /> -->
      <q-input color="secondary"
        v-model="user.email"
        type="email"
        label="Alamat email"
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
        type="password"
        label="Ulang sandi"
        required="required"
      />
      <q-select color="secondary"
        v-model="user.domisili_id"
        :options="options.kota"
        emit-value
        map-options
        label="Domisili"
      />
      <q-select color="secondary"
        v-model="temporary.kota_id"
        :options="options.kota"
        emit-value
        map-options
        @input-value="loadUniversitas"
        label="Kota universitas"
      />
      <q-select color="secondary"
        v-model="temporary.universitas_id"
        :options="options.universitas"
        emit-value
        map-options
        label="Universitas"
      />
      <q-select color="secondary"
        v-model="temporary.fakultas_id"
        :options="options.fakultas"
        emit-value
        map-options
        label="Fakultas"
      />
      <q-select color="secondary"
        v-model="user.jurusan_id"
        :options="options.jurusan"
        emit-value
        map-options
        label="Jurusan"
      />
      <q-input color="secondary"
        v-model="user.tahun_lulus"
        type="number"
        min="1950"
        max="2022"
        label="Tahun lulus (1950-2022)"
        required="required"
      />
      <q-input color="secondary"
        v-model="user.ipk"
        type="number"
        min="0"
        max="4.00"
        step="0.01"
        label="Index Prestasi Kumulatif (0.00-4.00)"
        required="required"
      />
      <q-select color="secondary"
        v-model="user.gender_id"
        :options="options.gender"
        emit-value
        map-options
        label="Gender"
      />
      <q-select color="secondary"
        v-model="user.religion_id"
        :options="options.religion"
        emit-value
        map-options
        label="Religion"
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
    loadUniversitas() {},
  },
  computed: {
    selectedKota() {
      return this.temporary.kota_id;
    },
  },
  watch: {
    selectedKota: function (newValue, oldValue) {
      this.options.universitas = [];
      this.temporary.universitas_id = "";
      this.temporary.fakultas_id = "";
      this.temporary.jurusan_id = "";
      api
        .get("universitas/universitasbykotaid.php?id=" + newValue)
        .then((response) => {
          response.data.forEach((currentData) => {
            const newUniversitas = {
              label: currentData.name,
              value: currentData.id,
            };
            this.options.universitas.push(newUniversitas);
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
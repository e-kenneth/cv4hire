<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="form-header">Daftar akun baru</h5>
      <q-input
        color="secondary"
        v-model="user.name"
        type="text"
        label="Nama lengkap"
      />
      <div class="row">
        <div class="self-center q-pr-lg">Tanggal lahir:</div>
        <q-input color="secondary" type="date" v-model="user.birthdate" />
      </div>
      <q-input
        color="secondary"
        v-model="auth.email"
        type="email"
        label="Alamat email"
        required="required"
      />
      <q-input
        color="secondary"
        v-model="auth.password"
        type="password"
        label="Kata sandi"
        required="required"
      />
      <q-input
        color="secondary"
        v-model="auth.password"
        type="password"
        label="Ulang sandi"
        required="required"
      />
      <q-select
        color="secondary"
        v-model="user.job_id"
        :options="options.jobs"
        use-chips
        multiple
        max-values="3"
        emit-value
        map-options
        label="Pekerjaan yang diinginkan"
      />
      <q-select
        color="secondary"
        v-model="user.city_id"
        :options="temp.optionCity"
        use-chips
        multiple
        max-values="3"
        use-input
        @filter="filterCityFn"
        emit-value
        map-options
        label="Domisili"
      />
      <q-select
        color="secondary"
        v-model="user.gender_id"
        :options="options.genders"
        emit-value
        map-options
        label="Gender"
      />
      <q-select
        color="secondary"
        v-model="user.religion_id"
        :options="options.religions"
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
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  data() {
    return {
      temp: {
        optionCity: [],
      },
      auth: {
        email: "",
        password: "",
        password_repeat: "",
      },
      user: {
        name: "",
        birthdate: "",
        job_id: [],
        city_id: [],
        religion_id: "",
        gender_id: "",
      },
    };
  },
  computed: {
    options() {
      return this.$store.state.main.options;
    },
  },
  mounted() {
    this.options.cities.forEach((city) => {
      this.temp.optionCity.push(city);
    });
  },
  methods: {
    onSubmit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.auth.email, this.auth.password)
        .then((userCredential) => {
          let user = userCredential.user;
          firebase
            .firestore()
            .collection("professionals")
            .doc(user.uid)
            .set(this.user)
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: 0,
            })
            .catch((error) => {
              console.error(error);
            });
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.log(error.code);
          this.$q.notify({
            message: error.message,
            color: "red",
          });
        });
    },
    filterCityFn(val, update) {
      if (val === "") {
        update(() => {
          this.temp.optionCity = this.options.cities;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();

        this.temp.optionCity = [];

        this.options.cities.forEach((city) => {
          if (city.label.toLowerCase().includes(needle)) {
            this.temp.optionCity.push(city);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

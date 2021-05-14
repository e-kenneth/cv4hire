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
        emit-value
        map-options
        label="Pekerjaan yang diinginkan"
      />
      <q-select
        color="secondary"
        v-model="user.city_id"
        :options="options.cities"
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
      auth: {
        email: "",
        password: "",
        password_repeat: "",
      },
      user: {
        name: "",
        birthdate: "",
        // birthdate: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
        job_id: "",
        city_id: "",
        religion_id: "",
        gender_id: "",
        type_id: 0,
      },
    };
  },
  computed: {
    options() {
      return this.$store.state.main.options;
    },
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
            .currentUser.sendEmailVerification()
            .then(() => {})
            .catch((error) => {});
        })
        .catch((error) => {
          console.log(error.code);
          this.$q.notify({
            message: error.message,
            color: "red",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>

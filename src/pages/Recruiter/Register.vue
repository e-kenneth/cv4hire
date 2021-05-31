<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="form-header">Daftar akun baru</h5>
      <q-input
        color="secondary"
        v-model="user.name"
        type="text"
        label="Nama Perusahaan"
        required="required"
      />
      <q-input
        color="secondary"
        v-model="user.address"
        type="text"
        label="Alamat perusahaan"
        required="required"
      />
      <q-input
        color="secondary"
        v-model="user.npwp"
        type="int"
        label="NPWP"
        required="required"
      />

      <!-- <q-select color="secondary" -->
      <!-- v-model="user.domisili_id"
        :options="options.kota"
        emit-value
        map-options
        label="Domisili" -->
      <!-- />  -->
      <!-- 
      <q-input color="secondary"
        v-model="user."
        type="int"
        label="Nomer telpon kantor"
        required="required"
      /> -->

      <q-input
        color="secondary"
        v-model="user.phonenum"
        type="int"
        label="Nomer HP/ WA"
        required="required"
      />
      <q-input
        color="secondary"
        v-model="auth.email"
        type="email"
        label="Alamat email perusahaan"
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
      <q-input
        color="secondary"
        v-model="user.website"
        type="text"
        label="website perusahaan (jika mempunyai)"
      />

      <q-select
        color="secondary"
        v-model="user.business_type_id"
        :options="options.jobSectors"
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
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
  data() {
    return {
      user: {
        address: "",
        business_type_id: "",
        name: "",
        npwp: "",
        phone_num: "",
        website: "",
      },
      auth: {
        email: "",
        password: "",
        password_repeat: "",
      },
    };
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
            .collection("companies")
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
              displayName: 1,
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
  },
  computed: {
    options() {
      return this.$store.state.main.options;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
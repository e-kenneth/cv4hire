<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="form-header">Login</h5>
      <q-input
        color="secondary"
        v-model="user.email"
        type="email"
        label="Alamat email"
        required="required"
      />
      <q-input
        color="secondary"
        v-model="user.password"
        type="password"
        label="Kata sandi"
        required="required"
      />
      <q-btn label="Masuk" type="submit" color="secondary" />
      <q-btn
        label="Daftar sebagai professional"
        type="submit"
        color="primary"
        to="/professional/register/"
      />
      <q-btn
        label="Daftar sebagai perusahaan"
        type="submit"
        color="primary"
        to="/recruiter/register/"
      />
    </q-form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then((userCredential) => {
          // redirect
          this.$router.push("/browse");
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

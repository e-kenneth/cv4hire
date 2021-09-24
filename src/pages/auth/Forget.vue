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
      <q-btn label="Reset kata sandi" type="submit" color="secondary" />
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
      },
    };
  },
  methods: {
    onSubmit() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then((userCredential) => {
          this.$q.notify({
            message: "Link reset password sudah dikirim",
            color: "secondary",
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
};
</script>

<style lang="scss" scoped></style>

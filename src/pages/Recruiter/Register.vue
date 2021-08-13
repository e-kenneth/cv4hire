<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="form-header">Daftar sebagai perusahaan baru</h5>
      <q-input
        color="secondary"
        v-model="user.name"
        type="text"
        label="Nama Perusahaan"
        required
      />
      <q-file
        required
        v-model="temp.photo"
        label="Logo perusahaan"
        accept="image/*"
      >
        <template v-slot:prepend>
          <q-icon name="add_photo_alternate" />
        </template>
      </q-file>
      <q-select
        required
        color="secondary"
        v-model="user.business_type_id"
        :options="options.jobSectors"
        emit-value
        map-options
        label="Bidang bisnis"
      />
      <q-input
        color="secondary"
        v-model="user.address"
        type="text"
        label="Alamat perusahaan"
        required
      />
      <q-input
        color="secondary"
        v-model="user.npwp"
        type="int"
        label="NPWP"
        required
      />

      <q-input
        color="secondary"
        v-model="user.phone_num"
        type="int"
        label="Nomer HP/ WA"
        required
      />
      <q-input
        color="secondary"
        v-model="auth.email"
        type="email"
        label="Alamat email perusahaan"
        required
      />
      <q-input
        color="secondary"
        v-model="auth.password"
        type="password"
        label="Kata sandi"
        required
      />
      <q-input
        color="secondary"
        v-model="temp.password_repeat"
        type="password"
        label="Ulang sandi"
        required
      />
      <q-input
        required
        color="secondary"
        v-model="user.website"
        type="text"
        label="Website perusahaan"
      />
      <q-input
        required
        color="secondary"
        v-model="user.about"
        type="text"
        autogrow=""
        label="Tentang perusahaan"
      />

      <div>
        <q-btn label="Daftar sekarang" type="submit" color="secondary" />
        <q-btn
          label="Saya sudah punya akun"
          color="secondary"
          flat
          to="/login"
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
import "firebase/storage";
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
        about: "",
        coins: 0,
      },
      temp: {
        photo: null,
        password_repeat: "",
      },
      auth: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.auth.password != this.temp.password_repeat) {
        this.$q.notify({
          message: "Kata sandi dan kata sandi ulang tidak sama",
          color: "red",
        });
        return null;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.auth.email, this.auth.password)
        .then((userCredential) => {
          let user = userCredential.user;
          let operations = [];
          operations.push(
            firebase
              .firestore()
              .collection("companies")
              .doc(user.uid)
              .set(this.user)
          );
          operations.push(
            firebase.auth().currentUser.updateProfile({
              displayName: 1,
            })
          );
          let storageRef = firebase
            .storage()
            .ref()
            .child(`recruiters/${user.uid}/logo`);
          operations.push(
            storageRef.put(this.temp.photo).then(() => {
              console.log("Upload Success");
            })
          );
          operations.push(firebase.auth().currentUser.sendEmailVerification());
          Promise.all(operations).then(() => {
            window.location.href = "/browse";
              // this.$router.push("/browse");
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

<style lang="scss" scoped></style>

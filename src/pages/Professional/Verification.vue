<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md columns">
      <h5 class="form-header">Verifikasi akun</h5>

      <q-file v-model="temp.video" label="Video CV anda" accept="video/*">
        <template v-slot:prepend>
          <q-icon name="add_photo_alternate" />
        </template>
      </q-file>

      <q-file v-model="temp.ktp" label="Foto KTP" accept="image/*">
        <template v-slot:prepend>
          <q-icon name="add_photo_alternate" />
        </template>
      </q-file>

      <q-file
        v-model="temp.photousername"
        label="Foto dengan username"
        accept="image/*"
      >
        <template v-slot:prepend>
          <q-icon name="add_photo_alternate" />
        </template>
      </q-file>

      <div>
        <q-btn label="Kirim verifikasi" type="submit" color="secondary" />
      </div>
    </q-form>

    <q-dialog :persistent="true" v-model="opened">
      <q-card>
        <q-card-section class="column" v-if="success">
          <q-btn
            color="secondary"
            icon="check"
            label="Upload sukses. Kembali ke beranda."
            @click="backToHome"
          />
        </q-card-section>
        <q-card-section class="column" v-else>
          <q-spinner color="secondary" size="3em" />
        </q-card-section>
      </q-card>
    </q-dialog>
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
      opened: false,
      success: false,
      temp: {
        video: null,
        ktp: null,
        photousername: null,
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.main.user;
    },
    dataProfessional() {
      return this.$store.state.main.user;
    },
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
    onSubmit() {
      this.opened = true;
      // const payload = { verificationStatus: 1, verificationDate: new Date() };
      const operations = [];
      operations.push(
        firebase
          .storage()
          .ref()
          .child(`professionals/${this.user.uid}/video`)
          .put(this.temp.video)
          .then(() => {
            console.log("Upload video success");
          })
      );
      operations.push(
        firebase
          .storage()
          .ref()
          .child(`professionals/${this.user.uid}/ktp`)
          .put(this.temp.ktp)
          .then(() => {
            console.log("Upload ktp success");
          })
      );
      operations.push(
        firebase
          .storage()
          .ref()
          .child(`professionals/${this.user.uid}/photousername`)
          .put(this.temp.photousername)
          .then(() => {
            console.log("Upload photousername success");
          })
      );
      operations.push(
        firebase
          .firestore()
          .collection("professionals")
          .doc(this.user.uid)
          .update({
            verificationStatus: 1, // 0 belum, 1 pending, 2 sukses, 3 declined
            verificationDate: new Date(),
          })
          .then(() => {
            this.$store.commit("main/uploadVerification");
            console.log("Document successfully written!");
          })
      );
      Promise.all(operations).then(() => {
        console.log("Upload all success");
        this.success = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

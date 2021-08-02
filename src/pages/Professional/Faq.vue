<template>
  <div>
    <div class="header text-center">Cara mencari kerja di CVForHire</div>

    <div class="row q-pa-md q-gutter-md">
      <div class="col-12 col-lg q-pa-md" v-for="card in faqCards" :key="card.title">
        <FaqCard :card="card"></FaqCard>
      </div>
    </div>

    <div class="row q-px-lg q-pb-md justify-center">
      <div class="col-12 col-lg-6 bg-primary q-pa-xl timeline">
        <q-timeline color="secondary">
          <q-timeline-entry heading class="text-secondary">
            6 LANGKAH MEMBUAT VIDEO CV YANG MENARIK
          </q-timeline-entry>

          <q-timeline-entry icon="looks_one">
            <div>
              Letakkan Handphone / kamera pada posisi yang benar ( Sesuaikan
              dengan posisi anda , bisa duduk ataupun berdiri. Lebih baik
              menggunakan meja atau tripod agar mendapatkan hasil yang bagus )
            </div>
          </q-timeline-entry>

          <q-timeline-entry icon="looks_two">
            <div>
              Pastikan anda berbicara dengan suara yang jelas dan Bahasa yang di
              mengerti. Awali perkenalan diri anda dengan menyebutkan NO.ID yang
              didapat pada saat membuat akun baru. Tidak diperkenankan
              menyebutkan nama atau identitas diri yang lain.
            </div>
          </q-timeline-entry>

          <q-timeline-entry icon="looks_3">
            <div>
              Awali dengan penuh kepercayaan diri. Kesan awal menentukan
              penilaian dari perusahaan pencari tenaga kerja.
            </div>
          </q-timeline-entry>

          <q-timeline-entry icon="looks_4">
            <div>
              Buatlah penekanan terhadap sisi positif anda dan semua keunggulan
              yang anda miliki.
            </div>
          </q-timeline-entry>

          <q-timeline-entry icon="looks_5">
            <div>
              Kalimat yang disampaikan hendaknya singkat , jelas , dan tidak
              tergesa gesa. Jangan menghabiskan durasi untuk informasi yang
              tidak penting. Durasi Max 1 Menit.
            </div>
          </q-timeline-entry>

          <q-timeline-entry icon="looks_6">
            <div>
              Persiapan : Buatlah beberapa video Latihan Bersama dengan teman
              dan mintalah saran tentang video yang sudah dibuat.
            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import FaqCard from "components/FaqCard.vue";
export default {
  components: {
    FaqCard,
  },
  data() {
    return {
      faqCards: [
        {
          img: "https://i.imgur.com/vikAgTO.jpg",
          title: "Membuat akun baru",
          text1: "Pencari kerja membuat akun baru untuk mendapatkan nomor ID",
          text2: "Text2",
        },
        {
          img: "https://i.imgur.com/1vhQu7c.jpg",
          title: "Buat video  ",
          text1:
            "Pencari kerja membuat video dengan melihat panduan yang telah disediakan oleh CVforhire",
          text2: "Text2",
        },
        {
          img: "https://i.imgur.com/qUf2d9y.jpg",
          title: "Kirimkan video",
          text1:
            "Pencari kerja bisa mengirimkan video dalam format MP4 kepada admin CVforhire",
          text2: "Text2",
        },
      ],
      step: 1,
      expanded: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 50px;
}

.timeline {
  border-radius: 5px;
  color: white;
  font-size: 20px;
}
</style>
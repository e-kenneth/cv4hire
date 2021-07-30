<template>
  <div>
    <div class="header text-center">Cara mencari kerja di CVForHire</div>

    <div class="row q-pa-md q-gutter-md">
        
      <div class="col" v-for="card in faqCards" :key="card.title">
        <FaqCard :card="card"></FaqCard>
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
            {img: "https://i.imgur.com/vikAgTO.jpg", title:"Membuat akun baru", text1: "Pencari kerja membuat akun baru untuk mendapatkan nomor ID", text2: "Text2"},
            {img: "https://i.imgur.com/1vhQu7c.jpg", title:"Buat video  ", text1: "Pencari kerja membuat video dengan melihat panduan yang telah disediakan oleh CVforhire", text2: "Text2"},
            {img: "https://i.imgur.com/qUf2d9y.jpg", title:"Kirimkan video", text1: "Pencari kerja bisa mengirimkan video dalam format MP4 kepada admin CVforhire", text2: "Text2"},
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
</style>
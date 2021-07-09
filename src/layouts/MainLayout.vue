<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar ref="toolbar">
        <q-btn
          v-if="orientation == 'portrait'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <!-- <q-toolbar-title> CV4Hire </q-toolbar-title> -->
        <div>
          <router-link to="/"
            ><img class="logo-top" src="~assets/logo.png" alt="cv4hire_logo"
          /></router-link>
        </div>

        <!-- <span v-if="orientation == 'landscape'"> -->
        <EssentialLink
          v-if="orientation == 'landscape'"
          position="top"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <!-- </span> -->

        <q-space />

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <!-- <div>
          <q-btn
            color="secondary"
            icon="brightness_high"
            class="q-mr-md"
            @click="darkMode.toggle"
          />
        </div> -->
        <div v-if="$store.state.main.user.type == 1"><Coin /></div>
        <div><UserButton /></div>
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-primary text-white" v-model="leftDrawerOpen" elevated>
      <q-list>
        <div>
          <router-link to="/"
            ><img class="logo-top" src="~assets/logo.png" alt="cv4hire_logo"
          /></router-link>
        </div>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from "components/EssentialLink.vue";
import UserButton from "components/UserButton.vue";
import Coin from "components/Coin.vue";

import { defineComponent, ref, computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    UserButton,
    Coin,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();

    const store = useStore();

    const essentialLinks = computed(() => {
      let links = [
        {
          title: "Beranda",
          icon: "home",
          link: "/",
        },
        {
          title: "Cari",
          icon: "search",
          link: "/browse/",
        },
      ];
      if (store.state.main.user.type == 0) {
        links.push({
          title: "Profil",
          icon: "person",
          link: `/profile/${store.state.main.user.uid.substring(0,6).toUpperCase()}`,
        });
        if (store.state.main.dataProfessional.verificationStatus != 2) {
          links.push({
            title: "Verifikasi",
            icon: "verified_user",
            link: "/verification/",
          });
        }
      } else if (store.state.main.user.type == 1) {
        links.push({
          title: "Profil",
          icon: "person",
          link: `/company/profile/`,
        });
      }
      return links;
    });

    // $q.screen.setSizes({ sm: 0, md: 800, lg: 1000, xl: 1279 });

    const orientation = computed(() => {
      if ($q.screen.width >= $q.screen.height) {
        return "landscape";
      } else {
        return "portrait";
      }
    });

    const darkMode = computed(() => store.state.main.settings.darkMode);

    watch(darkMode, (newValue, oldValue) => {
      console.log(newValue);
      $q.dark.toggle();
    });

    return {
      essentialLinks,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      orientation,
    };
  },
});
</script>
<style lang="scss" scoped>
%logo {
  height: 40px;
  border-radius: 5px;
  background-color: white;
}

.logo-top {
  @extend %logo;
  margin: 5px 20px 0 10px;
}

.logo-side {
  @extend %logo;
  margin: 20px 0 20px 20px;
}
</style>

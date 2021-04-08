<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <!-- <q-toolbar-title> CV4Hire </q-toolbar-title> -->
        <div>
          <img class="logo-top" src="~assets/logo.png" />
        </div>

        <EssentialLink
          position="top"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />

        <q-space />

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <div>
          <q-btn
            color="secondary"
            icon="brightness_high"
            class="q-mr-md"
            @click="darkMode.toggle"
          />
        </div>
        <div><q-btn color="secondary" icon="person" /></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-primary text-white"
      v-model="leftDrawerOpen"
      show-if-above
      elevated
    >
      <q-list>
        <div>
          <img class="logo-side" src="~assets/logo.png" /> 
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

const linksList = [
  {
    title: "Home",
    icon: "school",
    link: "/",
  },
  {
    title: "Browse",
    icon: "school",
    link: "/browse/",
  },
  {
    title: "Profile",
    icon: "school",
    link: "/profile/",
  },
];

import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();

    const darkMode = {
      toggle: () => {
        $q.dark.toggle();
      },
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      darkMode,
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
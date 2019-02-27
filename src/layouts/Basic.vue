<template>
  <q-layout view="lHr Lpr lff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-show="$q.platform.is.mobile" dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>YetiForceCRM</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-3"
      :mini="$q.platform.is.mobile ? !leftDrawerOpen : miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      show-if-above
      bordered
    >
      <left-menu />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import LeftMenu from 'components/Base/Menu/LeftMenu.vue'

export default {
  name: 'Basic',
  components: {
    LeftMenu
  },
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      miniState: true
    }
  },
  methods: {
    openURL
  }
}
</script>

<style></style>

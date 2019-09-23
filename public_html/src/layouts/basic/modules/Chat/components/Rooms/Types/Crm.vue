<!-- /* {[The file is published on the basis of YetiForce Public License 3.0 that can be found in the following directory: licenses/LicenseEN.txt or yetiforce.com]} */ -->
<template>
  <List :hideUnpinned="false" :addRoomComponent="config.dynamicAddingRooms">
    <template v-slot:item-right>
      <q-btn
        size="xs"
        dense
        round
        flat
        color="primary"
        class="js-popover-tooltip--record ellipsis"
        @click.stop=""
        icon="mdi-link-variant"
        :href="`index.php?module=${room.moduleName}&view=Detail&record=${room.recordid}`"
      />
    </template>
    <template v-slot:item-right>
      <q-item v-if="config.dynamicAddingRooms" v-show="showAddRoomPanel">
        <select-modules :modules="config.chatModules" :isVisible.sync="showAddRoomPanel" class="q-pb-xs" />
      </q-item>
    </template>
  </List>
</template>
<script>
import SelectModules from './SelectModules.vue'
import List from '../List.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('Chat')
export default {
  name: 'Crm',
  components: { SelectModules, List },
  data() {
    return {
      showAddRoomPanel: false,
      showAddPrivateRoom: false,
      confirm: false,
      roomToArchive: {}
    }
  },
  computed: {
    ...mapGetters(['leftPanel', 'data', 'config', 'isSoundNotification', 'roomSoundNotificationsOff', 'layout'])
  },
  methods: {
    ...mapMutations(['setLeftPanel']),
    ...mapActions(['fetchRoom', 'togglePinned', 'toggleRoomSoundNotification', 'archivePrivateRoom'])
  }
}
</script>
<style lang="sass" scoped>
</style>

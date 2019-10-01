<!-- /* {[The file is published on the basis of YetiForce Public License 3.0 that can be found in the following directory: licenses/LicenseEN.txt or yetiforce.com]} */ -->
<template>
  <q-drawer
    :breakpoint="layout.drawer.breakpoint"
    no-swipe-close
    no-swipe-open
    :show-if-above="false"
    v-model="computedModel"
    side="left"
    bordered
    @hide="toggleLeftPanel(false)"
    class="backdrop-fix"
    ref="chatPanel"
  >
    <div class="fit bg-grey-11">
      <slot name="top"></slot>
      <div class="bg-grey-11">
        <q-input dense v-model="filterRooms" :placeholder="translate('JS_CHAT_FILTER_ROOMS')" class="q-px-sm">
          <template #prepend>
            <q-icon name="mdi-magnify" />
          </template>
          <template #append>
            <q-icon v-show="filterRooms.length > 0" name="mdi-close" @click="filterRooms = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <div v-for="(roomGroup, roomType) of roomList" :key="roomType" :style="{ fontSize: layout.drawer.fs }">
          <component
            :is="roomsMap[roomType]"
            :roomType="roomType"
            :roomData="roomList[roomType]"
            :filterRooms="filterRooms"
          />
        </div>
      </div>
    </div>
  </q-drawer>
</template>
<script>
import RoomPrivate from './Rooms/RoomPrivate.vue'
import RoomGroup from './Rooms/RoomGroup.vue'
import RoomGlobal from './Rooms/RoomGlobal.vue'
import RoomRecord from './Rooms/RoomRecord.vue'
import { drawerBase } from '../utils/mixins.js'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('Chat')
export default {
  name: 'ChatLeftPanel',
  components: { RoomPrivate, RoomGroup, RoomGlobal, RoomRecord },
  mixins: [drawerBase],
  data() {
    return {
      filterRooms: '',
      roomsMap: {
        private: 'RoomPrivate',
        group: 'RoomGroup',
        global: 'RoomGlobal',
        crm: 'RoomRecord'
      }
    }
  },
  watch: {
    mobileMode(isMobileMode) {
      this.fixBackdropOfMobilePanel(isMobileMode)
    }
  },
  computed: {
    ...mapGetters(['data', 'layout', 'coordinates', 'miniMode', 'mobileMode']),
    leftPanel: {
      get() {
        return this.$store.getters['Chat/leftPanel']
      },
      set(isOpen) {}
    },
    leftPanelMobile: {
      get() {
        return this.$store.getters['Chat/leftPanelMobile']
      },
      set(isOpen) {}
    },
    roomList() {
      if (this.filterRooms === '') {
        return {
          private: Object.values(this.data.roomList.private).sort(this.sortByRoomName),
          group: Object.values(this.data.roomList.group).sort(this.sortByRoomName),
          global: Object.values(this.data.roomList.global).sort(this.sortByRoomName),
          crm: Object.values(this.data.roomList.crm).sort(this.sortByRoomName)
        }
      } else {
        return {
          private: Object.values(this.data.roomList.private).filter(this.filterRoomByName),
          group: Object.values(this.data.roomList.group).filter(this.filterRoomByName),
          global: Object.values(this.data.roomList.global).filter(this.filterRoomByName),
          crm: Object.values(this.data.roomList.crm).filter(this.filterRoomByName)
        }
      }
    },
    computedModel: {
      get() {
        return this.mobileMode ? this.leftPanelMobile : this.leftPanel
      },
      set(isOpen) {
        this.toggleLeftPanel(isOpen)
      }
    }
  },
  methods: {
    ...mapMutations(['setLeftPanel']),
    ...mapActions(['toggleLeftPanel']),
    filterRoomByName(room) {
      return room.name.toLowerCase().includes(this.filterRooms.toLowerCase())
    },
    sortByRoomName(a, b) {
      return a.name > b.name ? 1 : -1
    }
  }
}
</script>
<style lang="scss" scoped>
.backdrop-fix .fullscreen.q-drawer__backdrop.no-pointer-events {
  background-color: rgba(0, 0, 0, 0);
}
</style>

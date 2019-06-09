import Vue from 'vue';
import Vuex from 'vuex';
import {memberStore} from '@/store/members.store';
import {userStore} from '@/store/user.store';
import {eventStore} from '@/store/event.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    memberStore,
    userStore,
    eventStore,
  }
});

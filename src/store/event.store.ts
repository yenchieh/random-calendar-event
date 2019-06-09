import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {Event} from '@/model/event';

const state: Event = {
  title: '',
  startDate: '',
  endDate: '',
  startTime: '10:00',
  endTime: '16:00',
  description: '',
};

const getters: GetterTree<Event, {}> = {
  event: () => {
    return state;
  }
};

const actions: ActionTree<Event, {}> = {

};

const mutations: MutationTree<Event> = {
  SET_TITLE: (state, title: string) => {
    state.title = title;
  },

  SET_START_DATE: (state, start: string) => {
    state.startDate = start;
  },

  SET_END_DATE: (state, end: string) => {
    state.endDate = end;
  },

  SET_START_TIME: (state, time: string) => {
    state.startTime = time;
  },

  SET_END_TIME: (state, time: string) => {
    state.endTime = time;
  },

  SET_DESCRIPTION: (state, description: string) => {
    state.description = description;
  },
};

export const eventStore: Module<Event, {}> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

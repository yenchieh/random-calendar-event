import {Member, MemberState} from '@/model/member';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';

const state: MemberState = {
  members: [],
};

const getters: GetterTree<MemberState, {}> = {
  members: () => {
    return state.members;
  },

  selectedMembers: () => {
    return state.members.filter((m: Member) => m.selected);
  }
};

const actions: ActionTree<MemberState, {}> = {
  fetchData({commit}) {
    // TODO: fetch data from Firebase
    commit('INIT_MEMBERS', [
      {
        id: 1,
        name: 'Jay',
        icon: 'https://image.flaticon.com/icons/svg/1076/1076877.svg',
        title: 'Developer',
        email: 'yenchieh-test+1@gmail.com',
        note: 'You are not right',
      },
      {
        id: 2,
        name: 'Yen-Chieh Chen',
        icon: 'https://image.flaticon.com/icons/svg/616/616554.svg',
        title: 'Jay',
        email: 'yenchieh-test+2@gmail.com',
        note: 'You are not !!!!',
      },
      {
        id: 3,
        name: 'Joyce',
        icon: 'https://image.flaticon.com/icons/svg/291/291212.svg',
        title: 'JOyce',
        email: 'yenchieh-test+3@gmail.com',
        note: 'You are not !!!!',
      },
    ]);
  },
  selectMember({commit}, memberId: number) {
    commit('SELECT_MEMBER', memberId);
  },
  unselectMember({commit}, memberId: number) {
    commit('UNSELECT_MEMBER', memberId);
  },
  toggleSelectMember({commit}, memberId: number) {
    const index = state.members.findIndex((m: Member) => m.id === memberId);
    if (index === -1) {
      return;
    }
    if (state.members[index].selected) {
      commit('UNSELECT_MEMBER', memberId);
      return;
    }
    console.log(state.members[index].selected);

    commit('SELECT_MEMBER', memberId);
  },
  deleteMember({commit}, memberId: number) {
    commit('DELETE_MEMBER', memberId);
  }
};

const mutations: MutationTree<MemberState> = {
  INIT_MEMBERS: (state, members: Member[]) => {
    state.members = [];
    members.forEach((m: Member) => {
      state.members.push({
        ...m,
        selected: false,
      });
    });
  },

  ADD_MEMBERS: (state, members: Member[]) => {
    members.forEach((m: Member) => {
      state.members.unshift({
        ...m,
        selected: false,
      });
    });
  },

  SELECT_MEMBER: (state, memberId: number) => {
    if (memberId == -1) {
      for (let i = 0; i < state.members.length; i++) {
        state.members[i].selected = true;
      }
      return;
    }

    const index = state.members.findIndex(m => m.id === memberId);
    if (index === -1) {
      return;
    }
    const member = Object.assign({}, state.members[index]);
    member.selected = true;
    state.members.splice(index, 1, member);
  },

  UNSELECT_MEMBER: (state, memberId: number) => {
    if (memberId == -1) {
      for (let i = 0; i < state.members.length; i++) {
        state.members[i].selected = false;
      }
      return;
    }

    const index = state.members.findIndex(m => m.id === memberId);
    if (index === -1) {
      return;
    }
    state.members[index].selected = false;
  },

  DELETE_MEMBER: (state, memberId: number) => {
    const index = state.members.findIndex(m => m.id === memberId);
    if (index === -1) {
      return;
    }
    state.members.splice(index, 1);
  },
};

export const memberStore: Module<MemberState, {}> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

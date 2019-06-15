import { Member, MemberState } from '@/model/member';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import firebase from 'firebase';

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
  fetchData({ commit }) {
    firebase.database().ref('member').once('value').then((result: any) => {
      const members: Map<string, Member> = new Map(Object.entries(result.val()));
      console.log(Array.from(members.values()));
      commit('INIT_MEMBERS', Array.from(members.values()));
    });

  },
  addMember({ commit }, member: Member) {
    commit('ADD_MEMBERS', [member]);
  },
  selectMember({ commit }, memberId: string) {
    commit('SELECT_MEMBER', memberId);
  },
  unselectMember({ commit }, memberId: string) {
    commit('UNSELECT_MEMBER', memberId);
  },
  toggleSelectMember({ commit }, memberId: string) {
    const index = state.members.findIndex((m: Member) => m.id === memberId);
    if(index === -1) {
      return;
    }
    if(state.members[index].selected) {
      commit('UNSELECT_MEMBER', memberId);
      return;
    }
    console.log(state.members[index].selected);

    commit('SELECT_MEMBER', memberId);
  },
  deleteMember({ commit }, memberId: number) {
    commit('DELETE_MEMBER', memberId);
  }
};

const mutations: MutationTree<MemberState> = {
  INIT_MEMBERS: (state, members: Member[]) => {
    state.members = [];
    members.forEach((m: Member) => {
      console.log(m);
      state.members.push({
        ...m,
        selected: false,
      });
    });
  },

  ADD_MEMBERS: (state, members: Member[]) => {
    members.forEach((m: Member) => {
      firebase.database().ref(`member/${m.id}`).set(m).then((result: any) => {
        console.log(result);
        state.members.unshift({
          ...m,
          selected: false,
        });
      });
    });
  },

  SELECT_MEMBER: (state, memberId: string) => {
    if(memberId == '') {
      for(let i = 0; i < state.members.length; i++) {
        state.members[i].selected = true;
      }
      return;
    }

    const index = state.members.findIndex(m => m.id === memberId);
    if(index === -1) {
      return;
    }
    const member = Object.assign({}, state.members[index]);
    member.selected = true;
    state.members.splice(index, 1, member);
  },

  UNSELECT_MEMBER: (state, memberId: string) => {
    if(memberId == '') {
      for(let i = 0; i < state.members.length; i++) {
        state.members[i].selected = false;
      }
      return;
    }

    const index = state.members.findIndex(m => m.id === memberId);
    if(index === -1) {
      return;
    }
    state.members[index].selected = false;
  },

  DELETE_MEMBER: (state, memberId: string) => {
    firebase.database().ref(`member/${memberId}`).remove().then(() => {
      const index = state.members.findIndex(m => m.id === memberId);
      if(index === -1) {
        return;
      }
      state.members.splice(index, 1);
    });

  },
};

export const memberStore: Module<MemberState, {}> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {User} from '@/model/user';

const state: User = {
  id: '',
  name: '',
  firstname: '',
  lastname: '',
  image: '',
  email: '',
};

const getters: GetterTree<User, {}> = {
  user: () => {
    return state;
  }
};

const actions: ActionTree<User, {}> = {
  
};

const mutations: MutationTree<User> = {
  PUT_USER: (state, user: User) => {
    if(!user) {
      return;
    }
    state.id = user.id;
    state.firstname = user.firstname;
    state.lastname = user.lastname;
    state.email = user.email;
    state.image = user.image;
    state.name = user.name;
  },
};

export const userStore: Module<User, {}> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

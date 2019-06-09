<template>
  <div id="app">
    <div class="loading" v-if="loading">
      <v-progress-circular
        indeterminate
        color="#2488fd"
        size="50"
      ></v-progress-circular>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {User} from "@/model/user";
  import {namespace} from 'vuex-class';

  const userModule = namespace('userStore');

  @Component({})
  export default class App extends Vue {
    @userModule.Mutation('PUT_USER') putUser!: (user: User) => Promise<any>;

    private loading = true;
    private $googleAuth!: gapi.auth2.GoogleAuth;

    public created() {
      if(this.$googleAuth.isSignedIn.get()) {
        const user = this.$googleAuth.currentUser.get().getBasicProfile();
        this.putUser({
          id: user.getId(),
          email: user.getEmail(),
          firstname: user.getGivenName(),
          lastname: user.getFamilyName(),
          image: user.getImageUrl(),
          name: user.getName(),
        });
      } else {
        this.$router.replace('/login');
      }
      this.loading = false;

      // this.$googleAuth.signOut();
    }

  }
</script>

<style lang="scss" scoped>
  .loading {
    position: relative;
    top: 40px;
  }
</style>

<style lang="scss">
  @import 'scss/root';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>

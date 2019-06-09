<template>
  <div id="login">
    <v-container align-center>
      <v-layout row wrap align-center>
        <v-flex xs12 sm12 md12>
          <span class="title">Login</span>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <div class="v-divider"></div>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <v-btn color="#2488fd" dark @click="signin">
            Sign In
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace} from 'vuex-class';
  import {User} from '@/model/user';
  import GoogleUser = gapi.auth2.GoogleUser;

  const userModule = namespace('userStore');


  @Component({})
  export default class Login extends Vue {
    @userModule.Mutation('PUT_USER') putUser!: (user: User) => Promise<any>;

    $googleAuth!: gapi.auth2.GoogleAuth;

    created() {
      if(this.$googleAuth.isSignedIn.get()) {
        this.$router.replace("/");
      }
    }

    signin() {
      this.googleSignin();
    }

    private googleSignin() {
      this.$googleAuth.signIn({
        scope: 'profile email',
      }).then((googleUser: GoogleUser) => {
        const user = googleUser.getBasicProfile();
        this.putUser({
          id: user.getId(),
          email: user.getEmail(),
          firstname: user.getGivenName(),
          lastname: user.getFamilyName(),
          image: user.getImageUrl(),
          name: user.getName(),
        });
        this.$router.push('/member');
      }).catch((err: any) => {
        console.error(err);
      });
    }

  }
</script>

<style lang="scss" scoped>
  .g-signin {
    margin-top: 40px;
  }
</style>

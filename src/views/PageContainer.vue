<template>
  <div id="page">
    <v-container v-if="user.id">
      <v-flex
        align-center
        justify-end
        layout
        xs12 sm12 md12
      >
        <v-avatar
          :size="40"
        >
          <img :src="user.image"/>
        </v-avatar>
        <div class="avatar-name">
          {{ user.name }}
        </div>
      </v-flex>
    </v-container>


    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {namespace} from "vuex-class";
  import {User} from "@/model/user";

  const userModule = namespace("userStore");

  @Component({})
  export default class PageContainer extends Vue {
    @userModule.Getter("user") user!: User[];

  }
</script>

<style lang="scss" scoped>
  @import '../scss/root';

  .avatar-name {
    margin-left: 10px;
    font-weight: bold;
  }

  .container {
    padding: 10px 24px 5px 24px;
  }
</style>

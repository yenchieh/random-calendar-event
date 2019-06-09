<template>
  <v-container align-center>
    <v-layout row wrap align-center>
      <v-flex xs12 sm12 md12>
        <span class="title">Members</span>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <div class="v-divider"></div>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <template v-if="loading">
          <v-progress-circular
            indeterminate
            color="#2488fd"
            size="50"
          ></v-progress-circular>
        </template>
        <template v-else>
          <MemberDetail
            :members="members"
          />
        </template>

      </v-flex>
    </v-layout>

    <v-flex xs12 sm12 md12>
      <v-btn
        rounded
        color="#2488fd"
        :disabled="selectedMembers.length === 0"
        @click="nextStep"
        dark
      >
        Next
      </v-btn>
    </v-flex>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import MemberDetail from '@/components/member/MemberDetail.vue';
  import {Member, MemberState} from "@/model/member";
  import {namespace} from 'vuex-class';

  const memberModule = namespace('memberStore');

  @Component({
    components: {
      MemberDetail,
    },
  })
  export default class MemberPage extends Vue {
    @memberModule.Getter('members') members!: Member[];
    @memberModule.Action('fetchData') fetchMemberData!: () => Promise<any>;
    @memberModule.Getter("selectedMembers") selectedMembers!: Member[];

    private loading = true;
    created() {
      this.fetchMemberData().then(() => {
        this.loading = false;
      })
    }
    private nextStep() {
      this.$router.push(`/event`);
    }

  }
</script>

<style lang="scss" scoped>
  .v-divider {
    margin: 10px 0 20px 0;
  }

</style>

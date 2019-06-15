<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div data-app>

    <v-layout
      column
      justify-center
    >
      <v-layout
        align-center
        row
      >
        <v-btn small fab dark color="indigo" @click="showAddMemberForm = true">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-subheader
          @click="selectOrDeselectAll"
          class="blue--text selectAll"
        >
          {{ !isSelectedAll ? 'Select All' : 'Deselect All' }}
        </v-subheader>

      </v-layout>

      <v-expansion-panel>
        <v-expansion-panel-content
          v-for="(member, index) in members"
          :key="member.name"
          :hide-actions="true"
        >
          <template v-slot:header>
            <v-layout
              align-center
              row
              spacer
            >
              <v-flex xs1 sm1 md1>
                <v-checkbox
                  v-model="member.selected"
                  :hide-details="true"
                  color="purple"
                  @click.stop.prevent="clickedCheckbox(member)"
                ></v-checkbox>
              </v-flex>

              <v-flex xs2 sm2 md2>
                <v-img
                  :width="40"
                  :height="40"
                  :src="member.icon"
                  contain
                />
              </v-flex>

              <v-flex xs9 sm9 md9>
                <strong>{{ member.name }}</strong>
                <span
                  v-if="member.email"
                  class="grey--text"
                >
                {{ member.email }}
              </span>
              </v-flex>

              <v-flex
                @click.stop.prevent="showDeleteConfirmation(member)"
                xs1 sm1 md1 align-self-end
              >
                <i class="material-icons delete">
                  delete
                </i>
              </v-flex>

            </v-layout>

          </template>

        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-layout>

    <!-- Delete member confirmation -->
    <v-dialog
      v-model="deleteConfirmation"
      max-width="500"
      content-class="DeleteConfirmation"
    >
      <v-card class="Confirmation__card">
        <v-card-title class="font-weight-bold red--text text--darken-1">
          Delete Member
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete <strong>{{ deletingMember ? deletingMember.name : '' }}</strong>?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey lighten-1"
            flat="flat"
            @click="deleteConfirmation = false"
          >
            Close
          </v-btn>

          <v-btn
            color="red"
            @click="removeMember"
            :loading="deleteLoading"
            dark
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
    <!-- END -->

    <!-- Add Member Form -->
    <v-dialog
      v-model="showAddMemberForm"
      max-width="500"
      content-class="addMemberForm"
      :key="uniqueKey"
    >
      <AddMember
        @add:member="addMember"
        @close="showAddMemberForm = false"
      />
    </v-dialog>
    <!-- End -->
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "vue-property-decorator";
  import {Member} from "@/model/member";
  import AddMember from "@/components/member/AddMember.vue";
  import {namespace} from "vuex-class";

  const memberModule = namespace("memberStore");

  @Component({
    components: {AddMember},
  })
  export default class MemberDetail extends Vue {
    @memberModule.Action("selectMember") selectMember!: (memberId: string) => Promise<any>;
    @memberModule.Action("unselectMember") unselectMember!: (memberId: string) => Promise<any>;
    @memberModule.Action("toggleSelectMember") toggleSelectMember!: (memberId: string) => Promise<any>;
    @memberModule.Action("deleteMember") deleteMemberToStore!: (memberId: string) => Promise<any>;
    @Prop(Array) members!: Member[];

    public deleteConfirmation: boolean = false;
    public deletingMember: Member | null = null;
    public deleteLoading: boolean = false;
    public showAddMemberForm: boolean = false;
    public isSelectedAll: boolean = false;
    public uniqueKey: number = 0;

    @Watch('showAddMemberForm')
    private onShowAddMemberChanged() {
      this.uniqueKey = new Date().getTime();
    }

    private removeMember() {
      this.deleteLoading = true;
      const member = this.deletingMember;
      if (!member) {
        return;
      }
      this.deleteMemberToStore(member.id).then(() => {
        this.deleteLoading = false;
        this.deleteConfirmation = false;
        this.deletingMember = null;
      });
    }

    private showDeleteConfirmation(member: Member) {
      this.deletingMember = member;
      this.deleteConfirmation = true;
    }

    private selectOrDeselectAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectMember('');
      } else {
        this.unselectMember('');
      }
    }

    private clickedCheckbox(member: Member) {
      this.toggleSelectMember(member.id);
    }

  }
</script>

<style lang="scss" scoped>

  .MemberDetail {
    .v-card {
      padding: 10px 20px;
    }

    .delete {
      cursor: pointer;
    }
  }

  .Confirmation__card {
    padding: 20px;
  }

  .v-input--checkbox {
    margin-top: 0;
  }

  .selectAll {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .v-expansion-panel__header {
    cursor: default;
  }

</style>
<style lang="scss">
  // Not sure how to solve this issue, but it works
  .addMemberForm {
    background-color: white;
  }
</style>


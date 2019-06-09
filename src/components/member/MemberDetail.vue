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

      <v-expansion-panel
        v-model="memberFocus"
        popout
      >
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

              <v-flex xs8 sm8 md8>
                <strong>{{ member.name }}</strong>
                <span
                  v-if="member.email"
                  class="grey--text"
                >
                {{ member.email }}
              </span>
              </v-flex>

              <v-flex
                v-if="isFocused(index)"
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
    @memberModule.Action("selectMember") selectMember!: (memberId: number) => Promise<any>;
    @memberModule.Action("unselectMember") unselectMember!: (memberId: number) => Promise<any>;
    @memberModule.Action("toggleSelectMember") toggleSelectMember!: (memberId: number) => Promise<any>;
    @memberModule.Action("addMember") addMemberToStore!: (member: Member) => Promise<any>;
    @memberModule.Action("deleteMember") deleteMemberToStore!: (memberId: number) => Promise<any>;
    @Prop(Array) members!: Member[];

    public memberFocus: number | null = null;
    public deleteConfirmation: boolean = false;
    public deletingMember: Member | null = null;
    public deleteLoading: boolean = false;
    public showAddMemberForm: boolean = false;
    public isSelectedAll: boolean = false;

    @Watch('memberFocus')
    private onMemberFocusChange() {

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
        this.selectMember(-1);
      } else {
        this.unselectMember(-1);
      }
    }


    private addMember(member: Member) {
      const memberState: Member = {
        ...member,
        id: new Date().getTime(),
        selected: false,
      };
      this.addMemberToStore(memberState);
    }

    private clickedCheckbox(member: Member) {
      this.toggleSelectMember(member.id);
    }

    private isFocused(index: number) {
      return this.memberFocus === index;
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

</style>
<style lang="scss">
  // Not sure how to solve this issue, but it works
  .addMemberForm {
    background-color: white;
  }
</style>


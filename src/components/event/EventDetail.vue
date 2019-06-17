<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container data-app align-center>
    <v-layout row wrap align-center>
      <v-flex xs12 sm12 m12>
        <v-text-field
          v-model="title"
          :rules="[
            v => !!v || 'The title is required'
          ]"
          label="Add Title"
          autofocus
          required
        ></v-text-field>
      </v-flex>
      <!-- Start Date Picker -->
      <v-flex xs6 sm6 md6>
        <v-menu
          v-model="showStartPicker"
          :close-on-content-click="false"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="300"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startDate"
              label="Start Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="startDate"
            @input="showStartPicker = false"
            full-width
          ></v-date-picker>
        </v-menu>
      </v-flex>
      <!-- Start Date Picker END -->

      <!-- End Date Picker -->
      <v-flex xs6 sm6 md6>
        <v-menu
          v-model="showEndPicker"
          :close-on-content-click="false"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="300"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="endDate"
              label="End Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="endDate"
            @input="showEndPicker = false"
            full-width
          ></v-date-picker>
        </v-menu>

      </v-flex>
      <!-- End Date Picker END -->

      <!-- Start Time Picker -->
      <v-flex xs6 sm6 md6>
        <v-menu
          v-model="showStartTimePicker"
          :close-on-content-click="false"
          lazy
          transition="scale-transition"
          offset-y
          max-width="250"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startTime"
              label="From"
              prepend-icon="access_time"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="startTime"
            :landscape="false"
            :allowed-minutes="allowedMinutes"
            full-width
            @click:minute="showStartTimePicker = false"
            color="purple"
          ></v-time-picker>
        </v-menu>
      </v-flex>
      <!-- END -->

      <!-- End Time Picker -->
      <v-flex xs6 sm6 md6>
        <v-menu
          v-model="showEndTimePicker"
          :close-on-content-click="false"
          lazy
          transition="scale-transition"
          offset-y
          max-width="250"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="endTime"
              label="To"
              prepend-icon="access_time"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="endTime"
            :landscape="false"
            :allowed-minutes="allowedMinutes"
            full-width
            @click:minute="showEndTimePicker = false"
            color="purple"
          ></v-time-picker>
        </v-menu>
      </v-flex>
      <!-- End -->

      <v-flex xs12 sm12 md12>
        <v-textarea
          v-model="description"
          name="description"
          label="Description"
        ></v-textarea>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
import DatePicker from '@/components/event/DatePicker.vue';
import {namespace} from 'vuex-class';
import {Event} from '@/model/event';
  import { Member } from "@/model/member";

const eventModule = namespace('eventStore');
const memberModule = namespace('memberStore');

@Component({
  components: {DatePicker},
})
export default class EventDetail extends Vue {
  @eventModule.Getter('event') event!: Event;
  @eventModule.Mutation('SET_TITLE') setTitle!: (title: string) => void;
  @eventModule.Mutation('SET_START_DATE') setStartDate!: (start: string) => void;
  @eventModule.Mutation('SET_START_TIME') setStartTime!: (start: string) => void;
  @eventModule.Mutation('SET_END_DATE') setEndDate!: (end: string) => void;
  @eventModule.Mutation('SET_END_TIME') setEndTime!: (end: string) => void;
  @eventModule.Mutation('SET_DESCRIPTION') setDescription!: (description: string) => void;

  @memberModule.Getter('members') members!: Member[];

  title: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  showStartPicker: boolean = false;
  showEndPicker: boolean = false;
  showStartTimePicker: boolean = false;
  startTime: string = '';

  showEndTimePicker: boolean = false;
  endTime: string = '';

  created() {
    if(this.members.length === 0) {
      this.$router.push('/member');
    }

    this.title = this.event.title;
    this.description = this.event.description;
    this.startDate = this.event.startDate;
    this.startTime = this.event.startTime;
    this.endTime = this.event.endTime;
  }

  allowedMinutes(v: number) {
    return Number.isInteger(v/10);
  }

  @Watch('title')
  onTitleChanged() {
    this.setTitle(this.title);
  }

  @Watch('description')
  onDescriptionChanged() {
    this.setDescription(this.description);
  }

  @Watch('startDate')
  onStartDateChanged(current: string, old: string) {
    if(old === '') {
      this.showEndPicker = true;
    }
    this.setStartDate(this.startDate);
  }

  @Watch('endDate')
  onEndDateChanged() {
    this.setEndDate(this.endDate);
  }

  @Watch('startTime')
  onStartTimeChanged() {
     this.setStartTime(this.startTime);
  }

  @Watch('endTime')
  onEndTimeChanged() {
    this.setEndTime(this.endTime);
  }

}
</script>

<style lang="scss" scoped>

</style>

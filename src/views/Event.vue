<template>
  <v-container align-center>
    <v-layout row wrap align-center>
      <v-flex xs12 sm12 md12>
        <span class="title">Event</span>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <div class="v-divider"></div>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <EventDetail />
      </v-flex>
    </v-layout>

    <v-btn
      rounded
      color="#4DB6AC"
      @click="previousStep"
      dark
    >
      Previous
    </v-btn>

    <v-btn
      rounded
      color="#2488fd"
      :disabled="!event.title || !event.startDate || !event.endDate || !event.startTime || !event.endTime"
      @click="nextStep"
      dark
    >
      Next
    </v-btn>

  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import EventDetail from '@/components/event/EventDetail.vue';
import {namespace} from 'vuex-class';

const eventModule = namespace("eventStore");

@Component({
  components: {
    EventDetail,
  },
})
export default class Event extends Vue {
  @eventModule.Getter('event') event!: Event;

  public created() {

  }

  private nextStep() {
    this.$router.push('/preview')
  }

  private previousStep() {
    this.$router.push(`/member`);
  }

}
</script>

<style lang="scss" scoped>
  .v-divider {
    margin: 10px 0 20px 0;
  }

</style>

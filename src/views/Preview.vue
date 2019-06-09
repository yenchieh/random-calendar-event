<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container align-center>
    <v-layout row wrap align-center>
      <v-flex xs11 sm11 md11>
        <span class="title">Preview</span>
      </v-flex>
      <v-flex xs1 sm1 md1>
        <v-icon @click="refresh" color="teal">refresh</v-icon>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <div class="v-divider"></div>
      </v-flex>
      <v-flex xs12 sm12 md12>

        <v-sheet height="500">
          <v-calendar
            ref="calendar"
            v-model="start"
            type="month"
            color="#2488fd"
          >
            <template v-slot:day="{ date }" >
              <template v-for="event in eventMap.get(date)">

                <div
                  class="each-event button--primary">
                  <img :src="event.icon" />
                  {{ event.name }}
                </div>

              </template>
            </template>
          </v-calendar>
        </v-sheet>
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
      :disabled="!event.title || !event.startDate || !event.endDate"
      @click="sendEvents"
      dark
    >
      Send Events
    </v-btn>

  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {namespace} from 'vuex-class';
  import {Member} from "@/model/member";
  import {CalendarEventView, Event} from "@/model/event";

  const memberModule = namespace('memberStore');
  const eventModule = namespace('eventStore');

  @Component({
    components: {
    },
  })
  export default class Preview extends Vue {
    @memberModule.Getter('selectedMembers') selectedMembers!: Member[];
    @eventModule.Getter('event') event!: Event;

    $moment!: any;
    private start = '2019-05-01';
    private eventMap: Map<string, CalendarEventView> = new Map();
    private $gapi!: any;

    created() {
      this.start = this.$moment().format('YYYY-MM-DD');

      this.assignEvents();
    }

    assignEvents() {
      const memberArray: Member[] = this.randomMemberArray();

      const eventStart = this.$moment(this.event.startDate);
      const eventEnd = this.$moment(this.event.endDate);
      const duration = this.$moment.duration(eventEnd.diff(eventStart));

      for(let i = 0; i < duration.days(); i++) {
        if(!memberArray[i]) {
          break;
        }
        this.eventMap.set(eventStart.format('YYYY-MM-DD'), {
          title: memberArray[i].name,
          member: memberArray[i],
          date: eventStart,
        });
        eventStart.add(1, 'days');
      }
      this.$forceUpdate();
    }

    randomMemberArray(): Member[] {
      const randomMembers: Member[] = [];
      const members = Object.assign([], this.selectedMembers);

      for(let i = 0; i < this.selectedMembers.length; i++) {
        const index = Math.floor(Math.random()*members.length);
        randomMembers.push(members[index]);
        members.splice(index, 1);
      }

      return randomMembers;
    }

    refresh() {
      this.assignEvents();
    }

    async sendEvents() {
      this.eventMap.forEach((value: CalendarEventView, key: string) => {
        const start = this.$moment(`${key} ${this.event.startTime}`);
        const end = this.$moment(`${key} ${this.event.endTime}`);
        this.pushEvent(start, end, value.member);

      });


    }

    async pushEvent(start: any, end: any, member: Member) {
      await gapi.client.calendar.events.insert({
        calendarId: 'p9qkn7k06u837lj5hdeh6au9rc@group.calendar.google.com',
        sendNotifications: true,
        resource: {
          start: {
            dateTime: start.toISOString(),
            timeZone: 'America/New_York',
          },
          end: {
            dateTime: end.toISOString(),
            timeZone: 'America/New_York',
          },
          attendees: [
            {
              email: member.email,
              displayName: member.name,
            },
          ],
          summary: this.event.title,
          description: this.event.description,
        }
      }).then((result: any) => {
        console.log(result);
      });

    }

    private previousStep() {
      this.$router.push(`/event`);
    }

  }
</script>

<style lang="scss" scoped>
  .v-divider {
    margin: 10px 0 20px 0;
  }

  .each-event {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2px;

    img {
      max-width: 20px;
    }
  }

  .material-icons {
    cursor: pointer;
  }
</style>

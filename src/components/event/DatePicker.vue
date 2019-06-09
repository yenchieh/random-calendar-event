<template>
  <div data-app>
    <v-menu
      ref="datePickerMenu"
      v-model="dateMenu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      lazy
      offset-y
      full-width
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date"
          :label="label"
          prepend-icon="event"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click="dateMenu = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="#2488fd"
          @click="setDate"
          :disabled="!date"
          dark
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
  </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class DatePicker extends Vue {
  @Prop (String) public label!: string;

  public $refs!: {
    datePickerMenu: any,
  };

  private date: string = '';
  private dateMenu: boolean = false;

  public setDate() {
    this.$refs.datePickerMenu.save(this.date);
    this.$emit('set:date', this.date);
  }

}
</script>

<style lang="scss" scoped>

</style>

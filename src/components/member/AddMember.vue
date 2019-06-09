<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <v-card-title>
      <span class="headline">Add Member</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm12 md12>
            <v-img
              @click="changeIcon"
              :src="icon"
              :width="50"
              :height="50"
              contain
            ></v-img>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="50"
              label="Name"
              autofocus
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              type="email"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field label="Title"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-textarea
              name="note"
              label="Note"
              hint="Just for note"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-flex xs12 sm12 md12>
      <v-btn
        @click="clickAddMemberButton"
        :disabled="!valid"
        color="#2488fd"
        dark
      >
        Add
      </v-btn>
    </v-flex>
    <v-card-actions>

    </v-card-actions>

  </v-form>

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AddMember extends Vue {
  public name: string = '';
  public email: string = '';
  public title: string = '';
  public note: string = '';
  public icon: string = '';
  public valid: boolean = false;
  public nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => v.length <= 50 || 'Name must be less than 50 characters',
  ];
  public emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+/.test(v) || 'Email must be valid',
  ];
  public icons: string[] = [
    'https://image.flaticon.com/icons/svg/1691/1691137.svg',
    'https://image.flaticon.com/icons/svg/1076/1076877.svg',
    'https://image.flaticon.com/icons/svg/262/262523.svg',
    'https://image.flaticon.com/icons/svg/263/263076.svg',
    'https://image.flaticon.com/icons/svg/291/291212.svg',
  ];

  public $refs!: {
    form: any,
  };

  public created() {
    this.changeIcon();
  }

  public changeIcon() {
    const index = Math.floor(Math.random() * 5);
    if (this.icon === this.icons[index]) {
      this.changeIcon();
      return;
    }
    this.icon = this.icons[index];
  }

  public clickAddMemberButton() {
    if (this.$refs.form.validate()) {
      this.$emit('add:member', {
        name: this.name,
        email: this.email,
        title: this.title,
        icon: this.icon,
        note: this.note,
      });
      this.close();
    }
  }

  public close() {
    this.$emit('close');
  }
}
</script>

<style lang="scss" scoped>
  .v-responsive {
    display: inline-block;
  }
</style>

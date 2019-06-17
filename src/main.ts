import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Vuetify from 'vuetify';

import VueMoment from 'vue-moment';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


Vue.config.productionTip = false;
Vue.use(Vuetify);

Vue.use(VueMoment, {
  locale: 'en'
});

const w: any = window;

firebase.initializeApp({
  apiKey: w.LocalEnvVar.apiKey,
  authDomain: 'calendar-f716b.firebaseapp.com',
  databaseURL: 'https://calendar-f716b.firebaseio.com',
});

gapi.load('auth2', () => {
  const loadAuth2 = gapi.auth2.init({ client_id: w.LocalEnvVar.clientId });
  const loadClient = gapi.load('client', () => {
    gapi.client.init({
      apiKey: w.LocalEnvVar.apiKey,
      clientId: '1085697004242-915th2t6eman8vnkgsa3apo48cumgv1q.apps.googleusercontent.com', //w.LocalEnvVar.clientId,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
    })
  });

  Promise.all([loadAuth2, loadClient]).then(() => {
    Vue.prototype.$googleAuth = gapi.auth2.getAuthInstance();
    gapi.client.load('calendar', 'v3', () => {
      console.log('loaded calendar');
    });

    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  })
});

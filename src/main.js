import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { waitForAuth } from './firebase/firebaseInit';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// createApp(App).use(router).mount('#app')

const app = createApp(App);

waitForAuth().then((user) => {
  if (user) {
    // User is logged in, show home page
    router.push('/');
  } else {
    // User is not logged in, show sign in page
    router.push('/signin');
  }

  app.use(router).mount('#app');
});
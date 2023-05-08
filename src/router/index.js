import { createRouter, createWebHashHistory } from 'vue-router';
import { auth } from '../firebase/firebaseInit';
import HomepageView from '../views/HomepageView.vue';
import MembershipsView from '../views/MembershipsView.vue';
import TrainingView from '../views/TrainingView.vue';
import NutritionView from '../views/NutritionView.vue';
import RegisterView from '../views/RegisterView.vue';
import SignInView from '../views/SignInView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomepageView,
    meta: { requiresAuth: true }
  },
  {
    path: '/memberships',
    name: 'memberships',
    component: MembershipsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/training',
    name: 'training',
    component: TrainingView,
    meta: { requiresAuth: true }
  },
  {
    path: '/nutrition',
    name: 'nutrition',
    component: NutritionView,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;
  
  if (requiresAuth && !currentUser) {
    next('/signin');
  } else {
    next();
  }
});

export default router;

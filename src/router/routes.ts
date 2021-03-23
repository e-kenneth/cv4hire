import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'browse', component: () => import('pages/Browse.vue') },
      { path: 'profile', component: () => import('pages/Profile.vue') },
      { path: 'profile/:id', component: () => import('pages/Profile.vue') },
      { path: 'register/talent', component: () => import('pages/Talent/Register.vue') },
      { path: 'register/recruiter', component: () => import('pages/Recruiter/Register.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;

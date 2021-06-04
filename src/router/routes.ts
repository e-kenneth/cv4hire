import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'browse', component: () => import('pages/Browse.vue') },
      { path: 'company/profile', component: () => import('pages/Recruiter/Profile.vue') },
      { path: 'profile', component: () => import('pages/Professional/Profile.vue') },
      { path: 'profile/:id', component: () => import('pages/Professional/Profile.vue') },
      { path: 'login', component: () => import('pages/auth/Login.vue') },
      { path: 'professional/register', component: () => import('pages/Professional/Register.vue') },
      { path: 'recruiter/register', component: () => import('pages/Recruiter/Register.vue') },
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

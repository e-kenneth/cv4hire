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
      { path: 'professional/register', component: () => import('pages/Professional/Register.vue') },
      { path: 'recruiter/register', component: () => import('pages/Recruiter/Register.vue') },
      { path: 'indexcopy', component: () => import('pages/indexcopy.vue') },
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

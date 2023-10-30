
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'signup', component: () => import('pages/Signup.vue') },
      {
        path: 'chat',
        component: () => import(/* webpackChunkName: "Chat." */ 'pages/Chat.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'conversation/:id',
        component: () => import(/* webpackChunkName: "Chat." */ 'pages/ChatConversation.vue'),
        meta: { requiresAuth: true }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

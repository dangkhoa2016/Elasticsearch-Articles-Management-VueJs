import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },

    /*
    {
      path: '/users_sample',
      name: 'users_sample',
      component: () => import('@/views/Users.vue'),
      meta: {
        pageTitle: 'Users Management',
        breadcrumb: [
          {
            text: 'Users',
            active: true,
          },
        ],
      },
    },
    */

    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/settings/Index.vue'),
      meta: {
        pageTitle: 'Settings',
        breadcrumb: [
          {
            text: 'Settings',
            active: true,
          },
        ],
      },
    },

    // *===============================================---*
    // *--------- ARTICLE ---- ----------------------------*
    // *===============================================---*
    {
      path: '/articles/list',
      name: 'articles-list',
      component: () => import('@/views/articles/List.vue'),
    },
    {
      path: '/articles/edit/:id',
      name: 'articles-edit',
      component: () => import('@/views/articles/Edit.vue'),
    },
    {
      path: '/articles/view/:id',
      name: 'articles-view',
      component: () => import('@/views/articles/View.vue'),
    },
    {
      path: '/articles/new',
      name: 'articles-new',
      component: () => import('@/views/articles/New.vue'),
    },

    // *===============================================---*
    // *--------- CATEGORY ---- --------------------------*
    // *===============================================---*
    {
      path: '/categories/list',
      name: 'categories-list',
      component: () => import('@/views/categories/List.vue'),
    },
    {
      path: '/categories/edit/:id',
      name: 'categories-edit',
      component: () => import('@/views/categories/Edit.vue'),
    },
    {
      path: '/categories/view/:id',
      name: 'categories-view',
      component: () => import('@/views/categories/View.vue'),
    },

    // *===============================================---*
    // *--------- AUTHOR ---- ----------------------------*
    // *===============================================---*
    {
      path: '/authors/list',
      name: 'authors-list',
      component: () => import('@/views/authors-list/Index.vue'),
    },
    {
      path: '/authors/edit/:id',
      name: 'authors-edit',
      component: () => import('@/views/authors-edit/Index.vue'),
    },
    {
      path: '/authors/view/:id',
      name: 'authors-view',
      component: () => import('@/views/authors-view/Index.vue'),
    },

    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },

    // *===============================================---*
    // *--------- COMMENTS -- ----------------------------*
    // *===============================================---*
    {
      path: '/comments/list',
      name: 'comments-list',
      component: () => import('@/views/comments/List.vue'),
    },
    {
      path: '/comments/edit/:id',
      name: 'comments-edit',
      component: () => import('@/views/comments/Edit.vue'),
    },
    {
      path: '/comments/view/:id',
      name: 'comments-view',
      component: () => import('@/views/comments/View.vue'),
    },

    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router

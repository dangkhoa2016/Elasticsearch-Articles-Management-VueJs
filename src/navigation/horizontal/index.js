export default [
  /* {
    icon: 'TypeIcon',
    title: 'Users Sample',
    route: 'users_sample',
  }, */
  {
    header: 'Articles',
    icon: 'ColumnsIcon',
    children: [
      {
        title: 'List',
        route: 'articles-list',
        icon: 'ListIcon',
      },
      {
        title: 'New',
        route: { name: 'articles-new' },
      },
    ],
  },
  {
    header: 'Categories',
    icon: 'ApertureIcon',
    children: [
      {
        title: 'List',
        route: 'categories-list',
        icon: 'ListIcon',
      },
    ],
  },
  {
    header: 'Authors',
    icon: 'UserIcon',
    children: [
      {
        title: 'List',
        route: 'authors-list',
        icon: 'ListIcon',
      },
    ],
  },
  {
    header: 'Comments',
    icon: 'MessageCircleIcon',
    children: [
      {
        title: 'List',
        route: 'comments-list',
        icon: 'ListIcon',
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'ActivityIcon',
    route: 'settings',
  },
]

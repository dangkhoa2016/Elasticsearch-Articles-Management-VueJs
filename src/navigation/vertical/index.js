export default [
  {
    title: 'Articles',
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
    title: 'Categories',
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
    title: 'Authors',
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
    title: 'Comments',
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

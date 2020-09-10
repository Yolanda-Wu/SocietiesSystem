const routes = [
  {
    path: '',
    component: null,
    name: '招新概览',
    exact: true,
    children: [
      {
        path: '/scoring',
        exact: true,
        component: null,
        name: '实时打分',
        children: [
          {
            path: '/:index',
            exact: true,

            component: null,
          },
        ],
      },
      {
        path: '/send',
        exact: true,
        component: null,
        name: '',
        children: [
          {
            path: '/status',
            exact: true,
            component: null,
          },
          {
            path: '/set',
            exact: true,
            component: null,
          },
        ],
      },
    ],
  },
];

export default routes;

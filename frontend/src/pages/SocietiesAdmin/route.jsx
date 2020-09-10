const routes = [
  {
    path: '',
    component: null,
    name: '招新概览',
    exact: true,
    children: [
      {
        path: '/detail',
        exact: true,
        component: null,
        name: '报名详情',
        children: [
          {
            path: '/scoring',
            exact: true,
            name: '实时打分',
            component: null
          },
          {
            path: '/result',
            exact: true,
            component: null,
            name: '面试结果',
            children: [
              {
                path: '/send',
                exact: true,
                name: '发送通知',
                component: null
              }
            ]
          }
        ]
      }
    ]
  }
];

export default routes;

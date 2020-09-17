import Activity from './Activity';

const routes = [
  {
    path: '/',
    component: Activity,
    name: '招新报名',
    exact: true,
  },
  {
    path: '/detail',
    exact: true,
    component: null,
    name: '招新报名',
  },
  {
    path: '/result',
    component: null,
    name: '状态查询',
    exact: true,
  },
];

export default routes;

import Admin from './Admin';
// import Publish from './Publish';
import Activity from './Activity';

const routes = [
  {
    path: '/',
    component: Admin,
    name: '成员管理',
    exact: true,
  },
  {
    path: '/activity',
    component: Activity,
    name: '活动管理',
    exact: true,
  },
];

export default routes;

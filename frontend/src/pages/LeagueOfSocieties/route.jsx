import League from './League';
import Review from './Review';

const routes = [
  {
    path: '/',
    component: League,
    name: '社团管理',
    exact: true,
  },
  {
    path: '/review',
    exact: true,
    component: Review,
    name: '申请表审核',
  },
];

export default routes;

import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import Mine from 'Assets/images/mine.svg';
import Arrow from 'Assets/images/arrow1.svg';

import './index.scss';

export default function Head() {
  const history = useHistory();
  const match = useRouteMatch('/sign/:phone/:operate');
  const { phone, operate } = match.params;
  if (!sessionStorage.getItem('yzm')) history.push('/sign');

  const loginOut = () => {
    sessionStorage.removeItem('yzm');
    history.push('/sign');
  };

  const menu = (
    <Menu>
      <Menu.Item>{phone}</Menu.Item>
      <Menu.Item onClick={loginOut}>
        <span className='loginout'>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='head'>
      <header>社团名称-{operate === 'edit' ? '招新报名' : '状态查询'}</header>
      <Dropdown className='drop-box' overlay={menu}>
        <div className='icon'>
          <img className='mine' src={Mine} />
          <img className='arrow' src={Arrow} />
        </div>
      </Dropdown>
    </div>
  );
}

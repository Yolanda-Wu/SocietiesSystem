import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import Mine from 'Assets/images/mine.svg';
import Arrow from 'Assets/images/arrow1.svg';
import './index.scss';

const getHeaderText = (type, societyName) => {
  let headerText = '';
  switch (type) {
    case 1:
      headerText = '社团联盟平台';
      break;
    case 2:
      headerText = `${societyName}管理平台`;
      break;
    case 3:
      headerText = `${societyName}活动平台`;
      break;
    default:
      headerText = '';
  }
  return headerText;
};

export default function Header({
  type,
  societyName,
  telephone,
  rightEle = null,
}) {
  // const history = useHistory();
  // const match = useRouteMatch('/sign/:phone/:operate');
  // const { phone, operate } = match.params;

  const loginOut = () => {
    // sessionStorage.removeItem('yzm');
    // history.push('/sign');
  };

  const menu = (
    <Menu>
      <Menu.Item>{telephone}</Menu.Item>
      <Menu.Item onClick={loginOut}>
        <span className='loginout'>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='header-wrap'>
      <aside className='left'>
        <p>{getHeaderText(type, societyName)}</p>
      </aside>
      <aside className='right'>
        {rightEle}

        {type === 3 || (
          <Dropdown className='drop' overlay={menu}>
            <div className='icon'>
              <img className='mine' src={Mine} />
              <span>{telephone}</span>
              <img className='arrow' src={Arrow} />
            </div>
          </Dropdown>
        )}
      </aside>
    </div>
  );
}

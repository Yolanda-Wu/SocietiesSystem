import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Menu, Dropdown, message, Breadcrumb } from 'antd';
import Mine from 'Assets/images/mine.svg';
import Arrow from 'Assets/images/arrow1.svg';
import './index.scss';
import { logout } from '../../api/common';
import ChangeModal from './ChangeModal';
import { formatRoute, formatNavRoute } from '../../utils/route';
import queryString from 'query-string';
import { Switch, HashRouter, Route } from 'react-router-dom';
import leagueRoutes from '../../pages/LeagueOfSocieties/route';
import adminRoutes from '../../pages/SocietyAdmin/route';
import platformRoutes from '../../pages/SocietyPlatform/route';

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
    case 4:
      headerText = `${societyName}游客活动平台`;
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
  const history = useHistory();
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [list, setList] = useState([]);

  const loginOut = () => {
    logout
      .fetcher(logout.url, {})
      .then((data) => {
        console.log(data, 'jj');
        if (type === 1) {
          history.push('/');
        } else {
          history.push(`/${societyName}/society/login`);
        }
      })
      .catch((error) => {
        message.error('网络出错');
      });
    // history.push('/sign');
  };

  const changePassword = () => {
    setShowChangeModal(true);
  };

  const updateNav = () => {
    let routes = [];
    switch (type) {
      case 1:
        routes = leagueRoutes;
        break;
      case 2:
        routes = adminRoutes;
        break;
      default:
        break;
    }
    let urllist = history.location.pathname.split('/');
    // urllist.shift();
    console.log(routes);
    const navRoutes = formatNavRoute(routes, {}, ``);
    console.log(navRoutes, urllist);
    let tmp = [];
    let flag = 1;
    urllist.forEach((element) => {
      if (navRoutes[element]) {
        if (flag || element) tmp = [...tmp, navRoutes[element]];
        if (!element) flag = 0;
      }
    });
    setList(tmp);

    console.log(tmp);
  };

  useEffect(() => {
    updateNav();
  }, [history]);

  const menu = (
    <Menu>
      <Menu.Item>{telephone}</Menu.Item>
      <Menu.Item onClick={changePassword}>
        <span className='loginout'>修改密码</span>
      </Menu.Item>
      <Menu.Item onClick={loginOut}>
        <span className='loginout'>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='header-nav'>
      <div className='header-wrap'>
        <aside className='left'>
          <p>{getHeaderText(type, societyName)}</p>
        </aside>
        <aside className='right'>
          {rightEle}

          {type === 4 || (
            <Dropdown className='drop' overlay={menu}>
              <div className='icon'>
                <img className='mine' src={Mine} />
                <span>{telephone}</span>
                <img className='arrow' src={Arrow} />
              </div>
            </Dropdown>
          )}
        </aside>
        {showChangeModal && (
          <ChangeModal
            closeModal={() => setShowChangeModal(false)}
            societyDetail={{ telephoneNumber: telephone }}
          />
        )}
      </div>
      {
        <div className='navCom'>
          <Breadcrumb separator='>' className='nav'>
            {list.map((item, index) => {
              return (
                <Breadcrumb.Item href={`.${item.url}`} key={index}>
                  {item && <span>{item.name}</span>}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </div>
      }
    </div>
  );
}

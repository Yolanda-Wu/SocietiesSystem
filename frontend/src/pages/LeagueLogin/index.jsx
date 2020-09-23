import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import useSWR from 'swr';
import Join from './Join';
import LoginBtn from 'Assets/images/login-phone-btn.svg';
import Machine from 'Assets/images/machine.svg';
import BgColor from 'Assets/images/bgcolor.svg';
import { leagueLogin } from 'Api/league';

import './index.scss';

export default function SignLogin() {
  const associationName = '测试社团';
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({ phone: '', password: '' });
  const [showApply, setShowApply] = useState(false);
  const [errors, setErrors] = useState({
    phone: '',
    password: '',
    login: '',
  });

  const { phone, password } = userInfo;

  const onChange = (e, key) => {
    const { phone, password } = userInfo;
    let newInfo = { phone, password };
    if (key === 'phone') {
      newInfo.phone = e.target.value;
    } else {
      newInfo.password = e.target.value;
    }
    setUserInfo(newInfo);
  };

  const clearErrors = () => {
    setErrors({});
  };

  const login = () => {
    clearErrors();
    const { phone, password } = userInfo;

    if (phone && password) {
      message.info('正在登录...', 1);
      leagueLogin
        .fetcher(leagueLogin.url, {
          telephone_number: userInfo.phone,
          user_password: userInfo.password,
        })
        .then((data) => {
          console.log(data, '99');
          message.success('登录成功', 1);
          history.push(`/league/${phone}`);
        })
        .catch((error) => {
          setErrors({ login: error ? error : '登录失败' });
        });
    } else {
      if (!phone && !password) {
        setErrors({
          ...errors,
          phone: '请输入账号',
          password: '请输入密码',
        });
      } else if (!phone) {
        setErrors({ ...errors, phone: '请输入账号' });
      } else if (!password) {
        setErrors({ ...errors, password: '请输入密码' });
      }
    }
  };

  const goApply = () => {
    setShowApply(true);
  };

  return (
    <div className='league-login'>
      <aside className='left'>
        <img className='back' src={BgColor} />
        <img className='font' src={Machine} />
      </aside>
      <aside className='right'>
        <header>社团联盟平台-登录</header>
        <main>
          <Input
            className='phone'
            type='number'
            placeholder='请输入账号'
            maxLength={11}
            value={phone}
            onChange={(e) => onChange(e, 'phone')}
          />

          <p className='error'>{errors.phone}</p>
          <Input
            className='password'
            placeholder='请输入密码'
            value={password}
            onChange={(e) => onChange(e, 'password')}
            type='password'
          />
          <p className='error'>{errors.password}</p>
        </main>
        <img className='login-btn' src={LoginBtn} onClick={login}></img>
        <p className='error'>{errors.login}</p>
      </aside>
      <div className='apply-btn' onClick={goApply}>
        <span>接入申请</span>
      </div>
      {showApply && (
        <Join
          closeModal={() => {
            setShowApply(false);
          }}
        />
      )}
    </div>
  );
}

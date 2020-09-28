import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, message, Select } from 'antd';
import { useRouteMatch } from 'react-router';
import LoginBtn from 'Assets/images/login-phone-btn.svg';
import Machine from 'Assets/images/machine.svg';
import BgColor from 'Assets/images/bgcolor.svg';
import { adminLogin } from 'Api/admin';

import './index.scss';

export default function SignLogin() {
  const match = useRouteMatch('/:societyName/society/login');

  const associationName = match.params.societyName;
  const history = useHistory();
  const [loginType, setLoginType] = useState('society');
  const [userInfo, setUserInfo] = useState({ phone: '', password: '' });
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
    if (loginType === 'visit') {
      history.push(`/${associationName}/${loginType}`);
      return;
    }
    clearErrors();
    const { phone, password } = userInfo;

    if (phone && password) {
      message.info('正在登录...', 1);
      adminLogin
        .fetcher(adminLogin.url, {
          telephone_number: userInfo.phone,
          user_password: userInfo.password,
        })
        .then((data) => {
          message.success('登录成功', 1);
          // history.push(`/${associationName}/${loginType}/${phone}`);
        })
        .catch((error) => {
          setErrors({ login: error ? error : '用户名或密码错误' });
        });
    } else {
      if (!phone && !password) {
        setErrors({
          ...errors,
          phone: '请输入账号',
          password: '输入password',
        });
      } else if (!phone) {
        setErrors({ ...errors, phone: '请输入账号' });
      } else {
        setErrors({ ...errors, password: '输入password' });
      }
    }
  };

  return (
    <div className='pc-login'>
      <aside className='left'>
        <img className='back' src={BgColor} />
        <img className='font' src={Machine} />
      </aside>
      <aside className='right'>
        <header>
          {loginType === 'society'
            ? `${associationName}管理平台-登录`
            : loginType === 'platform'
            ? `${associationName}活动平台-登录`
            : `${associationName}游客平台`}
        </header>
        <Select
          className='select'
          defaultValue='society'
          onChange={(value) => setLoginType(value)}
        >
          <Select.Option value='society'>管理员——管理平台</Select.Option>
          <Select.Option value='platform'>普通用户——活动平台</Select.Option>
          <Select.Option value='visit'>游客——活动平台</Select.Option>
        </Select>
        {loginType === 'visit' || (
          <main>
            <Input
              className='phone'
              type='number'
              placeholder='请输入手机号码'
              maxLength={11}
              value={phone}
              onChange={(e) => onChange(e, 'phone')}
            />

            <p className='error'>{errors.phone}</p>
            <Input
              className='yzm'
              placeholder='请输入密码'
              value={password}
              onChange={(e) => onChange(e, 'password')}
              type='password'
            />
            <p className='error'>{errors.password}</p>
          </main>
        )}
        <img className='login-btn' src={LoginBtn} onClick={login}></img>
        <p className='error'>{errors.login}</p>
      </aside>
    </div>
  );
}

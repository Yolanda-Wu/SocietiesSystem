import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import useSWR from 'swr';
import Join from './Join';
import LoginBtn from 'Assets/images/login-phone-btn.svg';
import Machine from 'Assets/images/machine.svg';
import BgColor from 'Assets/images/bgcolor.svg';
import { sendYzm, getPrevFormInfo } from 'Api/sign';

import './index.scss';

export default function SignLogin() {
  const associationName = '测试社团';
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({ phone: '', yzm: '' });
  const [showApply, setShowApply] = useState(false);
  const [errors, setErrors] = useState({
    phone: '',
    yzm: '',
    login: '',
  });
  const [time, setTime] = useState(-1); // -1:未发送，1~60:已发送([time]秒后可重新发送)，0:可重新发送
  let yzmText =
    time === -1 ? '获取验证码' : time === 0 ? '重新发送' : `${time}秒`;

  // 发送yzm倒计时
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);

  const { phone, yzm } = userInfo;

  const onChange = (e, key) => {
    const { phone, yzm } = userInfo;
    let newInfo = { phone, yzm };
    if (key === 'phone') {
      if (phone.length >= 11 && e.target.value.length > 11) {
        return;
      }
      newInfo.phone = e.target.value;
    } else {
      newInfo.yzm = e.target.value;
    }
    setUserInfo(newInfo);
  };

  const onSendYzm = () => {
    if (time > 0) return;
    clearErrors();
    if (/^1[3456789]\d{9}$/.test(userInfo.phone)) {
      sendYzm
        .fetcher(sendYzm.url, { phone: userInfo.phone })
        .then((res) => {
          setTime(60);
          message.success('发送成功!');
        })
        .catch((error) => {
          setErrors({ phone: error ? error : '发送失败' });
        });
      return;
    }
    setErrors({ phone: '手机号码格式不正确' });
  };

  const clearErrors = () => {
    setErrors({});
  };

  const login = () => {
    clearErrors();
    const { phone, yzm } = userInfo;

    if (phone.length === 11 && yzm) {
      message.info('正在登录...', 1);
      getPrevFormInfo
        .fetcher(
          getPrevFormInfo.url,
          { verify_code: userInfo.yzm },
          { association_name: associationName, phone: userInfo.phone }
        )
        .then((data) => {
          message.success('登录成功', 1);
          sessionStorage.setItem('yzm', yzm);
          history.push(`/sign/${phone}/edit?exists=${data.exists ? 1 : -1}`);
        })
        .catch((error) => {
          setErrors({ login: error ? error : '登录失败' });
        });
    } else {
      if (phone.length !== 11 && !yzm) {
        setErrors({ ...errors, phone: '手机格式错误', yzm: '输入yzm' });
      } else if (phone.length !== 11) {
        setErrors({ ...errors, phone: '手机格式错误' });
      } else {
        setErrors({ ...errors, yzm: '输入yzm' });
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
            placeholder='请输入手机号码'
            maxLength={11}
            value={phone}
            onChange={(e) => onChange(e, 'phone')}
          />
          <Button className='send-yzm' onClick={onSendYzm}>
            {yzmText}
          </Button>
          <p className='error'>{errors.phone}</p>
          <Input
            className='yzm'
            placeholder='验证码'
            value={yzm}
            onChange={(e) => onChange(e, 'yzm')}
          />
          <p className='error'>{errors.yzm}</p>
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

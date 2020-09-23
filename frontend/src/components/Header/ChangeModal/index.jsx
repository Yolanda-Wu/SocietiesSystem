import React, { useState, useCallback, useEffect } from 'react';
import ApplyIcon from '../../../assets/images/apply-header.svg';
import CloseIcon from '../../../assets/images/close.svg';
import { updatePassword } from '../../../api/common';
import { Table, message } from 'antd';

import './index.scss';

export default function ChangeModal({ closeModal, societyDetail = {} }) {
  const [userInfo, setUserInfo] = useState({
    telephoneNumber: '',
    oldPassword: '',
    newPassword: '',
    check: '',
  });

  useEffect(() => {
    setUserInfo(societyDetail);
  }, []);

  const societyForm = [
    {
      key: 'telephoneNumber',
      label: '姓名',
    },
    { key: 'oldPassword', label: '原密码', type: 'password' },
    { key: 'newPassword', label: '新密码', type: 'password' },
    { key: 'check', label: '再次确认新密码', type: 'password' },
  ];

  const onInfoChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const checkUserInfoFormat = useCallback(() => {
    for (let key in userInfo) {
      if (!userInfo[key]) {
        alert('信息不能为空');
        return false;
      }
    }
    if (userInfo.newPassword !== userInfo.check) {
      alert('密码不一致');
    }
    return true;
  }, [userInfo]);

  const onSubmit = () => {
    if (checkUserInfoFormat()) {
      updatePassword
        .fetcher(updatePassword.url, {
          ...userInfo,
        })
        .then((data) => {
          message.success('修改成功', 1);
          closeModal();
        })
        .catch((error) => {
          message.error('密码错误');
        });
    }
  };

  return (
    <div className='change-password'>
      <div className='change-wrap'>
        <img className='close' src={CloseIcon} onClick={closeModal} />
        <div className='header'>
          <img className='icon' src={ApplyIcon} />
          <p>修改密码</p>
        </div>
        <div className='apply-wrap'>
          {societyForm.map((ele, index) => (
            <div className='input-wrap' key={ele.key}>
              <label>{ele.label}</label>

              <input
                name={ele.key}
                value={userInfo[ele.key]}
                onChange={onInfoChange}
                type={ele.type}
              />
            </div>
          ))}
        </div>
        <div className='submit-btn' onClick={onSubmit}>
          <span>修改</span>
        </div>
      </div>
    </div>
  );
}

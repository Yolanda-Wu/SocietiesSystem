import React, { useState, useCallback, useEffect } from 'react';
import ApplyIcon from '../../../../assets/images/apply-header.svg';
import CloseIcon from '../../../../assets/images/close.svg';
import { updateContact } from '../../../../api/league';
import { Table, message } from 'antd';

import './index.scss';

export default function ChangeModal({ closeModal, societyDetail, refresh }) {
  const [societyInfo, setSocietyInfo] = useState({
    contact: '',
    contactInfo: '',
    name: '',
  });

  useEffect(() => {
    setSocietyInfo(societyDetail);
  }, []);

  const societyForm = [
    {
      key: 'contact',
      label: '姓名',
    },
    { key: 'contactInfo', label: '联系方式' },
  ];

  const onInfoChange = (e) => {
    setSocietyInfo({
      ...societyInfo,
      [e.target.name]: e.target.value,
    });
  };

  const checkSocietyInfoFormat = useCallback(() => {
    const defaultObj = {
      contact: '',
      contactInfo: '',
      name: '',
    };
    for (let key in defaultObj) {
      if (!societyInfo[key]) {
        alert('信息不能为空');
        return false;
      }
    }
    return true;
  }, [societyInfo]);

  const onSubmit = () => {
    if (checkSocietyInfoFormat()) {
      updateContact
        .fetcher(updateContact.url, {
          societyName: societyInfo.name,
          ...societyInfo,
        })
        .then((data) => {
          message.success('修改成功', 1);
          refresh();
          closeModal();
        })
        .catch((error) => {
          message.error('修改失败');
        });
    }
  };

  return (
    <div className='change-modal'>
      <div className='change-wrap'>
        <img className='close' src={CloseIcon} onClick={closeModal} />
        <div className='header'>
          <img className='icon' src={ApplyIcon} />
          <p>修改负责人</p>
        </div>
        <div className='apply-wrap'>
          {societyForm.map((ele, index) => (
            <div className='input-wrap' key={ele.key}>
              <label>{ele.label}</label>
              {ele.type ? (
                <textarea
                  name={ele.key}
                  value={societyInfo[ele.key]}
                  onChange={onInfoChange}
                />
              ) : (
                <input
                  name={ele.key}
                  value={societyInfo[ele.key]}
                  onChange={onInfoChange}
                />
              )}
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

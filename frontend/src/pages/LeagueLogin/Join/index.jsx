import React, { useState, useCallback } from 'react';
import ApplyIcon from '../../../assets/images/apply-header.svg';
import CloseIcon from '../../../assets/images/close.svg';
import './index.scss';

export default function Join({ closeModal }) {
  const [applyInfo, setApplyInfo] = useState({
    societyName: '',
    contact: '',
    contactInfo: '',
    attach: '',
  });

  const applyForm = [
    { key: 'societyName', label: '社团名称' },
    { key: 'contact', label: '社团联系人' },
    { key: 'contactInfo', label: '联系方式' },
    {
      key: 'attach',
      label: '附加说明',
      type: 'textarea',
      tips: '*申请信息请尽量全面，管理人员会在提交申请后尽快联系申请者。',
    },
  ];

  const onInfoChange = (e) => {
    setApplyInfo({
      ...applyInfo,
      [e.target.name]: e.target.value,
    });
  };

  const checkApplyInfoFormat = useCallback(() => {
    for (let key in applyInfo) {
      if (!applyInfo[key]) {
        alert('请填写完整申请信息');
        return false;
      }
    }
    return true;
  }, [applyInfo]);

  const onSubmit = () => {
    if (checkApplyInfoFormat()) {
    }
  };

  return (
    <div className='join-modal'>
      <div className='join-wrap'>
        <img className='close' src={CloseIcon} onClick={closeModal} />
        <div className='header'>
          <img className='icon' src={ApplyIcon} />
          <p>接入申请</p>
        </div>
        <div className='apply-wrap'>
          {applyForm.map((ele, index) => (
            <div className='input-wrap' key={ele.key}>
              <label>{ele.label}</label>
              {ele.type ? (
                <textarea
                  name={ele.key}
                  value={applyInfo[ele.key]}
                  onChange={onInfoChange}
                />
              ) : (
                <input
                  name={ele.key}
                  value={applyInfo[ele.key]}
                  onChange={onInfoChange}
                />
              )}
            </div>
          ))}
        </div>
        <div className='submit-btn' onClick={onSubmit}>
          <span>提交申请</span>
        </div>
      </div>
    </div>
  );
}

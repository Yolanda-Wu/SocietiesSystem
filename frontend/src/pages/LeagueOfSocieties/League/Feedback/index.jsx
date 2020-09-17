import React, { useState, useCallback } from 'react';
import ApplyIcon from '../../../../assets/images/apply-header.svg';
import CloseIcon from '../../../../assets/images/close.svg';
import './index.scss';

export default function Feedback({ closeModal }) {
  const [applyInfo, setApplyInfo] = useState({
    societyName: '',
    contact: '',
    contactInfo: '',
    attach: '',
  });

  const applyForm = [
    {
      key: 'name',
      label: '姓名',
    },
    { key: 'telephone', label: '联系方式' },
    { key: 'title', label: '主题' },
    {
      key: 'content',
      label: '反馈内容',
      type: 'textarea',
      tips: '*反馈内容会发到社团官方邮箱，我们将尽快处理',
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
    <div className='feedback-modal'>
      <div className='feedback-wrap'>
        <img className='close' src={CloseIcon} onClick={closeModal} />
        <div className='header'>
          <img className='icon' src={ApplyIcon} />
          <p>联系我们</p>
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
        <p className='tips'>*反馈内容会发到社团官方邮箱，我们将尽快处理</p>
        <div className='submit-btn' onClick={onSubmit}>
          <span>提交申请</span>
        </div>
      </div>
    </div>
  );
}

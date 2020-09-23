import React, { useState, useCallback } from 'react';
import ApplyIcon from '../../../assets/images/apply-header.svg';
import CloseIcon from '../../../assets/images/close.svg';
import { Input, Button, message, DatePicker, Select } from 'antd';
import { sendApply } from '../../../api/league';
import moment from 'moment';
import './index.scss';

export default function Join({ closeModal }) {
  const [applyInfo, setApplyInfo] = useState({
    societyName: '',
    contact: '',
    contactInfo: '',
    attach: '',
    email: '',
    introduce: '',
    establishTime: Math.round(new Date().getTime() / 1000),
    type: '体育',
  });

  const applyForm = [
    { key: 'societyName', label: '社团名称' },
    { key: 'contact', label: '社团总负责人' },
    { key: 'contactInfo', label: '总负责人手机' },
    { key: 'email', label: '官方邮箱' },
    { key: 'establishTime', label: '成立时间', type: 'time' },
    { key: 'type', label: '社团类型', type: 'select' },

    {
      key: 'introduce',
      label: '自我介绍',
      type: 'textarea',
      tips: '*申请信息请尽量全面，管理人员会在提交申请后尽快联系申请者。',
    },
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
    console.log(applyInfo);
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
      sendApply
        .fetcher(sendApply.url, applyInfo)
        .then((data) => {
          message.success('申请成功', 1);
          closeModal();
        })
        .catch((error) => {
          alert('申请失败，请稍后尝试');
        });
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
            <div className={`input-wrap ${ele.type}`} key={ele.key}>
              <label>{ele.label}</label>
              {ele.type === 'textarea' ? (
                <textarea
                  name={ele.key}
                  value={applyInfo[ele.key]}
                  onChange={onInfoChange}
                />
              ) : ele.type === 'time' ? (
                <DatePicker
                  mode='date'
                  value={moment(applyInfo[ele.key] * 1000)}
                  onChange={(value) =>
                    onInfoChange({
                      target: {
                        name: ele.key,
                        value: Math.round(value._d.getTime() / 1000),
                      },
                    })
                  }
                />
              ) : ele.type === 'select' ? (
                <Select
                  defaultValue='体育'
                  onChange={(value) =>
                    onInfoChange({
                      target: {
                        name: ele.key,
                        value: value,
                      },
                    })
                  }
                  style={{ width: '382px' }}
                >
                  <Select.Option value='体育'>体育</Select.Option>
                  <Select.Option value='IT'>IT</Select.Option>
                  <Select.Option value='自然科学'>自然科学</Select.Option>
                  <Select.Option value='文娱'>文娱</Select.Option>
                </Select>
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

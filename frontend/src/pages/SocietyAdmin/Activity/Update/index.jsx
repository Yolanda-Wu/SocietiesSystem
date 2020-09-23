import React, { useState, useCallback, useEffect } from 'react';
import ApplyIcon from '../../../../assets/images/apply-header.svg';
import CloseIcon from '../../../../assets/images/close.svg';
import { updateActivities } from '../../../../api/admin';
import './index.scss';
import { message, DatePicker } from 'antd';
import moment from 'moment';

export default function Feedback({
  closeModal,
  societyName,
  type,
  editDetail,
  refresh,
}) {
  const [applyInfo, setApplyInfo] = useState({
    title: '',
    startTime: Math.round(new Date().getTime() / 1000),
    endTime: Math.round(new Date().getTime() / 1000),
    description: '',
    imgs: [],
  });

  useEffect(() => {
    if (editDetail) {
      setApplyInfo(editDetail);
    }
    // console.log(moment(editDetail.startTime));
  }, []);

  const applyForm = [
    {
      key: 'title',
      label: '标题',
    },
    { key: 'startTime', label: '开始时间', type: 'time' },
    { key: 'endTime', label: '结束时间', type: 'time' },
    {
      key: 'description',
      label: '活动信息',
      type: 'textarea',
    },
  ];

  const onInfoChange = (e) => {
    console.log(e);
    setApplyInfo({
      ...applyInfo,
      [e.target.name]: e.target.value,
    });
  };

  const checkApplyInfoFormat = useCallback(() => {
    // console.log(applyInfo);
    for (let key in applyInfo) {
      if (!applyInfo[key] && key !== 'imgs') {
        alert('请填写完整活动信息');
        return false;
      }
    }
    return true;
  }, [applyInfo]);

  const onSubmit = () => {
    if (checkApplyInfoFormat()) {
      updateActivities
        .fetcher(
          updateActivities.url,
          { ...applyInfo, type },
          {
            societyName: societyName,
          }
        )
        .then((data) => {
          if (type === 1) {
            message.success('发布成功');
          } else if (type === 2) {
            message.success('编辑成功');
          } else {
            message.success('删除成功');
          }
          refresh();
          closeModal();
        })
        .catch((error) => {
          message.error('发布失败');
        });
    }
  };

  return (
    <div className='update-modal'>
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
              {console.log(applyInfo, ele.key)}
              {ele.type === 'textarea' ? (
                <textarea
                  name={ele.key}
                  value={applyInfo[ele.key]}
                  onChange={onInfoChange}
                />
              ) : ele.type === 'time' ? (
                <DatePicker
                  showTime
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
          <span>{type === 1 ? '发布' : type === 2 ? '编辑' : '确认删除'}</span>
        </div>
      </div>
    </div>
  );
}

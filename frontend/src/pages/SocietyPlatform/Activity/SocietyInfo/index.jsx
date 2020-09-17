import React, { useState, useCallback, useEffect } from 'react';
import ApplyIcon from '../../../../assets/images/apply-header.svg';
import CloseIcon from '../../../../assets/images/close.svg';
import moment from 'moment';
import './index.scss';

export default function SocietyInfo({ closeModal }) {
  const [societyInfo, setSocietyInfo] = useState({
    id: '',
    name: '',
    email: '',
    type: '',
    establishedTime: null,
    members: null,
    introduce: '',
  });

  useEffect(() => {
    setSocietyInfo({
      id: '',
      name: '羽毛球社',
      email: '1309891246@qq.com',
      type: '',
      establishedTime: 1600179294,
      members: 20,
      introduce:
        'hiuAdhi啊哈FIUE好讽刺额U币服饿不菜鸟部分侧一花覅胡日催四hiuAdhi啊哈FIUE好讽刺额U币服饿不菜鸟部分侧一花覅胡日催四hiuAdhi啊哈FIUE好讽刺额U币服饿不菜鸟部分侧一花覅胡日催四hiuAdhi啊哈FIUE好讽刺额U币服饿不菜鸟部分侧一花覅胡日催四hiuAdhi啊哈FIUE好讽刺额U币服饿不菜鸟部分侧一花覅胡日催四\ncewde\n',
    });
  }, []);

  return (
    <div className='feedback-modal'>
      <div className='feedback-wrap'>
        <img className='close' src={CloseIcon} onClick={closeModal} />
        <div className='header'>
          <img className='icon' src={ApplyIcon} />
          <p>{societyInfo.name}</p>
        </div>
        <div className='info-wrap'>
          <div className='base-info-wrap'>
            <div className='base-info'>
              <label>邮件地址：</label>
              <span>{societyInfo.email}</span>
            </div>
            <div className='base-info'>
              <label>成立时间：</label>
              <span>
                {moment(societyInfo.established_time).format('YYYY-MM-DD')}
              </span>
            </div>
            <div className='base-info'>
              <label>社团总人数：</label>
              <span>{societyInfo.members}</span>
            </div>
          </div>
          <div className='intro-wrap'>
            <p>{societyInfo.introduce}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

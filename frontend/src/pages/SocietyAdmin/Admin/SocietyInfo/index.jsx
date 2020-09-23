import React, { useState, useCallback, useEffect } from 'react';
import ApplyIcon from '../../../../assets/images/apply-header.svg';
import CloseIcon from '../../../../assets/images/close.svg';
import moment from 'moment';
import './index.scss';

export default function SocietyInfo({ closeModal, societyInfo }) {
  return (
    <div className='society-modal'>
      <div className='society-wrap'>
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

import React, { useState, useCallback, useEffect } from 'react';
import ApplyIcon from '../../../../assets/images/apply-header.svg';
import CloseIcon from '../../../../assets/images/close.svg';
import moment from 'moment';
import './index.scss';
import { message } from 'antd';
import { reviewApplication } from '../../../../api/league';

export default function SocietyInfo({ closeModal, applyDetail, refresh }) {
  const [rejectReason, setRejectReason] = useState('');
  const [showReject, setShowReject] = useState(false);

  const review = (state, rejectReason) => {
    reviewApplication
      .fetcher(reviewApplication.url, {
        state,
        rejectReason,
        id: applyDetail.id,
      })
      .then((data) => {
        message.success('处理成功');
        refresh();
        closeModal();
      })
      .catch((error) => {
        message.error('网络出错');
      });
  };

  const toWriteReason = () => {
    setShowReject(true);
  };

  return (
    <div className='apply-modal'>
      <div className='society-wrap'>
        <img className='close' src={CloseIcon} onClick={closeModal} />
        <div className='header'>
          <img className='icon' src={ApplyIcon} />
          <p>{applyDetail.name}申请</p>
        </div>
        <div className='info-wrap'>
          <div className='base-info-wrap'>
            <div className='base-info'>
              <label>社团名字：</label>
              <span>{applyDetail.name}</span>
            </div>
            <div className='base-info'>
              <label>成立时间：</label>
              <span>
                {moment(applyDetail.establishedTime * 1000).format(
                  'YYYY-MM-DD'
                )}
              </span>
            </div>
            <div className='base-info'>
              <label>社团类型：</label>
              <span>{applyDetail.type}</span>
            </div>
            <div className='base-info'>
              <label>社团负责人：</label>
              <span>{applyDetail.contact}</span>
            </div>
            <div className='base-info'>
              <label>负责人手机：</label>
              <span>{applyDetail.contactInfo}</span>
            </div>
            <div className='base-info'>
              <label>社团类型：</label>
              <span>{applyDetail.type}</span>
            </div>
          </div>
          <div className='intro-wrap'>
            <p className='text'>社团介绍</p>
            <p className='content'>{applyDetail.introduce}</p>
          </div>
          <div className='intro-wrap'>
            <p className='text'>申请理由</p>

            <p className='content'>{applyDetail.attach}</p>
          </div>
          {(showReject || applyDetail.rejectReason) && (
            <div className='intro-wrap'>
              <p className='text'>拒绝理由</p>

              <textarea
                onChange={(e) => {
                  setRejectReason(e.target.value);
                }}
                value={rejectReason}
                className='reason'
              ></textarea>
            </div>
          )}
        </div>
        {showReject && (
          <div className='btns confirm'>
            <div className='reject' onClick={() => review(1, rejectReason)}>
              <span>确认拒绝</span>
            </div>
          </div>
        )}
        {showReject ||
          (applyDetail.isReviewed === 0 ? (
            <div className='btns'>
              <div className='pass' onClick={() => review(2)}>
                <span>通过</span>
              </div>
              <div className='reject' onClick={toWriteReason}>
                <span>拒绝</span>
              </div>
            </div>
          ) : (
            <div className='btns isreview'>
              {applyDetail.isReviewed === 2 ? (
                <div className='pass'>
                  <span>已通过</span>
                </div>
              ) : (
                <div className='reject'>
                  <span>已拒绝</span>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Header from '../../../components/Header';
import Loading from '../../../components/LoadingBox';
import Feedback from './Feedback';
import SocietyInfo from './SocietyInfo';
import ArrowIcon from '../../../assets/images/login-phone-btn.svg';
import './index.scss';
import { getActivities, joinOrQuitActivity } from '../../../api/platform';
import { useRouteMatch } from 'react-router';
import { message } from 'antd';

const data = [
  {
    societyId: '',
    startTime: 1600170021,
    endTime: 1600179388,
    title: '赤壁十二五',
    description:
      '草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表',
    imgs: [],
  },
];

export default function Activity() {
  const [activities, setActivities] = useState([]);
  const match = useRouteMatch('/:societyName/platform/:phone');

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const scrolRef = useRef(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSocietyInfo, setShowSocietyInfo] = useState(false);
  const nowTime = Math.round(new Date().getTime() / 1000);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    refresh(page);
  }, [page]);

  const refresh = (page) => {
    // alert(1);
    getActivities
      .fetcher(
        getActivities.url,
        { type: 2, page },
        {
          societyName: match.params.societyName,
        }
      )
      .then((data) => {
        if (data.activities.length === 0) {
          setIsEnd(true);
        } else if (page === 1) {
          setActivities(data.activities);

          setIsEnd(false);
        } else {
          setActivities([...activities, ...data.activities]);
        }
        setLoading(false);
      })
      .catch((error) => {
        message.error('网络出错');
        setLoading(false);
      });
  };

  const handleScroll = (e) => {
    if (
      !isEnd &&
      !loading &&
      e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight
    ) {
      setPage(page + 1);
      setLoading(true);
    }
  };

  const scrollToTop = () => {
    scrolRef.current.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };

  const joinOrQuit = (activityId, isJoin) => {
    joinOrQuitActivity
      .fetcher(
        joinOrQuitActivity.url,
        { activityId, isJoin: Number(isJoin) },
        {
          societyName: match.params.societyName,
        }
      )
      .then((data) => {
        isJoin
          ? message.success('已成功参与活动')
          : message.success('已退出活动');
        if (page === 1) {
          refresh(1);
        } else {
          setPage(1);
        }
      })
      .catch((error) => {
        message.error('操作失败');
      });
  };

  return (
    <div className='activity-wrap' ref={scrolRef} onScroll={handleScroll}>
      <Header
        type={3}
        societyName={match.params.societyName}
        telephone={match.params.phone}
      />
      <div className='operate-btns'>
        <div className='intro' onClick={() => setShowSocietyInfo(true)}>
          <span>团队介绍</span>
        </div>
        <div className='feedback' onClick={() => setShowFeedback(true)}>
          <span>联系我们</span>
        </div>
      </div>
      <div className='activities'>
        {activities.map((activity, index) => (
          <div className='activity-box' key={index}>
            <div className='header'>
              <p className='title'>{activity.title}</p>
              <div className='date-wrap'>
                <p className='text'>
                  开始日期：
                  <span>
                    {moment(activity.startTime * 1000).format(
                      'YYYY-MM-DD, HH:MM'
                    )}
                  </span>
                </p>
                <div className='gap' />
                <p className='text'>
                  结束日期：
                  <span>
                    {moment(activity.endTime * 1000).format(
                      'YYYY-MM-DD, HH:MM'
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className='description-wrap'>
              <b>活动内容：</b>
              <br />
              <textarea value={activity.description} />
            </div>
            <p className='gap-line' />
            <div className='participants-wrap'>
              <b>参与人员</b>
              <br />
              <div className='participants'>
                {activity.participants.map((mem, index) => (
                  <p className='participant' key={index}>
                    <b>{mem.name}</b>
                    <span>--{mem.telephoneNumber}</span>
                  </p>
                ))}
                {activity.participants.length === 0 && (
                  <p className='participant' key={index}>
                    <b>暂无人参与</b>
                  </p>
                )}
              </div>
            </div>
            <div className='join-activity'>
              <div className='status'>
                <b>参与状态：</b>
                <span>{activity.isJoin ? '已参与' : '未参与'}</span>
              </div>
              {activity.endTime <= nowTime ? (
                <div className='end'>
                  <b>活动状态：</b>
                  <span>已结束</span>
                </div>
              ) : (
                <div className='going'>
                  <b>活动状态：</b>

                  <span>进行中</span>
                </div>
              )}
              {activity.endTime <= nowTime || (
                <div
                  className={`btn ${activity.isJoin ? 'quit' : ''}`}
                  onClick={() =>
                    joinOrQuit(activity.activityId, !activity.isJoin)
                  }
                >
                  <span>{activity.isJoin ? '退出活动' : '参与本次活动'}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {!loading && activities.length === 0 && (
          <div className='no-data'>
            <span>管理员尚未发布活动</span>
          </div>
        )}
        {loading && (
          <div className='loading'>
            <Loading />
          </div>
        )}
      </div>

      <img className='toTop' src={ArrowIcon} onClick={scrollToTop} />

      {showFeedback && (
        <Feedback
          closeModal={() => setShowFeedback(false)}
          societyName={match.params.societyName}
        />
      )}
      {showSocietyInfo && (
        <SocietyInfo
          closeModal={() => setShowSocietyInfo(false)}
          societyName={match.params.societyName}
        />
      )}
    </div>
  );
}

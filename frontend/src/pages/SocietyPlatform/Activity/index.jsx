import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Header from '../../../components/Header';
import Loading from '../../../components/LoadingBox';
import Feedback from './Feedback';
import SocietyInfo from './SocietyInfo';
import ArrowIcon from '../../../assets/images/login-phone-btn.svg';
import './index.scss';

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
  {
    societyId: '',
    startTime: 1600170021,
    endTime: 1600170021,
    title: '赤壁十二五',
    description:
      '草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表',
    imgs: [],
  },
  {
    societyId: '',
    startTime: 1600170021,
    endTime: 1600170021,
    title: '赤壁十二五',
    description:
      '草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表',
    imgs: [],
  },
  {
    societyId: '',
    startTime: 1600170021,
    endTime: 1600170021,
    title: '赤壁十二五',
    description:
      '草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表',
    imgs: [],
  },
  {
    societyId: '',
    startTime: 1600170021,
    endTime: 1600170021,
    title: '赤壁十二五',
    description:
      '草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表草拟额外花第五届地位和地位和丢我百度吧粗暴地粗暴丢百度我不饿百度二维表',
    imgs: [],
  },
];

export default function Activity() {
  const [activities, setActivities] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const scrolRef = useRef(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSocietyInfo, setShowSocietyInfo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // activities.push(data);
      setActivities([...activities, ...data]);
      setLoading(false);
    }, 1000);
  }, [page]);

  const handleScroll = (e) => {
    if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
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

  return (
    <div className='activity-wrap' ref={scrolRef} onScroll={handleScroll}>
      <Header type={3} societyName={'羽毛球社'} />
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
              {activity.description}
            </div>
          </div>
        ))}
        {loading && (
          <div className='loading'>
            <Loading />
          </div>
        )}
      </div>

      <img className='toTop' src={ArrowIcon} onClick={scrollToTop} />

      {showFeedback && <Feedback closeModal={() => setShowFeedback(false)} />}
      {showSocietyInfo && (
        <SocietyInfo closeModal={() => setShowSocietyInfo(false)} />
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Header from '../../../components/Header';
import Loading from '../../../components/LoadingBox';
import Update from './Update';
import SocietyInfo from './SocietyInfo';
import ArrowIcon from '../../../assets/images/login-phone-btn.svg';
import { getActivities } from '../../../api/admin';
import { useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

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
];

export default function Activity() {
  const match = useRouteMatch('/:societyName/society/:phone/activity');
  const [activities, setActivities] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const scrolRef = useRef(null);
  const [showPublish, setShowPublish] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editDetail, setEditDetail] = useState({});
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    refresh(page);
  }, [page]);

  const refresh = (page) => {
    getActivities
      .fetcher(
        getActivities.url,
        { type: 1, page },
        {
          societyName: match.params.societyName,
        }
      )
      .then((data) => {
        // console.log();
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

  return (
    <div className='activity-wrap' ref={scrolRef} onScroll={handleScroll}>
      <Header
        type={2}
        societyName={match.params.societyName}
        telephone={match.params.phone}
      />
      <div className='operate-btns'>
        <div className='intro' onClick={() => setShowPublish(true)}>
          <span>发布活动</span>
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
              <p
                className='delete'
                onClick={() => {
                  setEditDetail(activity);
                  setShowDelete(true);
                }}
              >
                删除
              </p>
              <p
                className='delete'
                onClick={() => {
                  setEditDetail(activity);
                  setShowEdit(true);
                }}
              >
                编辑
              </p>
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
          </div>
        ))}
        {!loading && activities.length === 0 && (
          <div className='no-data'>
            <span>请点击左上角按钮发布活动</span>
          </div>
        )}
        {loading && (
          <div className='loading'>
            <Loading />
          </div>
        )}
      </div>

      <img className='toTop' src={ArrowIcon} onClick={scrollToTop} />

      {showPublish && (
        <Update
          closeModal={() => setShowPublish(false)}
          societyName={match.params.societyName}
          type={1}
          refresh={() => {
            if (page === 1) {
              refresh(1);
            } else {
              setPage(1);
            }
          }}
        />
      )}

      {showEdit && (
        <Update
          closeModal={() => setShowEdit(false)}
          societyName={match.params.societyName}
          type={2}
          editDetail={editDetail}
          refresh={() => {
            if (page === 1) {
              refresh(1);
            } else {
              setPage(1);
            }
          }}
        />
      )}
      {showDelete && (
        <Update
          closeModal={() => setShowDelete(false)}
          societyName={match.params.societyName}
          type={3}
          editDetail={editDetail}
          refresh={() => {
            if (page === 1) {
              refresh(1);
            } else {
              setPage(1);
            }
          }}
        />
      )}
    </div>
  );
}

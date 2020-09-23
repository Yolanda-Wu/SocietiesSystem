import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Header from '../../../components/Header';
import Loading from '../../../components/LoadingBox';
import ChangeModal from './ChangeModal';
import ApplyInfo from './ApplyInfo';
import ArrowIcon from '../../../assets/images/login-phone-btn.svg';
import './index.scss';
import { useRouteMatch } from 'react-router';
import { Table, message } from 'antd';
import { getApplications } from '../../../api/league';

export default function League() {
  const match = useRouteMatch('/league/:phone/review');

  const [applications, setApplications] = useState([]);
  const [applyType, setApplyType] = useState(2); //1:已审核,2:未审核
  const [loading, setLoading] = useState(true);
  const scrolRef = useRef(null);
  // const [showChangeModal, setShowChangeModal] = useState(false);
  const [showApplyInfo, setShowApplyInfo] = useState(false);
  const [applyDetail, setApplyDetail] = useState({});

  const refresh = (type) => {
    getApplications
      .fetcher(getApplications.url, {
        type,
      })
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((error) => {
        message.error('网络出错');
        setLoading(false);
      });
  };

  useEffect(() => {
    refresh(applyType);
  }, [applyType]);

  const scrollToTop = () => {
    scrolRef.current.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };

  const showDetail = (name, record, index) => {
    setShowApplyInfo(true);
    setApplyDetail(record);
  };

  const columns = [
    {
      title: '社团名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '社团负责人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '负责人手机',
      dataIndex: 'contactInfo',
      key: 'contactInfo',
    },
    {
      title: '成立时间',
      dataIndex: 'establishedTime',
      key: 'establishedTime',
      render: (text) => moment(text * 1000).format('YYYY-MM-DD'),
    },
    {
      title: '官方邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '审核状态',
      dataIndex: 'isReviewed',
      key: 'isReviewed',
      render: (text, record, index) => {
        switch (text) {
          case 0:
            return <p className='unreview'>未审核</p>;
          case 1:
            return <p className='reject'>已拒绝</p>;
          case 2:
            return <p className='pass'>已通过</p>;
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'name',
      key: 'operate',
      render: (text, record, index) => (
        <div>
          <a>
            <p onClick={(e) => showDetail(text, record, index)}>查看详情</p>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className='review-wrap' ref={scrolRef}>
      <Header type={1} telephone={match.params.phone} />
      <div className='operate-btns'>
        <div
          className={`intro ${applyType === 2 ? 'select' : ''}`}
          onClick={() => setApplyType(2)}
        >
          <span>查看未审核</span>
        </div>
        <div
          className={`intro ${applyType === 1 ? 'select' : ''}`}
          onClick={() => setApplyType(1)}
        >
          <span>查看已审核</span>
        </div>
      </div>
      <div className='applications'>
        <p className='review-title'>
          {applyType === 2 ? '未审核申请表概览' : '已审核申请表概览'}
        </p>
        <Table dataSource={applications} columns={columns} />
        {loading && (
          <div className='loading'>
            <Loading />
          </div>
        )}
      </div>

      <img className='toTop' src={ArrowIcon} onClick={scrollToTop} />

      {showApplyInfo && (
        <ApplyInfo
          closeModal={() => setShowApplyInfo(false)}
          applyDetail={applyDetail}
          refresh={() => refresh(applyType)}
        />
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Header from '../../../components/Header';
import Loading from '../../../components/LoadingBox';
import Feedback from './Feedback';
import SocietyInfo from './SocietyInfo';
import ArrowIcon from '../../../assets/images/login-phone-btn.svg';
import './index.scss';
import { useRouteMatch } from 'react-router';
import { Table } from 'antd';

const data = [
  {
    id: '',
    name: '羽毛球社',
    contact: '嘤嘤嘤',
    contactInfo: '13728993030',
    email: '17829304758@qq.com',
    type: '',
    establishedTime: 1600170021,
    members: 30,
    introduce: '场矿务局你扥叠加的李经理奶茶呢看上的拿出来的可能测控',
  },
  {
    id: '',
    name: '羽毛球社',
    contact: '嘤嘤嘤',
    contactInfo: '13728993030',
    email: '17829304758@qq.com',
    type: '',
    establishedTime: 1600170021,
    members: 30,
    introduce: '场矿务局你扥叠加的李经理奶茶呢看上的拿出来的可能测控',
  },
  {
    id: '',
    name: '羽毛球社',
    contact: '嘤嘤嘤',
    contactInfo: '13728993030',
    email: '17829304758@qq.com',
    type: '',
    establishedTime: 1600170021,
    members: 30,
    introduce: '场矿务局你扥叠加的李经理奶茶呢看上的拿出来的可能测控',
  },
  {
    id: '',
    name: '羽毛球社',
    contact: '嘤嘤嘤',
    contactInfo: '13728993030',
    email: '17829304758@qq.com',
    type: '',
    establishedTime: 1600170021,
    members: 30,
    introduce: '场矿务局你扥叠加的李经理奶茶呢看上的拿出来的可能测控',
  },
];

export default function League() {
  const match = useRouteMatch('/league/:phone');

  const [societies, setSocieties] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const scrolRef = useRef(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSocietyInfo, setShowSocietyInfo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSocieties(data);
      setLoading(false);
    }, 1000);
  }, []);

  const scrollToTop = () => {
    scrolRef.current.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };

  const showDetail = (name, record, index) => {
    console.log(name, record, index);
  };

  const columns = [
    {
      title: '社团名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '社团联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '联系方式',
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
      title: '操作',
      dataIndex: 'name',
      key: 'operate',
      render: (text, record, index) => (
        <p onClick={(e) => showDetail(text, record, index)}>操作</p>
      ),
    },
  ];

  return (
    <div className='league-wrap' ref={scrolRef}>
      <Header type={1} telephone={match.params.phone} />
      {/* <div className='operate-btns'>
        <div className='intro' onClick={() => setShowSocietyInfo(true)}>
          <span>团队介绍</span>
        </div>
        <div className='feedback' onClick={() => setShowFeedback(true)}>
          <span>联系我们</span>
        </div>
      </div> */}
      <div className='societies'>
        {societies.map((society, index) => (
          <div className='society-wrap'></div>
        ))}
        <Table dataSource={societies} columns={columns} />
        {loading && (
          <div className='loading'>
            <Loading />
          </div>
        )}
      </div>

      <img className='toTop' src={ArrowIcon} onClick={scrollToTop} />
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Header from '../../../components/Header';
import Loading from '../../../components/LoadingBox';
import ChangeModal from './ChangeModal';
import SocietyInfo from './SocietyInfo';
import ArrowIcon from '../../../assets/images/login-phone-btn.svg';
import './index.scss';
import { useRouteMatch, useHistory } from 'react-router';
import { Table, message } from 'antd';
import { getSocietyList } from '../../../api/league';

export default function League() {
  const match = useRouteMatch('/league/:phone');
  const history = useHistory();

  const [societies, setSocieties] = useState([]);

  const [loading, setLoading] = useState(true);
  const scrolRef = useRef(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showSocietyInfo, setShowSocietyInfo] = useState(false);
  const [societyDetail, setSocietyDetail] = useState({});

  const refresh = () => {
    getSocietyList
      .fetcher(getSocietyList.url, {
        type: 1,
      })
      .then((data) => {
        setSocieties(data.societies);
        setLoading(false);
        console.log(data, 'jj');
      })
      .catch((error) => {
        message.error('网络出错');
        setLoading(false);
      });
  };

  useEffect(() => {
    refresh();
    // setTimeout(() => {
    //   setSocieties(data);
    //   setLoading(false);
    // }, 1000);
  }, []);

  const scrollToTop = () => {
    scrolRef.current.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };

  const showDetail = (name, record, index) => {
    setShowSocietyInfo(true);
    setSocietyDetail(record);
  };

  const changeContact = (name, record, index) => {
    setShowChangeModal(true);
    setSocietyDetail(record);
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
      title: '联系方式',
      dataIndex: 'contactInfo',
      key: 'contactInfo',
    },
    {
      title: '成立时间',
      dataIndex: 'establishedTime',
      key: 'establishedTime',
      render: (text) => moment(text).format('YYYY-MM-DD'),
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
        <div>
          <a>
            <p onClick={(e) => showDetail(text, record, index)}>查看详情</p>
          </a>
          <a>
            <p onClick={(e) => changeContact(text, record, index)}>
              修改负责人
            </p>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className='league-wrap' ref={scrolRef}>
      <Header type={1} telephone={match.params.phone} />
      <div className='operate-btns'>
        <div
          className='intro'
          onClick={() => history.push(`/league/${match.params.phone}/review`)}
        >
          <span>查看申请</span>
        </div>
      </div>
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
      {showChangeModal && (
        <ChangeModal
          closeModal={() => setShowChangeModal(false)}
          societyDetail={societyDetail}
          refresh={refresh}
        />
      )}
      {showSocietyInfo && (
        <SocietyInfo
          closeModal={() => setShowSocietyInfo(false)}
          societyInfo={societyDetail}
        />
      )}
    </div>
  );
}

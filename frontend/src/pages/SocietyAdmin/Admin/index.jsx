import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Header from '../../../components/Header';
import Loading from '../../../components/LoadingBox';
import ChangeModal from './ChangeModal';
import SocietyInfo from './SocietyInfo';
import ArrowIcon from '../../../assets/images/login-phone-btn.svg';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { Table, message } from 'antd';
import { getMemberList } from '../../../api/admin';

export default function League() {
  const match = useRouteMatch('/:societyName/society/:phone');
  const history = useHistory();

  const [members, setMembers] = useState([]);

  // const [group, setGroup] = useState('');
  const [loading, setLoading] = useState(true);
  const scrolRef = useRef(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [member, setMember] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    getMemberList
      .fetcher(
        getMemberList.url,
        {},
        {
          societyName: match.params.societyName,
        }
      )
      .then((data) => {
        // alert(1);
        setMembers(data.data);
        setLoading(false);
      })
      .catch((error) => {
        message.error('网络出错');
        setLoading(false);
      });
  };

  const scrollToTop = () => {
    scrolRef.current.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };

  const deleteMember = (name, record, index) => {
    setShowDeleteModal(true);
    setMember(record);
  };

  const editMember = (name, record, index) => {
    setShowChangeModal(true);
    setSocietyDetail(record);
  };

  const toPublishActivity = () => {
    history.push(
      `/${match.params.societyName}/society/${match.params.phone}/publish`
    );
  };

  const toActivity = () => {
    history.push(
      `/${match.params.societyName}/society/${match.params.phone}/activity`
    );
  };

  const toAddMember = () => {
    setShowChangeModal(true);
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '身份',
      dataIndex: 'userRight',
      key: 'userRight',
      render: (text) => (text === 1 ? '管理员' : '普通成员'),
    },
    {
      title: '联系方式',
      dataIndex: 'telephoneNumber',
      key: 'telephoneNumber',
    },

    {
      title: '操作',
      dataIndex: 'name',
      key: 'operate',
      render: (text, record, index) => (
        <div>
          <a>
            <p onClick={(e) => deleteMember(text, record, index)}>删除</p>
          </a>
          {/* <a>
            <p onClick={(e) => editMember(text, record, index)}>修改信息</p>
          </a> */}
        </div>
      ),
    },
  ];

  return (
    <div className='league-wrap' ref={scrolRef}>
      <Header
        type={2}
        societyName={match.params.societyName}
        telephone={match.params.phone}
      />
      <div className='operate-btns'>
        <div className='feedback' onClick={toActivity}>
          <span>查看活动</span>
        </div>
        {/* <div className='intro' onClick={toPublishActivity}>
          <span>发布活动</span>
        </div> */}
        <div className='feedback' onClick={toAddMember}>
          <span>新增成员</span>
        </div>
      </div>
      <div className='societies'>
        <Table dataSource={members} columns={columns} />
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
          societyName={match.params.societyName}
          refresh={refresh}
        />
      )}
      {showDeleteModal && (
        <ChangeModal
          closeModal={() => setShowDeleteModal(false)}
          societyName={match.params.societyName}
          memberInfo={member}
          refresh={refresh}
        />
      )}
      {/* {showSocietyInfo && (
        <SocietyInfo
          closeModal={() => setShowSocietyInfo(false)}
          societyInfo={societyDetail}
        />
      )} */}
    </div>
  );
}

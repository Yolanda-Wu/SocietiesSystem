import React, { useState, useCallback, useEffect } from 'react';
import ApplyIcon from '../../../../assets/images/apply-header.svg';
import CloseIcon from '../../../../assets/images/close.svg';
import './index.scss';
import { Select, message } from 'antd';
import { updateMember } from '../../../../api/admin';

export default function ChangeModal({
  closeModal,
  societyName,
  memberInfo,
  refresh,
}) {
  const [member, setMember] = useState({
    name: '',
    telephone: '',
    type: 1,
    userRight: '0',
  });

  useEffect(() => {
    if (memberInfo) {
      setMember(memberInfo);
    }
  }, []);

  const memberDeleteForm = [
    {
      key: 'name',
      label: '姓名',
    },
    { key: 'telephoneNumber', label: '手机号码' },
    { key: 'userRight', label: '身份', type: 'select' },
  ];

  const memberForm = memberInfo
    ? memberDeleteForm
    : [
        {
          key: 'name',
          label: '姓名',
        },
        { key: 'telephone', label: '手机号码' },
        { key: 'userRight', label: '身份', type: 'select' },
      ];

  const onInfoChange = (e) => {
    if (memberInfo) return;
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const checkMemberFormat = useCallback(() => {
    for (let key in member) {
      if (key === 'telephone' && member[key]) {
        if (!/^1[3456789]\d{9}$/.test(member[key])) {
          alert('手机号格式不正确');
          return false;
        }
      }
      if (!member[key]) {
        alert('请填写完整信息');
        return false;
      }
    }
    return true;
  }, [member]);

  const onSubmit = () => {
    if (memberInfo) {
      updateMember
        .fetcher(
          updateMember.url,
          {
            ...member,
            userId: member.id,
            telephone: member.telephoneNumber,
            type: 3,
          },
          {
            societyName: societyName,
          }
        )
        .then((data) => {
          refresh();
          closeModal();
        })
        .catch((error) => {
          message.error('网络出错');
        });
      return;
    }

    if (checkMemberFormat()) {
      updateMember
        .fetcher(updateMember.url, member, {
          societyName: societyName,
        })
        .then((data) => {
          refresh();
          closeModal();
        })
        .catch((error) => {
          message.error('网络出错');
        });
    }
  };

  return (
    <div className='change-modal'>
      <div className='change-wrap'>
        <img className='close' src={CloseIcon} onClick={closeModal} />
        <div className='header'>
          <img className='icon' src={ApplyIcon} />
          <p>新增成员</p>
        </div>
        <div className='apply-wrap'>
          {memberForm.map((ele, index) => (
            <div className='input-wrap' key={ele.key}>
              <label>{ele.label}</label>
              {ele.type === 'select' ? (
                <Select
                  defaultValue={member[ele.key].toString()}
                  onChange={(value) =>
                    onInfoChange({
                      target: { value: value, name: 'userRight' },
                    })
                  }
                >
                  <Option value='0'>普通成员</Option>
                  <Option value='1'>管理员</Option>
                </Select>
              ) : (
                <input
                  name={ele.key}
                  value={member[ele.key]}
                  onChange={onInfoChange}
                />
              )}
            </div>
          ))}
        </div>
        <div className='submit-btn' onClick={onSubmit}>
          <span>{memberInfo ? '确认删除' : '修改'}</span>
        </div>
      </div>
    </div>
  );
}

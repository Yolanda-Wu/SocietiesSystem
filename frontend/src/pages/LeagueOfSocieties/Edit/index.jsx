import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import useSWR from 'swr';

import { getFormInfo, getPrevFormInfo } from 'Api/sign.js';

import './index.scss';
import LoadingBox from 'Components/LoadingBox';
import BaseForm from '../components/BaseForm';
import DIYForm from '../components/DIYForm';
import SaveBtn from '../components/SaveBtn';

const defaultForm = {
  name: '',
  sex: '',
  major: '',
  phone: '',
  verify_code: '',
  email: '',
  picture: '',
  resume: '',
  attachment: '',
  custom: {}
};

export default function Edit(props) {
  const match = useRouteMatch('/sign/:phone');
  const history = useHistory();

  const verifyCode = sessionStorage.getItem('yzm');
  const associationName = '测试社团';

  const [editForm, setEditForm] = useState(defaultForm);

  const { data: forms } = useSWR(
    [getFormInfo.url, associationName],
    (url, associationName) => getFormInfo.fetcher(url, {}, { associationName })
  );
  const { data: oldForm } = useSWR(getPrevFormInfo.url, url =>
    getPrevFormInfo.fetcher(
      url,
      { verifyCode },
      { associationName, phone: match.params.phone }
    )
  );

  useEffect(() => {
    if (!oldForm || !forms) return;
    if (oldForm.exists) {
      setEditForm({ ...oldForm });
    } else {
      let groups = [];
      for (let key in forms) {
        groups.push(key);
      }
      let form = forms[groups[0]];
      let questions = {};

      form.custom.forEach((ques, i) => {
        questions[ques] = '';
      });

      setEditForm({ ...form, custom: questions, group: groups[0] });
    }
  }, [oldForm, forms]);

  const onChange = (value, key, custom) => {
    if (key === 'group') {
      if (value === oldForm.group) {
        setEditForm({ ...oldForm });
      } else {
        let form = forms[value];
        let questions = {};

        form.custom.forEach((ques, i) => {
          questions[ques] = '';
        });

        setEditForm({ ...form, custom: questions, group: value });
      }
    } else if (custom) {
      setEditForm({ ...editForm, custom: { ...custom, [key]: value } });
    } else {
      setEditForm({ ...editForm, [key]: value });
    }
  };

  const onSubmit = () => {};

  if (!editForm.group) {
    return (
      <div className='edit-wrap'>
        <LoadingBox />
      </div>
    );
  }

  return (
    <div className='edit-wrap'>
      {oldForm &&
        (oldForm.canSignup || <p className='disable-sign'>报名未开启</p>)}

      <BaseForm editForm={editForm} forms={forms} onChange={onChange} />
      <DIYForm editForm={editForm} forms={forms} onChange={onChange} />
      <SaveBtn />
    </div>
  );
}

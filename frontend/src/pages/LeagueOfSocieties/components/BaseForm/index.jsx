import React from 'react';

import './index.scss';
import { Select, Input, Upload, Button } from 'antd';

export default function BaseForm(props) {
  const { editForm, forms } = props;
  const { name, sex, major, group, email, picture, resume } = editForm;

  let groups = [];
  for (let key in forms) {
    groups.push(key);
  }

  const { allowPhoto, allowResume } = forms[group];

  return (
    <div className='base-ques'>
      <Select
        className='group-select'
        placeholder='选择意向部门/组别'
        value={group}
        onChange={value => onChange(value, 'group')}
      >
        {groups.map((group, i) => (
          <Select.Option key={i} value={group}>
            {group}
          </Select.Option>
        ))}
      </Select>
      <Input
        className='name'
        placeholder='姓名'
        value={name}
        onChange={e => onChange(e.target.value, 'name')}
      />
      <Select
        className='sex-select'
        placeholder='性别'
        value={sex}
        onChange={value => onChange(value, 'sex')}
      >
        <Select.Option value='男'>男</Select.Option>
        <Select.Option value='女'>女</Select.Option>
      </Select>
      <Input
        className='major'
        placeholder='专业班级'
        value={major}
        onChange={e => onChange(e.target.value, 'major')}
      />

      <div className='upload-box'>
        {allowPhoto && (
          <Upload showUploadList={false}>
            <Button className='upload-picture'>
              <p className='text'>点击上传照片</p>
            </Button>
          </Upload>
        )}

        {allowResume && resume ? (
          <Button className='upload-resume'>查看简历 </Button>
        ) : (
          <Upload showUploadList={false}>
            <Button className='upload-resume'>上传简历(PDF) </Button>
          </Upload>
        )}
      </div>
      <Input
        className='email'
        placeholder='邮箱'
        value={email}
        onChange={e => onChange(e.target.value, 'email')}
      />
    </div>
  );
}

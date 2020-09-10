import React from 'react';

import './index.scss';
import { Upload, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

export default function BaseForm(props) {
  const { editForm, forms } = props;
  const {
    group,

    attachment,
    custom
  } = editForm;

  const { allowOther } = forms[group];

  let questions = forms[group].custom;

  return (
    <div className='diy-questions'>
      {allowOther && (
        <div className='attachment'>
          <span className='text'>其他附件要求</span>
          {attachment ? (
            <Button className='btn'>查看附件</Button>
          ) : (
            <Upload showUploadList={false}>
              <Button className='btn'>上传附件</Button>
            </Upload>
          )}
        </div>
      )}
      {questions.map((ques, i) => (
        <div className='ques-box' key={ques}>
          <p>{ques}</p>
          <TextArea
            className='ques'
            value={custom[ques]}
            onChange={e => onChange(e.target.value, ques, 'custom')}
          ></TextArea>
        </div>
      ))}
      {/* {questions.map((ques, i) => (
      <div className='ques-box' key={ques}>
        <p>{ques}</p>
        <TextArea
          className='ques'
          value={custom[ques]}
          onChange={e => onChange(e.target.value, ques, 'custom')}
        ></TextArea>
      </div>
    ))} */}
    </div>
  );
}

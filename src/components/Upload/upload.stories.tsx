import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import Icon from '../Icon/icon'

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '1234', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '12345', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
]

const checkFileSize = (file: File) => {
  // 假如大于50kb
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {type: file.type})
  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return(
    <Upload
      action="https://run.mocky.io/v3/0f3dcbc8-df8b-4dbf-9a69-3a2c94beee3b"
      onChange={action('change')}
      // defaultFileList={defaultFileList}
      onRemove={action('removed')}
      name="fileName"
      multiple
      drag
    >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>Drag file over to upload</p>

    </Upload>
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
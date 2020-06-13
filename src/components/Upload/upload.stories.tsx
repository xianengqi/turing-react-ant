import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'

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
      action="https://run.mocky.io/v3/014d359c-e4b3-4155-9c5d-d09d6d1ec265"
      onChange={action('change')}
      defaultFileList={defaultFileList}
      onRemove={action('removed')}
    />
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
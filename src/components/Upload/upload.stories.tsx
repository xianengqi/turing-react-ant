import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'

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
      action="https://my-json-server.typicode.com/xianengqi/myJsonServer/posts"
      onChange={action('change')}
      // beforeUpload={filePromise}
      // onProgress={action('progress')}
      // onSuccess={action('onSuccess')}
      // onError={action('onError')}

    />
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
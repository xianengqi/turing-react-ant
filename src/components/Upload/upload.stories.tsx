import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'

const SimpleUpload = () => {
  return(
    <Upload
      action="https://my-json-server.typicode.com/xianengqi/myJsonServer/posts"
      onProgress={action('progress')}
      onSuccess={action('onSuccess')}
      onError={action('onError')}
    />
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
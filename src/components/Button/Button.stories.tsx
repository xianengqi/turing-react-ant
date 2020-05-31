import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './Button'

const defaultButton = () => (
  <Button onClick={action('clicked 哈哈')}>default Button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg">large Button</Button>
    <Button size="sm">small Button</Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="danger">danger Button</Button>
    <Button btnType="default">default Button</Button>
    <Button btnType="link" href="https://google.com">link Button</Button>
    <Button btnType="primary">primary Button</Button>
  </>
)

storiesOf('Button 组件', module)
  .add('默认 Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)
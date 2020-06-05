import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Input } from './input'
const defaultInput = () => (
  <Input
    placeholder="漂亮的 Input"
    onChange={action('changed')}
  />
)
const disabledInput = () => (
  <Input
    placeholder="disabled input"
    disabled 
  />
)

const iconInput = () => (
  <Input
    placeholder="input with icon"
    icon="search"
  />  
)

const sizeInput = () => (
  <>
    <Input
      defaultValue="large size"
      size="lg"
    />
    <Input
      placeholder="small size"
      size="sm"
    />
  </>
)

const pandInput = () => (
  <>
    <Input
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      defaultValue="google"
      append=".com"
    />
    
  </>
)


storiesOf('Input', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后缀的 Input', pandInput)

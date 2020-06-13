import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'

import { Upload, UploadProps } from './upload'

jest.mock('../Icon/icon', () => {
  return ({icon}) => {
  return <span>{icon}</span>
  }
})

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;

describe('测试 upload 组件', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('click to upload') as HTMLElement
  })
  it('测试上传进度', async () => {

  })
})
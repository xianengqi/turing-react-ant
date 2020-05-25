import React from 'react'
import { render } from '@testing-library/react'
import Button from './Button'

describe('测试Button组件', () => {
  it('对default状态的button组件测试', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON') // 测试是否是button组件
    expect(element).toHaveClass('btn btn-default')  // 测试是否有btn的class
  })
  it('根据传入不同的props,显示不同的button大小,测试', () => {

  })
  it('渲染一个a链接，如果btnType === href，返回测试的结果', () => {
    
  })
  it('当是disable禁用状态时，渲染一个disable的button组件', () => {

  })
})
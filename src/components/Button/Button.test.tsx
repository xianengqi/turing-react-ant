import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './Button'

// 测试用户点击button触发事件
const defaultProps = {
  onClick: jest.fn()
}

// 测试button的大小和状态
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}

// 测试是否disable禁用状态
const disableProps: ButtonProps = {
  disabled: true,
  // 测试onClick能否在禁用情况下被调用
  onClick: jest.fn()
}

describe('测试Button组件', () => {
  it('对default状态的button组件测试', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON') // 测试是否是button组件
    expect(element).toHaveClass('btn btn-default')  // 测试是否有btn的class
    expect(element.disabled).toBeFalsy() // 测试默认为false
    fireEvent.click(element) // 测试用户点击后触发的事件
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('根据传入不同的props,显示不同的button大小,测试', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('测试是否为<a></a>链接', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://durminUrl">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A') // 测试是否是button组件
    expect(element).toHaveClass('btn btn-link')
  })
  it('测试是否disable禁用状态', () => {
    const wrapper = render(<Button {...disableProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement // 使用类型断言来让`element`有button
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()  // 测试是否为真
    fireEvent.click(element)         // 测试click事件
    expect(disableProps.onClick).not.toHaveBeenCalled()  // 没有被调用时
  })
})
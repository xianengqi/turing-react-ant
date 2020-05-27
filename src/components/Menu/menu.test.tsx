import React from 'react'
import {render, RenderResult, fireEvent, cleanup} from '@testing-library/react'

import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  )
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('测试 Menu 和 MenuItem 组件', () => {
  // 通用的元素可以放在`beforEach`这个钩子函数里面
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('测试Menu和MenuItem默认props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('turing-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('测试Menu点击触发的行为是否在正确的MenuItem上面，disabled状态下是否能触发行为', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('测试是否切换对应的menu横向或者是纵向菜单', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})
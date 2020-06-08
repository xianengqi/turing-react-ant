import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps } from './autoComplete'

config.disabled = true

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
]
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('测试AutoComplete', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('测试基本的功能', async() => {
    fireEvent.change(inputNode, {target: { value: 'a' }})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll('.suggestions-item').length).toEqual(4)
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')
  })
  it('测试键盘上下esc和enter的支持', async() => {
    fireEvent.change(inputNode, {target: { value: 'a' }})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')
    fireEvent.keyDown(inputNode, {keyCode: 40})
    expect(firstResult).toHaveClass('item-hightlighted')
    fireEvent.keyDown(inputNode, {keyCode: 40})
    expect(secondResult).toHaveClass('item-hightlighted')
    fireEvent.keyDown(inputNode, {keyCode: 38})
    expect(firstResult).toHaveClass('item-hightlighted')
    fireEvent.keyDown(inputNode, {keyCode: 13})
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()

  })
  it('测试点击空白dom，让dropdown消失', async() => {
    fireEvent.change(inputNode, {target: { value: 'a' }})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('测试自定义显示模版', () => {

  })
  it('测试异步是否能正常获取数据', () => {

  })
})
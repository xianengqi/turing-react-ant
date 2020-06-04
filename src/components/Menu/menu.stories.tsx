import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

export const defaultMenu = () => (
  <Menu defaultIndex='0' onSelect={action('selected!')}>
    <MenuItem>test1</MenuItem>
    <MenuItem>test2</MenuItem>
    <MenuItem>test3</MenuItem>
    <SubMenu title="下拉选项">
      <MenuItem>下拉选项1</MenuItem>
    </SubMenu>
  </Menu>
)

export const clickMenu = () => (
  <Menu defaultIndex='0' onSelect={action('selected!')} mode="vertical">
    <MenuItem>test1</MenuItem>
    <MenuItem>test2</MenuItem>
    <MenuItem>test3</MenuItem>
    <SubMenu title="下拉选项">
    <MenuItem>demo1</MenuItem>
    </SubMenu>
  </Menu>
)

export const openMenu = () => (
  <Menu defaultIndex='0' onSelect={action('selected!')} mode="vertical" defaultOpenSubMenus={['3']}>
    <MenuItem>test1</MenuItem>
    <MenuItem>test2</MenuItem>
    <MenuItem>test3</MenuItem>
    <SubMenu title="下拉选项">
    <MenuItem>demo1</MenuItem>
    </SubMenu>
  </Menu>
)

storiesOf('Menu', module)
  .add('Menu', defaultMenu)
  .add('纵向的Menu', clickMenu)
  .add('默认展开的纵向Menu', openMenu)

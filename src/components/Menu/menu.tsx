import React, { FC, useState, createContext, CSSProperties } from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'
// 字符串字面量
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback =  (selectedIndex: string) => void;
// 属性props
export interface MenuProps {
  /** 默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: CSSProperties;
  onSelect?: SelectCallback;   // 触发的回调，是函数类型
  defaultOpenSubMenus?: string[]; // 数组
}

// createContext => 父组件值到子组件props
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[]; // 数组
}

// 父组件传子组件
export const MenuContext = createContext<IMenuContext>({index: '0'})
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'turing'
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('turing-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus,
  }
  // 循环遍历子组件
  const renderChildren = () => {
    // 循环它的children
    return React.Children.map(children, (child, index) => {
      const childrenElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childrenElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childrenElement, {
          index: index.toString()
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        { renderChildren() }
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  // mode: 'vertical',
  defaultOpenSubMenus: [],
}

export default Menu;
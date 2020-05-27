import React, { useState, createContext, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'
// 字符串字面量
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback =  (selectedIndex: string) => void;
// 属性props
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
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

const Menu: React.FC<MenuProps> = (props) => {
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
      const childrenElement = child as FunctionComponentElement<MenuItemProps>
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

export default Menu
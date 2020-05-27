import React, { useState, createContext } from 'react'
import classNames from 'classnames'

// 字符串字面量
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback =  (selectedIndex: number) => void;
// 属性props
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;   // 触发的回调，是函数类型
}

// createContext => 父组件值到子组件props
interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

// 父组件传子组件
export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('turing-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        { children }
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
  // mode: 'vertical',
}

export default Menu
import React, { useState, useRef, FunctionComponentElement, useContext } from 'react'
import classNames from 'classnames'
// import { CSSTransition } from 'react-transition-group'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useClickSide from '../../hooks/useClickSide'
export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, children, title, className } = props
  const context = useContext(MenuContext)  // 拿到子组件的值
  const openSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState(isOpend)
  const componentRef = useRef(null)
  useClickSide(componentRef, () => {setMenuOpen(false)})
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('turing-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('Warning: subMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-bottom">
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents} ref={componentRef}>
      <div className="submenu-title" {...clickEvents}>{ title }<Icon icon="angle-down" className="arrow-icon"/></div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
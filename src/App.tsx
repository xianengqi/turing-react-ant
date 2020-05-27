import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex='0' onSelect={(e) => {console.log(e, 'click');}} mode="vertical" defaultOpenSubMenus={['2']}>
          <MenuItem>cool link1</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3</MenuItem>
          </SubMenu>
          <MenuItem >cool link3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;

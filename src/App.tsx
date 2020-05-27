import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'


const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(e) => {console.log(e, 'click');}}>
          <MenuItem index={0}>cool link1</MenuItem>
          <MenuItem index={1} disabled>cool link2</MenuItem>
          <MenuItem index={2}>cool link3</MenuItem>
        </Menu>
        <Button disabled>Hello</Button>
        <Button onClick={(e) => {e.preventDefault(); alert(124)}}>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Hello</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small} href="#">Hello</Button>
      </header>
    </div>
  );
}

export default App;

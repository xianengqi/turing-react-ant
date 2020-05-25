import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/Button'

const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
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

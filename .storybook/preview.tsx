import { addDecorator } from '@storybook/react';
// import { withInfo } from '@storybook/addon-info';
import React from 'react'
import '../src/styles/index.scss'
import "./fix_info_style.scss"

// addDecorator(withInfo);


const styles: React.CSSProperties = {
  textAlign: 'center'
}

const CenterDecorator = (storyFn: any) => <div style={styles}>{ storyFn()  }</div>
// addDecorator(CenterDecorator)
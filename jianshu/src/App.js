import React from 'react';
import Header from './common/header/header'
import { GlobalStyle } from './style'
import { Provider } from 'react-redux'

import store from './redux/store'


function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
      </React.Fragment>
    </Provider>  
  );
}

export default App;

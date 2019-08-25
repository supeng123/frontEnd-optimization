import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import store from './redux/store'
import { GlobalStyle } from './style'
import Header from './common/header/header'
import Home from './pages/home/home'
import Detail from './pages/detail/detail'


function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
        <BrowserRouter>
          <React.Fragment>
            <Route path='/' exact component={Home}></Route>
            <Route path='/detail' exact component={Detail}></Route>
          </React.Fragment>
        </BrowserRouter>
        
      </React.Fragment>
    </Provider>  
  );
}

export default App;

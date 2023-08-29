import React from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { Provider } from 'react-redux';
// import store from './redux/store';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import store from './rudux/store';

function App() {
  return (
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route  path="/" element={<CountryList/>} />
          <Route path="/country/:cid/:cname" element={<CountryDetails/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
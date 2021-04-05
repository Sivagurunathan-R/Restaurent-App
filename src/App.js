import './App.css';
import Home from './pages/Home'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Restaurent from './pages/Restaurent';
import ScrollToTop from './pages/ScrollToTop';
import SearchRestaurent from './pages/SearchRestaurent';

function App() {


  return (
   <>
      <Router>
      <ScrollToTop/>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/restaurents/:name" children={<Restaurent/>}></Route>
          <Route path="/search/:name/:zipcode" children={<SearchRestaurent/>}></Route>
        </Switch>
      </Router>
   </>
  );
}

export default App;

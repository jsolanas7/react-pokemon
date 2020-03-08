import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import './styles/App.css';
import Header from './components/Header/Header';

const Home = lazy(() => import('./pages/Home/Home'));
const PokedexPage = lazy(() => import('./pages/PokedexPage/PokedexPage'));
const PokefavsPage = lazy(() => import('./pages/PokefavsPage/PokefavsPage'));

const App = () => (
  <React.Fragment>
  <Router>
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/pokedex" component={PokedexPage}/>
        <Route exact path="/pokefavs" component={PokefavsPage}/>
      </Switch>
    </Suspense>
  </Router>
  </React.Fragment>
);

export default App;

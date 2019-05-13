import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import NotFound from './components/notFound/NotFound';
import Detail from './components/detail/Detail';
import './index.css';

class App extends React.Component {
  render() {
    return (
        <HashRouter basename='/'>
            <div className="mainWrapper">
                <Switch>
                    <Route path='/' component={Search} exact/>
                    <Route path='/day/:id' component={Detail} exact/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </HashRouter>
    )
  }
}

export default App;
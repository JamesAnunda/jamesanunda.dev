
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { about } from './pages/about';
import { contact } from './pages/contact';
import { error404 } from './pages/error404';
import { AppLayout } from './components/appLayout';
import { NavHeader } from './components/navHeader';

//Vendor
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavHeader />
            <AppLayout />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={about} />
                <Route path="/contact" component={contact} />
                <Route component={error404} />
              </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './templates/index';
import Login from './templates/login';
import Sigout from './templates/sigout';
import Resigter from './templates/resigter';
import Addpost from './templates/post';
import Discusion from './templates/discusion';
import Edit from './templates/edit';
import { SnackbarProvider } from 'notistack';
import ShowType from './templates/showtype';
import Search from './templates/search';
import Chat from './templates/chat';
import Headers from './templates/Headers';
import Footer from './templates/Footer';


import Test from './templates/Test';
function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/resigter">
            <Resigter />
          </Route>
          <Route path="/sigout">
            <Sigout />
          </Route>
          <Route path="/addpost">
            <Headers />
            <Addpost />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/test">
            <Test/>
          </Route>
          <Route path="/search/:value" children={<Search />}>
          </Route>
          <Route path="/discusion/:id" children={<Discusion />}>
          </Route>
          <Route path="/showbyid/:id" children={<ShowType />}>
          </Route>
          <Route path="/edit/:id" children={<Edit />}>
          </Route>
          <Route path="/">
            <Headers />
            <Index />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
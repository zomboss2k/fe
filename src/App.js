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
import InfoUser from './templates/infouser';
import Footer from './templates/Footer';
import Admin from './templates/admin/Admin';



function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Switch>
        <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/login">
            <Headers />
            <Login />
          </Route>
          <Route path="/resigter">
            <Headers />
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
          <Route path="/infouser/:value"children={<InfoUser/>}/>
          <Route path="/search/:value" children={<Search />} />
          <Route path="/discusion/:id" children={<Discusion />} />
          <Route path="/showbyid/:id" children={<ShowType />} />
          <Route path="/edit/:id" children={<Edit />} />
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
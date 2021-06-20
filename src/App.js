import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Index from './templates/index';
import Login from './templates/login';
import Sigout from './templates/sigout';
import Resigter from './templates/resigter';
import Addpost from './templates/post';
import Discusion from './templates/discusion';
import {SnackbarProvider} from 'notistack';
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
         <Addpost />
       </Route>
       <Route path="/discusion">
         <Discusion />
       </Route>
       <Route path="/">
         <Index />
         </Route>
     </Switch>
   </Router>
   </SnackbarProvider>
  );
}

export default App;

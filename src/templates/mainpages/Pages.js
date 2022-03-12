import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login';
import Sigout from './sigout';
import Resigter from './resigter';
import Addpost from './post';
import Discusion from '.discusion';
import Edit from '.edit';
import ShowType from './showtype';
import Search from './search';
import Chat from '.chat';
import Index from './index';
import { SnackbarProvider } from 'notistack';


function Pages() {


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
                    <Route path="/chat">
                        <Chat />
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
                        <Index />
                    </Route>
                </Switch>
            </Router>
        </SnackbarProvider>
    )
}

export default Pages
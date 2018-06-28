// import libs
import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import ScrollTopOnRoute from '../utils/ScrollTopOnRoute';
import {connect} from 'react-redux';


// import components
import routes from './routes'
import Layout from '../layout'

const history = createBrowserHistory();
const Routes = (props) => (

    <BrowserRouter hisotry={history}>

        <ScrollTopOnRoute>
            <Layout>
                <Switch>
                    {routes.map((route, i) => {
                        if (route.auth && !props.isAuthenticated) {
                            return <Redirect key={i} to={{
                                pathname: '/login',
                                state: {from: props.location},
                            }}/>
                        }
                        return <Route key={i} {...route} />

                    })}
                </Switch>
            </Layout>
        </ScrollTopOnRoute>
    </BrowserRouter>
)


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};
export default connect(mapStateToProps)(Routes)


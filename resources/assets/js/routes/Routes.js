// import libsimport React from 'react';import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';import createBrowserHistory from 'history/createBrowserHistory';import {connect} from 'react-redux';// import componentsimport Layout from '../components/layout/Layout'import ScrollTopOnRoute from '../utils/ScrollTopOnRoute'import webRoutes from "../containers/web/articles/routes"import authRoutes from "../containers/auth/routes"import userRoutes from "../containers/user/routes"import articleRoutes from "../containers/admin/article/routes"const history = createBrowserHistory();const routes = [...webRoutes, ...authRoutes, ...userRoutes, ...articleRoutes]const Routes = (props) => (    <BrowserRouter hisotry={history}>        <ScrollTopOnRoute>            <Layout>                <Switch>                    {routes.map((route, i) => {                        if (route.auth && !props.isAuthenticated) {                            return <Redirect key={i} to={{                                pathname: '/login',                                state: {from: props.location},                            }}/>                        }                        return <Route key={i} {...route} />                    })}                </Switch>            </Layout>        </ScrollTopOnRoute>    </BrowserRouter>)const mapStateToProps = state => {    return {        isAuthenticated: state.auth.isAuthenticated,    };};export default connect(mapStateToProps)(Routes)
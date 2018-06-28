//import libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Notifications from 'react-notify-toast';
// import services actions
import {fetchUser} from '../modules/auth/service';

// import components
import Navigation from '../common/navigation';
import ScrollTop from '../common/scroll-top';
import Footer from '../common/footer';

const containerStyle = {
    paddingTop: '3.5rem',
}
class Layout extends Component {

    componentWillMount() {
        const {isAuthenticated, user} = this.props;
        if (isAuthenticated && !user.id) {
            this.props.dispatch(fetchUser())
        }
    };

    render() {

        return <div style={containerStyle}>
            <Notifications/>
            <Navigation/>
            <main style={{minHeight: '100vh'}}>
                {this.props.children}
                <ScrollTop/>
            </main>
            <Footer/>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user,
    }
};
Layout.displayName = 'Layout';
Layout.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
};
export default withRouter(connect(mapStateToProps)(Layout));

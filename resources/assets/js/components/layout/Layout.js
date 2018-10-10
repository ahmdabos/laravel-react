//import libs
import React from 'react'
import PropTypes from 'prop-types'
import Notifications from 'react-notify-toast'

// import components
import Navigation from '../../components/navigation/Navigation'
import ScrollTop from '../../components/scroll-top/ScrollTop'
import Footer from '../../components/footer/Footer'

const Layout = (props) => {
    return <div className="container-fluid p-0">
        <div className="row">
            <div className="col">
                <Notifications/>
                <Navigation/>
                <main>
                    {props.children}
                    <ScrollTop/>
                </main>
                <Footer/>
            </div>
        </div>

    </div>
}


Layout.propTypes = {
    children: PropTypes.node.isRequired
}
export default Layout


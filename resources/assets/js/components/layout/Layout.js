//import libs
import React from 'react'
import PropTypes from 'prop-types'
import Notifications from 'react-notify-toast'

// import components
import Navigation from '../../components/navigation/Navigation'
import ScrollTop from '../../components/scroll-top/ScrollTop'
import Footer from '../../components/footer/Footer'

const containerStyle = {
    paddingTop: '3.5rem'
}

const Layout = (props) => {
    return <div style={containerStyle}>
        <Notifications/>
        <Navigation/>
        <main style={{minHeight: '100vh'}}>
            {props.children}
            <ScrollTop/>
        </main>
        <Footer/>
    </div>

}


Layout.propTypes = {
    children: PropTypes.node.isRequired
}
export default Layout


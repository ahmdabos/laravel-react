// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../containers/auth/service'
import {Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarToggler} from 'reactstrap'

// import components
import {Link} from 'react-router-dom'
import NavItem from './NavicationItem'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showNavigation: false,
            showDropdown: false,
        }

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.logout = this.logout.bind(this);
    }


    toggleNavbar() {
        this.setState({
            showNavigation: !this.state.showNavigation,
        });
    }

    toggleDropdown() {
        this.setState({
            showDropdown: !this.state.showDropdown,
        })
    }

    logout(e) {
        e.preventDefault()

        this.props.dispatch(logout())
    }

    render() {
        return (
            <Navbar className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
                <Link to="/" className="navbar-brand">Logo</Link>
                <NavbarToggler className="navbar-toggler d-lg-none" onClick={this.toggleNavbar}/>
                {
                    this.props.isAuthenticated
                        ? <Collapse className="navbar-collapse" isOpen={this.state.showNavigation}>
                        <ul className="navbar-nav mr-auto">
                            <NavItem path="/">Home</NavItem>
                            <NavItem path="/articles">Articles</NavItem>
                        </ul>

                        <ul className="navbar-nav">
                            <Dropdown isOpen={this.state.showDropdown} toggle={this.toggleDropdown}>
                                <DropdownToggle nav caret>
                                    { this.props.user.name }
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-right">
                                    <Link className='dropdown-item' to={`/users/${this.props.user.id}/edit`}>
                                        <span className="fa fa-user-o" title="logout" aria-hidden="true"/> Profile
                                    </Link>
                                    <DropdownItem divider/>
                                    <DropdownItem onClick={e => this.logout(e)}>
                                        <span className="fa fa-sign-out" title="logout" aria-hidden="true"/> Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </ul>
                    </Collapse>
                        : <Collapse className="navbar-collapse navbar-dark" isOpen={this.showNavigation}>
                        <ul className="navbar-nav mr-auto">
                            <NavItem path="/">Home</NavItem>
                        </ul>
                        <ul className="navbar-nav">
                            <NavItem path="/login">Login</NavItem>
                            <NavItem path="/register">Register</NavItem>
                        </ul>
                    </Collapse>
                }
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user
    }
}

Navigation.displayName = 'Navigation'
Navigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
}
export default connect(mapStateToProps)(Navigation)

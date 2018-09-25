// import libs
import {connect} from 'react-redux'

// import components
// import libs
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Redirect} from 'react-router-dom'
import {login} from '../service'
import ReeValidate from 'ree-validate'
import {fetchUser} from '../../../containers/auth/service';

// import components
import Form from './Form'

// initialize component
class Login extends Component {

    constructor() {
        super()

        this.validator = new ReeValidate({
            email: 'required|email',
            password: 'required|min:6',
            remember: 'required'
        })

        // set the state of the app
        this.state = {
            credentials: {
                email: '',
                password: '',
                remember: false,
            },
            errors: this.validator.errors
        }

        // bind component with event handlers
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // event to handle input change
    handleChange(name, value) {
        this.validator.validate(name, value)
            .then(() => {
                this.setState(this.validator.errors)
            })
        this.setState({credentials: {...this.state.credentials, [name]: value}})
    }

    // event to handle form submit
    handleSubmit(e) {
        e.preventDefault()
        const {credentials} = this.state
        const {errors} = this.validator.errors

        this.validator.validateAll(credentials)
            .then((success) => {
                if (success) {
                    this.submit(credentials)
                } else {
                    this.setState({errors})
                }
            })
    }

    submit(credentials) {
        this.props.dispatch(login(credentials)).then(res => {
            this.props.dispatch(fetchUser())
        }).catch(({error, statusCode}) => {
            const {errors} = this.validator
            if (statusCode === 422) {
                _.forOwn(error, (message, field) => {
                    errors.add(field, message);
                });
            } else if (statusCode === 401) {
                errors.add('password', error);
            }

            this.setState({errors})
        })


    }

    // render component
    render() {
        // check if user is authenticated then redirect him to home page
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }
        const props = {
            email: this.state.credentials.email,
            password: this.state.credentials.password,
            remember: this.state.credentials.remember,
            errors: this.state.errors,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
        }

        return (<div className="container py-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="mx-auto">
                            <span className="anchor"/>
                            <div className="card has-shadow">
                                <div className="card-body">
                                    <Form {...props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        dispatch: PropTypes.func.isRequired,
    }
}

export default connect(mapStateToProps)(Login)

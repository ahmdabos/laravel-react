import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


const Form = (props) => (
    <form className="form" role="form" onSubmit={props.handleSubmit} noValidate>
        <h2 className="card-title">Please sign in</h2>
        <div className="form-group">
            <label htmlFor="email" className="sr-only">Email</label>
            <input type="text"
                   className={`form-control form-control-lg rounded-0 ${props.errors.has('email') && 'is-invalid'}`}
                   name="email"
                   id="email"
                   placeholder="Email address"
                   value={props.email || ''}
                   onChange={e => props.handleChange(e.target.name, e.target.value)}
                   required
                   autoFocus/>
            {props.errors.has('email') && <div className="invalid-feedback">{props.errors.first('email')}</div>}
        </div>
        <div className="form-group">
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password"
                   className={`form-control form-control-lg rounded-0 ${props.errors.has('password') && 'is-invalid'}`}
                   id="password"
                   name="password"
                   placeholder="Password"
                   value={props.password || ''}
                   onChange={e => props.handleChange(e.target.name, e.target.value)}
                   required/>
            {props.errors.has('password') && <div className="invalid-feedback">{props.errors.first('password')}</div>}
        </div>
        <div>
            <label className="custom-control custom-checkbox">
                <input type="checkbox"
                       name="remember"
                       onChange={e => props.handleChange(e.target.name, !props.remember)}/>
                <span className="custom-control-indicator"/>
                <span className="custom-control-description small">Remember me on this computer</span>
            </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block"
                type="submit"
                disabled={props.errors.any()}>Sign In
        </button>
        <p>Not a member? <Link to='/register'>Signup here</Link></p>
    </form>
)

Form.displayName = 'LoginForm'
Form.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    remember: PropTypes.bool,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
}

export default Form

import {connect} from 'react-redux'

// import libs
import React, {Component} from 'react'
import _ from 'lodash'
import {articleAddRequest} from '../service'
import ReeValidate from 'ree-validate'

// import components
import Form from './Form'

class Add extends Component {
    constructor() {
        super()
        this.validator = new ReeValidate({
            title: 'required|min:3',
            content: 'required|min:10',
            description: 'required|min:10',
        })


        this.state = {
            article: {},
            errors: this.validator.errors
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(name, value) {
        this.setState({article: {...this.state.article, [name]: value}});
        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors})
            })

    }

    handleSubmit(e) {
        e.preventDefault()
        const article = this.state.article
        const {errors} = this.validator

        this.validator.validateAll(article)
            .then((success) => {
                if (success) {
                    this.submit(article)
                } else {
                    this.setState({errors})
                }
            })
    }

    submit(article) {
        this.props.dispatch(articleAddRequest(article))
            .catch(({error, statusCode}) => {
                const {errors} = this.validator

                if (statusCode === 422) {
                    _.forOwn(error, (message, field) => {
                        errors.add(field, message);
                    });
                }

                this.setState({errors})
            })
    }

    render() {
        return <div className="col-sm-12 col-md-12">
            <h1>Add</h1>
            <Form {...this.state}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}/>
        </div>
    }
}


const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps)(Add)

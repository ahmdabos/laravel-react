import {connect} from 'react-redux'
import ArticleModule from '../ArticleModule'

// import components
// import libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {articleFetchRequest} from '../service';
import {APP_TITLE} from '../../../../utils/Values';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    componentWillMount() {
        this.loadArticle()
    }

    loadArticle() {
        const {match, article, dispatch} = this.props;
        if (!article.slug) {
            dispatch(articleFetchRequest(match.params.slug))
        }
    }

    renderPublishedDate() {
        const {publishedAt} = this.props.article;
        if (publishedAt) {
            return `at ${publishedAt.format('MMMM d, YYYY')}`
        }
    }

    renderAuthor() {
        const {user} = this.props.article;

        if (user) {
            return `by ${user.name}`
        }

    }

    createMarkup() {
        return {__html: this.props.article.content};
    }

    renderArticle() {

        const {article} = this.props
        return (<div className="col-12 col-sm-9 mb-5 mx-auto">
            <h2>{article.title}</h2>
            <small className="text-muted mb-5">{this.renderPublishedDate()} {this.renderAuthor()}</small>
            <p className="text-muted mb-5">{article.description}</p>
            <div dangerouslySetInnerHTML={this.createMarkup()}/>
        </div>)
    }

    render() {
        return (
            <DocumentTitle title={`${this.props.article.title} - ${APP_TITLE}`}>
                <section id="components-articles">
                    <div className="container">
                        <div className="row">
                            {this.renderArticle()}
                        </div>
                    </div>
                </section>
            </DocumentTitle>
        )
    }
}


const mapStateToProps = (state, router) => {
    console.log(state);
    const {params} = router.match

    const article = state.web.data.slug === params.slug ? state.web.data : null

    return {
        article: article ? new ArticleModule(article) : new ArticleModule({})
    }
}
Article.propTypes = {
    match: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(Article)

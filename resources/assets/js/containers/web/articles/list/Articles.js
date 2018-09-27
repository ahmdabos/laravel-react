//libs
import {connect} from 'react-redux';
import ArticleModule from '../ArticleModule';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ArticleRow from './ArticleRow';

//services
import {articleListRequest} from "../service"

class Articles extends Component {
    componentWillMount() {
        this.props.dispatch(articleListRequest({url: '/articles/published'}))
    }

    renderArticles() {
        let articles = null;
        if (this.props.articles) {
            articles = this.props.articles.map((article, index) => {
                return <ArticleRow key={`article-${index}`}
                                   index={index}
                                   article={article}/>
            })
        }
        else {
            articles = <p>No articles yet!</p>;
        }
        return articles
    }

    render() {

        return <section id="components-articles">
            <div className="container">
                <div className="row">
                    { this.renderArticles() }
                </div>
            </div>
        </section>
    }

}


const mapStateToProps = state => {
    const {data} = state.articles;
    return {
        articles: data.map((article) => new ArticleModule(article))

    }
}

Articles.propTypes = {
    index: PropTypes.number,
    article: PropTypes.object,
};

export default connect(mapStateToProps)(Articles);

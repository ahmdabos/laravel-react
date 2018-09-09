// libs
import {connect} from 'react-redux';
import ArticleModule from '../../../admin/article/Article';
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Article from './Article';
// import services
import {articleListRequest} from "../../../admin/article/service"
class Articles extends Component {
    renderArticles = () => {
        return this.props.articles.map((article, index) => {
            return <Article key={`article-${index}`}
                            index={index}
                            article={article}/>
        })
    };
    componentDidMount() {
        this.props.dispatch(articleListRequest({url: '/articles/published'}))
    }
    render(){
        return <section id="components-articles">
            <div className="container">
                <div className="row">
                    { this.props.articles && this.renderArticles() }
                </div>
            </div>
        </section>
    }

}

Articles.ropTypes = {
    index: PropTypes.number.isRequired,
    article: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    const {data, ...meta} = state.articles;

    return {
        articles: data.map((article) => new ArticleModule(article)),
        meta: Object.assign({}, meta)
    }
}

export default connect(mapStateToProps)(Articles);

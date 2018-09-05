import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Article from '../../../../common/articles/listing/components/Article';
// import services
import {articleListRequest} from "../../../../modules/article/service"
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

export default Articles;

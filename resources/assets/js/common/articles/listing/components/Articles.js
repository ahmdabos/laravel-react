import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';
const Articles = (props) => {
    const renderArticles = () => {
        return props.articles.map((article, index) => {
            return <Article key={`article-${index}`}
                            index={index}
                            article={article}/>
        })
    };
    return <section id="components-articles">
        <div className="container">
            <div className="row">
                { props.articles && renderArticles() }
            </div>
        </div>
    </section>
}

Articles.ropTypes = {
    index: PropTypes.number.isRequired,
    article: PropTypes.object.isRequired,
};

export default Articles;

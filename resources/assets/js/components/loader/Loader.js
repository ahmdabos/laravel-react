import React from 'react';
import PropTypes from 'prop-types';

const LoadingComponent = (props) => {

    if (props.error) {
        return <div>Sorry, there was a problem loading the page. <button onClick={props.retry}>Retry</button></div>
    } else if (props.timedOut) {
        return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }


};

// validate component properties
LoadingComponent.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.object,
};

export default LoadingComponent

import React from 'react';
import PropTypes from 'prop-types';

const LoadingComponent = (props) => {
    // Handle the loading state
    if (props.isLoading) {
        return <div>Loading...</div>
    }
    // Handle the error state
    else if (props.error) {
        return <div>Sorry, there was a problem loading the page.</div>
    }
    else {
        return null;
    }
};

// validate component properties
LoadingComponent.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.object,

};

export default LoadingComponent
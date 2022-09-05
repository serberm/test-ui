import React from 'react';

const ErrorScreen = ({ error }) => {
    if (error) {
        return (
            <div className={'error-screen'}>
                <div className={'error-message'}>
                    There was an issue accessing the site. Please reload the page.
                </div>
            </div>
        );
    } else {
        return (<></>);
    }
};

export default ErrorScreen;

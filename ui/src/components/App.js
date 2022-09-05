import React from 'react';
import { withRouter } from 'react-router';
import Header from '../containers/Header';
import Body from '../containers/Body';
import ErrorScreen from '../containers/ErrorScreen';

const App = withRouter(({ history }) => {
    return (
        <div>
            <div className={'header-container'}>
                <Header/>
            </div>

            <div className={'app-body'}>
                <div className={'container-xl'}>
                    <Body />
                </div>
            </div>

            <ErrorScreen />
        </div>
    );
});

export default App;

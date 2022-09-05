import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Iterable } from 'immutable';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchAppConfig } from './actions';
import { isDev } from './utils/helpers';
import rootReducer from './reducers';
import App from './containers/App';
import './styles/index.css';
import './polyfills';

const loggerMiddleware = createLogger({
    stateTransformer: (state) => {
        const newState = {};
        const stateObj = state.toObject();

        for (const i of Object.keys(stateObj)) {
            if (Iterable.isIterable(stateObj[i])) {
                newState[i] = stateObj[i].toJS();
            } else {
                newState[i] = stateObj[i];
            }
        }

        return newState;
    },
    collapsed: true
});

const store = createStore(rootReducer, applyMiddleware(...[
    thunk,
    isDev() && loggerMiddleware
].filter(Boolean)));

store.dispatch(fetchAppConfig());

render(
    <Provider store={store}>
        <Router>
            <Route path={'/'} component={App} />
        </Router>
    </Provider>,
    document.getElementById('app')
);

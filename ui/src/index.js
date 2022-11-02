import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Iterable } from 'immutable';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
    collapsed: true,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...[thunk, isDev() && loggerMiddleware].filter(Boolean))
    )
);

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_ROOT,
    cache: new InMemoryCache(),
});

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#4d7cfe',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#6c757d',
        },
        background: {
            paper: '#29354c',
            'default': '#223145',
        },
        text: {
            primary: '#e8e8e8'
        },
    },
});

render(
    <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router>
                    <Route path={'/'} component={App} />
                </Router>
            </Provider>
        </ApolloProvider>
    </ThemeProvider>,
    document.getElementById('app')
);

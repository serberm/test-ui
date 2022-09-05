import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AgreementList from '../pages/agreements/containers/AgreementList';
import * as ROUTES from '../routes.const';
import { AgreementView } from '../pages/agreements/components/AgreementView';
import { Redirect } from 'react-router';

const Body = ({ isReady }) => {
    if (isReady) {
        return (
            <Switch>
                <Route exact path={ROUTES.AGREEMENT_ROUTE} component={AgreementList}/>
                <Route path={ROUTES.AGREEMENT_VIEW_ROUTE_FACTORY()} component={AgreementView}/>
                <Route path='*'>
                    <Redirect to={ROUTES.AGREEMENT_ROUTE} />
                </Route>

            </Switch>
        );
    } else {
        return (<></>);
    }
};

export default Body;

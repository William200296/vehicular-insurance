import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// views
import Home from './home';
import StepsSVT from './steps';
import ThanksCongrats from './thanks-congrats';

const RouterOutlet = () => {
    return (
        <Fragment>

            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/seguro-vehicular" component={StepsSVT} />
                    <Route exact path="/proceso-exitoso" component={ThanksCongrats} />
                    <Route path="*" component={Home} />
                </Switch>
            </Router>

        </Fragment>
    )
}

export default RouterOutlet;
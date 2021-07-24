import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, useRouteMatch, Route, Link, withRouter } from 'react-router-dom';
import backButton from '../../assets/icon_back.svg';
import backButtonAlt from '../../assets/icon_back_alt.svg';

// VIEWS
import CarData from './car-data';
import YourPlan from './your-plan';

const StepsSVT = () => {

    let { path } = useRouteMatch();
    const currentStep = useSelector(store => store.storedData.currentStep);

    return (
        <Fragment>

            <div className="container-router-steps">

                <div className="container-steps">
                    <div className={currentStep === 1 ? 'box-number-step active' : 'box-number-step'}>
                        <div className="box-visual-step">
                            <span className="step-number-circular">1</span>
                            <span className="step-dotted-line"></span>
                        </div>
                        <p>Datos del auto</p>
                    </div>
                    <div className={currentStep === 2 ? 'box-number-step active' : 'box-number-step'}>
                        <div className="box-visual-step">
                            <span className="step-number-circular">2</span>
                        </div>
                        <p>Arma tu plan</p>
                    </div>
                </div>

                <div className="container-outlet-steps">

                    <div className="back-navigator-home">

                        <Link to="/" className="go-back back-desktop">
                            <img src={backButton} alt="Volver atrás" />
                            VOLVER
                        </Link>

                        <div className="go-back back-mobile">
                            <Link to="/">
                                <img src={backButtonAlt} alt="Volver atrás" />
                            </Link>
                            <div className="step-line">
                                <span>Paso {currentStep} de 2</span>
                                <div className={currentStep === 1 ? 'step-progress-line' : 'step-progress-line finished'}></div>
                            </div>
                        </div>

                    </div>

                    <Switch>
                        <Route exact path={`${path}/datos-del-auto`}>
                            <CarData />
                        </Route>
                        <Route exact path={`${path}/arma-tu-plan`}>
                            <YourPlan />
                        </Route>
                    </Switch>

                </div>
            </div>

        </Fragment>
    )
}

export default withRouter(StepsSVT);
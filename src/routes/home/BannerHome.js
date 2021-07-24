import { Fragment } from "react";
import imagePersonCar from '../../assets/vi-person.svg';
import imagePersonCarMobile from '../../assets/vi-person-mobile.svg';

const BannerHome = () => {

    return (
        <Fragment>
            <div className="rvi-background-flyer">

                <div className="container-insurance-banner">

                    <img className="image-home-person" src={imagePersonCar} alt="Persona saltando de alegría" />

                    <img className="image-mobile-person" src={imagePersonCarMobile} alt="Persona saltando de alegría" />

                    <p className="txt-home-new">
                        ¡NUEVO!
                    </p>
                    <h2 className="txt-home-title">
                        Seguro <span className="txt-marked">Vehicular Tracking</span>
                    </h2>
                    <p className="txt-home-subtitle">
                        Cuentanos donde le haras seguimiento a tu seguro
                    </p>
                </div>

                <p className="txt-rimac-copyright">
                    © 2020 RIMAC Seguros y Reaseguros.
                </p>

            </div>
        </Fragment>
    )
}

export default BannerHome;
import { Container } from '@material-ui/core';
import React from 'react';
import LogoRIMAC from '../assets/Logo-RIMAC.svg';
import iconPhone from '../assets/icon_phone.svg';
import { useSelector } from 'react-redux';

const Header = () => {

    const navStyles = useSelector(store => store.storedData.navStyles);

    return (
        <nav className={navStyles ? 'rimac-navigator on-step' : 'rimac-navigator'} id="RimacHeader">
            <Container fixed>
                <div className="navigation-container">

                    <a href="/">
                        <img src={LogoRIMAC} alt="Logotipo RIMAC Seguros" />
                    </a>

                    <ul className="navigation-contact-item">
                        <li className="contact-text">
                            ¿Tienes alguna duda?
                        </li>

                        <li className="contact-phone show-desktop">
                            <img src={iconPhone} alt="Phone Icon" />
                            (01) 411 6001
                        </li>

                        <li className="contact-phone show-mobile">
                            <img src={iconPhone} alt="Phone Icon" />
                            Llámanos
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>
    );
}

export default Header;
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImgIllustration from '../../assets/success-illustration.svg';
import { updateNavStyles } from '../../redux/reducers/UserReducer.reducer';

const ThanksCongrats = () => {
	
	const history = useHistory();
	const dispatch = useDispatch();
	const userData = useSelector(store => store.storedData.userData);
	const storedUser = useSelector(store => store.storedData.storedUser);
	const nav = useSelector(store => store.storedData.navStyles);
	const [navStyles, setNavStyles] = useState(nav);

	useEffect(() => {
		if (!storedUser) {
			history.push('/');
		}
	}, [history, storedUser]);

	useEffect(() => {
		setNavStyles(true);
		dispatch(updateNavStyles(navStyles));
	}, [dispatch, navStyles]);

	return (
		<Fragment>
			<div className="rvi-home rvi-home-success">
				<div className="rvi-banner-lighter">
					<img src={ImgIllustration} alt="Illustration" />
				</div>
				<div className="rvi-welcome-banner">
					<div className="rvi-center-welcome">

						<h1>
							<span>¡Te damos la bienvenida!</span>
							<br />
							Cuenta con nosotros para proteger tu vehículo
						</h1>

						<p>
							Enviaremos la confirmación de compra de tu Plan Vehícular Tracking a tu correo:
							<br />
							<span>{userData.email}</span>
						</p>

						<button type="button" className="btn-submit-form">
							cómo usar mi seguro
						</button>

					</div>

				</div>
			</div>
			<p className="rimac-footer">© 2020 RIMAC Seguros y Reaseguros.</p>
		</Fragment>
	)
}

export default ThanksCongrats;
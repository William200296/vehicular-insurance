import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerHome from './BannerHome';
import axios from 'axios';
import { useHistory, withRouter } from 'react-router-dom';
import { getUserDataReq, saveUserData, updateNavStyles, updateStoredUser } from '../../redux/reducers/UserReducer.reducer';
import { useForm } from 'react-hook-form';

const Home = () => {

	const history = useHistory();
	const dispatch = useDispatch();
	const userDataRequest = useSelector(store => store.storedData.userDataRequest);
	const BASE_URL = useSelector(store => store.storedData.BASE_URL);
	const [homeFormValue, setHomeFormValue] = useState(userDataRequest);
	const [docNumLength, setDocNumLength] = useState(8);
	const [disable, setDisable] = useState(false);
	const nav = useSelector(store => store.storedData.navStyles);
	const [navStyles, setNavStyles] = useState(nav);

	const sU = useSelector(store => store.storedData.storedUser);
	const [storedUSer, setStoredUSer] = useState(sU);

	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (dataForm) => {
		validateVehicularInsurance(dataForm);
	}

	useEffect(() => {
		setNavStyles(false);
		dispatch(updateNavStyles(navStyles));
	}, [dispatch, navStyles]);

	useEffect(() => {
		setStoredUSer(false);
		dispatch(updateStoredUser(storedUSer));
	}, [dispatch, storedUSer]);

	function handleChange(e) {

		const val = e.target.value;
		const id = e.target.id;
		setHomeFormValue({ ...homeFormValue, [id]: val });

		if (id === 'documentType') {
			if (val === 'DNI') {
				setDocNumLength(8);
			} else if (val === 'CE') {
				setDocNumLength(12);
			}
			document.getElementById('documentNumber').value = '';
			setHomeFormValue({ ...homeFormValue, documentNumber: '' });
		}
	}

	function handleClickCheckbox(e) {

		document.getElementById('privacyPolicies').click();
		e.target.classList.toggle('selected');
		let status;

		if (e.target.classList.contains('selected')) {
			status = true;
		} else {
			status = false;
		}

		setHomeFormValue({ ...homeFormValue, privacyPolicies: status });

	}

	function validateVehicularInsurance(homeFormValue) {

		setDisable(true);
		dispatch(getUserDataReq(homeFormValue));

		getUserAPI(homeFormValue.documentNumber).then((response) => {

			if (response.status === 200) {
				response.data.phone = homeFormValue.phoneNumber;
				console.log('RESPONSE:', response.data);
				dispatch(saveUserData(response.data));
				history.push('/seguro-vehicular/datos-del-auto');
			}

		}).catch((e) => {
			console.log('ERROR: ', e);
			setDisable(false);
		});
	}

	async function getUserAPI(document) {
		try {

			const documentArr = document.split('');
			let id = documentArr[documentArr.length - 1];
			if (id < 1) { id = 10; }
			const res = await axios.get(`${BASE_URL}users/${id}`);
			return res;

		} catch (e) {
			throw e;
		}
	}

	return (
		<Fragment>

			<div className="rvi-home">

				<BannerHome />

				<div className="rvi-form-container">

					<h1 className="txt-give-data">Déjanos tus datos</h1>

					<form className="form-license-plate" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
						<div className="d-flex">

							<select
								className="txt-form-field w-1-3 select-right-unbordered"
								name="documentType"
								id="documentType"
								onChange={(e) => { handleChange(e) }}
								{...register("documentType", { required: true })}
							>
								<option value={'DNI'}>DNI</option>
								<option value={'CE'}>CE</option>
							</select>

							<input
								className="txt-form-field w-2-3 select-left-unbordered"
								type="text"
								name="documentNumber"
								id="documentNumber"
								placeholder="Nro. de doc"
								minLength={docNumLength}
								maxLength={docNumLength}
								onChange={(e) => { handleChange(e) }}
								{...register("documentNumber", { pattern: /^[0-9\b]+$/, required: true, maxLength: docNumLength, minLength: docNumLength })}
							/>

						</div>

						{errors.documentNumber?.type === 'required' && <p className="error-detail">El N° de documento es obligatorio.</p>}
						{errors.documentNumber?.type === 'pattern' && <p className="error-detail">Sólo carácteres numéricos.</p>}
						{errors.documentNumber?.type === 'minLength' && <p className="error-detail">Mínimo {docNumLength} carácteres.</p>}
						{errors.documentNumber?.type === 'maxLength' && <p className="error-detail">Máximo {docNumLength} carácteres.</p>}

						<input
							className="txt-form-field w-full"
							type="text"
							name="phoneNumber"
							id="phoneNumber"
							placeholder="Celular"
							minLength={9}
							maxLength={9}
							onChange={(e) => { handleChange(e) }}
							{...register("phoneNumber", { pattern: /^[0-9\b]+$/, required: true, maxLength: 9, minLength: 9 })}
						/>

						{errors.phoneNumber?.type === 'required' && <p className="error-detail">El N° de celular es obligatorio.</p>}
						{errors.phoneNumber?.type === 'pattern' && <p className="error-detail">Sólo carácteres numéricos.</p>}
						{errors.phoneNumber?.type === 'minLength' && <p className="error-detail">Mínimo 9 carácteres.</p>}
						{errors.phoneNumber?.type === 'maxLength' && <p className="error-detail">Máximo 9 carácteres.</p>}

						<input
							className="txt-form-field w-full"
							type="text"
							name="licensePlate"
							id="licensePlate"
							placeholder="Placa"
							onChange={(e) => { handleChange(e) }}
							{...register("licensePlate", { required: true, minLength: 7, maxLength: 10 })}
						/>

						{errors.licensePlate?.type === 'required' && <p className="error-detail">El N° de Placa es obligatorio.</p>}
						{errors.licensePlate?.type === 'minLength' && <p className="error-detail">Mínimo 7 carácteres.</p>}
						{errors.licensePlate?.type === 'maxLength' && <p className="error-detail">Máximo 10 carácteres.</p>}

						<div className="container-privacy-policies">

							<span
								className="check-green"
								onClick={(e) => handleClickCheckbox(e)}
							></span>

							<p className="privacy-policy-txt">
								Acepto la Política de <a target="_blank" href="/">Protección de Datos Personales</a> y los <a target="_blank" href="/">Términos y Condiciones</a>.
							</p>

							<div style={{ visibility: 'hidden', minHeight: '0px', height: '0px' }}>
								<input type="checkbox" name="privacyPolicies" id="privacyPolicies" {...register("privacyPolicies", { required: true })} />
							</div>

						</div>

						{errors.privacyPolicies?.type === 'required' && <p className="error-detail">Aceptar las Políticas es obligatorio.</p>}

						<button
							disabled={disable}
							type="submit"
							className="btn-submit-form"
						>
							Cotízalo
						</button>

					</form>

				</div>
			</div>

		</Fragment>
	)
}
/*
const mapStateToProps = (state) => ({
	BASE_URL: state.BASE_URL,
	userDataRequest: state.userDataRequest
});

const mapDispatchToProps = (dispatch) => ({
	getUserDataReq(userDataRequest) {
		dispatch({
			type: 'GET_USER_DATA',
			userDataRequest
		});
	},
	saveUserData(userData) {
		dispatch({
			type: 'SAVE_USER_DATA',
			userData
		});
	}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));*/

export default withRouter(Home);

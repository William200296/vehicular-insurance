import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import ChevronRight from '../../../assets/icon_arrow_right.svg';
import IconCar from '../../../assets/icon_car.svg';
import { saveCarData, saveCurrentStep, updateNavStyles } from '../../../redux/reducers/UserReducer.reducer';
import { useForm } from 'react-hook-form';

const CarData = () => {

	const history = useHistory();
	const dispatch = useDispatch();
	const userData = useSelector(store => store.storedData.userData);
	const carDataRequest = useSelector(store => store.storedData.carDataRequest);
	const [carDataForm, setCarDataForm] = useState(carDataRequest);
	const step = useSelector(store => store.storedData.currentStep);
	const [currentStep, setCurrentStep] = useState(step);
	const storedUser = useSelector(store => store.storedData.storedUser);
	const nav = useSelector(store => store.storedData.navStyles);
	const [navStyles, setNavStyles] = useState(nav);

	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (dataForm) => {
		dataForm.carGas = carDataForm.carGas;
		console.log('DATA_FORM:', dataForm);
		saveStage(dataForm);
	}

	useEffect(() => {
		if (!storedUser) {
			history.push('/');
		}
		console.log(history);
	}, [storedUser]);

	useEffect(() => {
		setCurrentStep(1);
		dispatch(saveCurrentStep(currentStep));
	}, [currentStep]);

	useEffect(() => {
		setNavStyles(true);
		dispatch(updateNavStyles(navStyles));
	}, [navStyles]);

	function handleChange(e) {

		const val = e.target.value;
		const id = e.target.id;
		setCarDataForm({ ...carDataForm, [id]: val });

	}

	const toggleRadio = (e, value) => {

		const name = e.target.getAttribute('name');

		document.querySelectorAll(`span[name="${name}"]`).forEach((element) => {
			element.classList.remove('selected');
		});

		e.target.classList.toggle('selected');
		setCarDataForm({ ...carDataForm, carGas: value });
	}

	const updateInsuredAmount = (e, op) => {

		const insuredAmount = document.getElementById('insuredAmount');
		let insuredAmountValue = parseInt(insuredAmount.value, 10);

		if (op === '+') {
			if (insuredAmountValue < 16500) {
				insuredAmountValue = insuredAmountValue + 100;
			}
		} else if (op === '-') {
			if (insuredAmountValue > 12500) {
				insuredAmountValue = insuredAmountValue - 100;
			}
		}

		insuredAmount.value = insuredAmountValue.toString();
		const insAmoStr = insuredAmountValue.toString();
		const newStr = '$ ' + insAmoStr.slice(0, -3) + ',' + insAmoStr.slice(2);
		document.getElementById('txtAmountInsurante').innerHTML = newStr;
		setCarDataForm({ ...carDataForm, insuredAmount: insuredAmountValue });
	}

	function saveStage(carDataForm) {
		console.log('DATOS_VEHICULO:', carDataForm);
		dispatch(saveCarData(carDataForm));
		history.push('/seguro-vehicular/arma-tu-plan');
	}

	return (
		<div className="container-car-data">

			<h1 className="greeting-on-step">¡Hola, <span>{userData.name}!</span></h1>

			<p className="txt-complete-data">Completa los datos de tu auto</p>

			<form className="form-step1" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

				<div className="form-helper-container">

					<div className="form-selections-container">

						{errors.year?.type === 'required' && <p className="error-detail">El Año del vehículo es obligatorio.</p>}

						<div className="container-select-detail">
							<span>Año</span>
							<select
								className="txt-form-field w-full form-extended"
								name="year"
								id="year"
								onChange={(e) => { handleChange(e) }}
								defaultValue={carDataForm.year}
								{...register("year", { required: true })}
							>
								<option value={''}>Seleccione</option>
								<option value={2019}>2019</option>
								<option value={2020}>2020</option>
								<option value={2021}>2021</option>
							</select>
						</div>

						{errors.brand?.type === 'required' && <p className="error-detail">La Marca del vehículo es obligatoria.</p>}

						<div className="container-select-detail">
							<span>Marca</span>
							<select
								className="txt-form-field w-full form-extended"
								name="brand"
								id="brand"
								style={{ marginBottom: 0 }}
								onChange={(e) => { handleChange(e) }}
								defaultValue={carDataForm.brand}
								{...register("brand", { required: true })}
							>
								<option value={''}>Seleccione</option>
								<option value={'Wolkswagen'}>Wolkswagen</option>
								<option value={'TOYOTA'}>TOYOTA</option>
								<option value={'Hyundai'}>Hyundai</option>
							</select>
						</div>

					</div>

					<div className="helper-container">
						<h5>AYUDA</h5>
						<div className="helper-container-flexer">
							<div className="helper-container-model">
								<p>¿No encuentras el modelo ?</p>
								<Link to="/">
									clic aquí
								</Link>
							</div>
							<img src={IconCar} alt="Car" />
						</div>
					</div>

				</div>

				<div className="container-car-gas">
					<p>¿Tu auto es a gas?</p>
					<div className="container-gas-inputs">
						<div className="container-radio-green">
							<span
								name="gas"
								className="radio-green"
								onClick={(e) => { toggleRadio(e, true) }}
							></span> Sí
						</div>

						<div className="container-radio-green">
							<span
								name="gas"
								className="radio-green"
								onClick={(e) => { toggleRadio(e, false) }}
							></span> No
						</div>
					</div>
				</div>

				<div className="container-insurance-amount">

					<div className="container-amount">
						<h4>Indica la suma asegurada</h4>
						<p>MIN $12,500 <span>|</span> MAX $16,500</p>
					</div>

					<div className="amount-component">
						<button type="button" onClick={(e) => { updateInsuredAmount(e, '-') }}>-</button>
						<p id="txtAmountInsurante">
							{'$ ' + carDataForm.insuredAmount.toString().slice(0, -3) + ',' + carDataForm.insuredAmount.toString().slice(2)}
						</p>
						<button type="button" onClick={(e) => { updateInsuredAmount(e, '+') }}>+</button>
					</div>

				</div>

				<input style={{ visibility: 'hidden', minHeight: '0px', height: '0px' }} type="text" id="insuredAmount" name="insuredAmount" defaultValue={carDataForm.insuredAmount}  {...register("insuredAmount", { required: true })} />

				<button type="submit" className="btn-submit-form btn-chevron">
					Continuar <img src={ChevronRight} alt="Flecha derecha" />
				</button>

			</form>

		</div>
	)
}

export default withRouter(CarData);
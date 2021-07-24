import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Man from '../../../assets/man.svg';
import Secure from '../../../assets/secure.svg';
import ImgThieft from '../../../assets/icon_thieft.svg';
import ImgDamage from '../../../assets/icon_damage.svg';
import ImgTotalLost from '../../../assets/icon_perdidatotal.svg';
import ChevronDown from '../../../assets/chevron-down.svg';
import IconAdd from '../../../assets/icon_circle_add.svg';
import IconRemove from '../../../assets/icon_circle_remove.svg';
import { useDispatch, useSelector } from 'react-redux';
import { saveAmountData, saveCurrentStep, updateNavStyles } from '../../../redux/reducers/UserReducer.reducer';

const YourPlan = () => {

	const history = useHistory();
	const dispatch = useDispatch();
	const userDataRequest = useSelector(store => store.storedData.userDataRequest);
	const carDataRequest = useSelector(store => store.storedData.carDataRequest);
	const VIR = useSelector(store => store.storedData.vehicularInsuranceRequest);
	const [vir, setVIR] = useState(VIR);
	const step = useSelector(store => store.storedData.currentStep);
	const [currentStep, setCurrentStep] = useState(step);
	const storedUser = useSelector(store => store.storedData.storedUser);
	const nav = useSelector(store => store.storedData.navStyles);
	const [navStyles, setNavStyles] = useState(nav);

	useEffect(() => {
		if (!storedUser) {
			history.push('/');
		}
	}, [storedUser]);
	
	useEffect(() => {
		setCurrentStep(2);
		dispatch(saveCurrentStep(currentStep));
	}, [currentStep]);

	useEffect(() => {
		setNavStyles(true);
		dispatch(updateNavStyles(navStyles));
	}, [navStyles]);

	const list = [
		'Llanta de respuesto',
		'Analisis de motor',
		'Aros gratis'
	];

	let i = 0;

	const OpenTabPanel = (id, event) => {
		var j;
		var tabPanels = document.getElementsByClassName("tab-panel");
		for (j = 0; j < tabPanels.length; j++) {
			tabPanels[j].style.display = "none";
		}
		const tab = event.target;
		const containerTabs = tab.closest('.tab-header');
		containerTabs.querySelectorAll('button').forEach(button => {
			button.classList.remove('tab-active');
		});
		tab.classList.add('tab-active');
		document.getElementById(id).style.display = "block";
	}

	const secureCar = [
		{
			id: 0,
			src: ImgThieft,
			secureName: 'Llanta robada',
			secureDetail: 'He salido de casa a las cuatro menos cinco para ir a la academia de ingles de mi pueblo (Sant Cugat, al lado de Barcelona) con mi bici, na llego a la academia que está en el centro del pueblo en una plaza medio-grande y dejo donde siempre la bici atada con una pitón a un sitio de esos de poner las bicis y mucho más',
			securePrice: 15
		}, {
			id: 1,
			src: ImgDamage,
			secureName: 'Choque y/o pasarte la luz roja',
			secureDetail: 'He salido de casa a las cuatro menos cinco para ir a la academia de ingles de mi pueblo (Sant Cugat, al lado de Barcelona) con mi bici, na llego a la academia que está en el centro del pueblo en una plaza medio-grande y dejo donde siempre la bici atada con una pitón a un sitio de esos de poner las bicis y mucho más',
			securePrice: 20
		}, {
			id: 2,
			src: ImgTotalLost,
			secureName: 'Atropello en la vía Evitamiento',
			secureDetail: 'He salido de casa a las cuatro menos cinco para ir a la academia de ingles de mi pueblo (Sant Cugat, al lado de Barcelona) con mi bici, na llego a la academia que está en el centro del pueblo en una plaza medio-grande y dejo donde siempre la bici atada con una pitón a un sitio de esos de poner las bicis y mucho más',
			securePrice: 50
		}
	];

	const OpenDetailItem = (id, event) => {
		
		const chevron = event.target;
		chevron.classList.toggle('opened');
		
		const item = document.getElementById(id);
		item.classList.toggle('row-detail-opened');

	}

	function updateCost(targetButton, price, otherButton, op) {
		
		document.getElementById(targetButton).style.display = 'none';
		document.getElementById(otherButton).style.display = 'flex';
		let newAmount = 0;

		console.log('vir: ', vir);
		console.log('price: ', price);

		if (op === '+') {
			newAmount = parseInt(vir.amount, 10) + parseInt(price, 10);
		} else if (op === '-') {
			newAmount = parseInt(vir.amount, 10) - parseInt(price, 10);
		}

		console.log('NUEVO MONTO', newAmount);
		setVIR({ ...vir, amount: newAmount });
	}

	function finishRequest() {
		dispatch(saveAmountData(vir));
		history.push('/proceso-exitoso');
	}

	return (
		<div className="container-car-data bg-custom-onMobile">

			<div className="padding-custom-onMobile">
				<h1 className="greeting-on-step">Mira las coberturas</h1>
				<p className="txt-complete-data">Conoce las coberturas para tu plan</p>
			</div>

			<div className="form-helper-container">

				<div className="form-selections-container">

					<div className="padding-custom-onMobile">
						<div className="box-detail-car">
							<span>Placa: {userDataRequest.licensePlate}</span>
							<h2>{carDataRequest.brand + ' ' + carDataRequest.year} Golf</h2>
							<Link className="edit-vehicle" to="/seguro-vehicular/datos-del-auto">
								Editar
							</Link>
							<img src={Man} alt="Hombre" />
						</div>
					</div>

					<div className="container-aditional-options padding-custom-onMobile">

						<h3 className="title-tabs">Agrega o quita coberturas</h3>

						<div className="tab-container">

							<div className="tab-header">
								<button className="tab-active" type="button" onClick={(e) => OpenTabPanel('Tab1', e)}>
									Protege a tu auto
								</button>
								<button type="button" onClick={(e) => OpenTabPanel('Tab2', e)}>
									Protege a los que te rodean
								</button>
								<button type="button" onClick={(e) => OpenTabPanel('Tab3', e)}>
									Mejora tu plan
								</button>
							</div>

							<div id="Tab1" className="tab-panel">
								{
									secureCar.map((item) => {
										return (
											<div key={item.id} className="container-item-secure">

												<div className="row-item-options">
													
													<div className="box-img-options">
														<img src={item.src} alt="Visual detail for item secure" />
													</div>

													<div className="box-name-options">

														<h3>{item.secureName}</h3>

														<button
															id={`openItem${item.id}`}
															onClick={() => {updateCost(`openItem${item.id}`, item.securePrice, `closeItem${item.id}`, '+')}}
														>
															<img src={IconAdd} alt="Agregar item" />
															AGREGAR
														</button>

														<button
															id={`closeItem${item.id}`}
															style={{ display: 'none' }}
															onClick={() => {updateCost(`closeItem${item.id}`, item.securePrice, `openItem${item.id}`, '-')}}
														>
															<img src={IconRemove} alt="Quitar item" />
															QUITAR
														</button>

													</div>

													<div className="box-opener-options">
														<button
															onClick={(e) => {OpenDetailItem(`paragraphDetail${item.id}`, e)}}
														>
															<img className="rotate-chevron" src={ChevronDown} alt="Secure Item opener" />
														</button>
													</div>

												</div>

												<div
													className="row-item-detail"
													id={`paragraphDetail${item.id}`}
													>
													<p className="item-detail-box">
														{item.secureDetail}
													</p>
												</div>

											</div>
										)
									})
								}
							</div>

							<div id="Tab2" className="tab-panel" style={{ display: 'none' }}>
								<p>Para que protejas a los que quieres.</p>
							</div>

							<div id="Tab3" className="tab-panel" style={{ display: 'none' }}>
								<p>Para que mejores tu plan y obtengas más beneficios.</p>
							</div>

						</div>
					</div>

				</div>

				<div className="helper-container container-fixed-onMobile">

					<div className="container-secure">
						<div className="container-sec-amount">
							<h3>${(vir.amount).toFixed(2)}</h3>
							<p>mensuales</p>
						</div>
						<div className="container-sec-image hide-container-onMobile">
							<img src={Secure} alt="secure" />
						</div>
					</div>

					<div className="container-price hide-container-onMobile">
						<p>El precio incluye:</p>
						<ul>
							{list.map((item) => {
								i++;
								return (<li key={i}>
									{item}
								</li>)
							})}
						</ul>
					</div>

					<button type="button" className="btn-submit-form w-full" onClick={() => { finishRequest() }}>
						Lo quiero
					</button>

				</div>

			</div>

		</div>
	)
}

export default YourPlan;
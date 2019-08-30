import React, { Component, Fragment } from 'react';

import LogoCMM from './LogoCMM.jpg';
import CSS from './BadgesBuilder.css';

export default class BadgesBuilder extends Component {

	static personQualities = [
		"Exposant",
		"Organisateur",
		"Bénévole",
	];

	static personModel = {
		name:"",
		number:"",
		quality:0,
	}

	state = {
		salonLabel: "Salon des pierres, minéraux et fossiles",
		persons: [],
		inProgressPerson: BadgesBuilder.personModel,
		copyright: "Propriété du CMM",
	};

	deletePerson = (idx) => {
		const persons = this.state.persons;
		persons.splice(idx,1);

		this.setState({
			persons,
		})
	}

	addPerson = () => {
		let persons = this.state.persons;
		persons.push(this.state.inProgressPerson);

		this.setState({
			persons,
			inProgressPerson: Object.assign({},BadgesBuilder.personModel),
		})
	}

	onLabelChange = (e) => {
		this.setState({salonLabel:e.target.value})
	}

	onCopyrightChange = (e) => {
		this.setState({copyright:e.target.value})
	}

	onNameChange = (e) => {
		const inProgressPerson = Object.assign({},this.state.inProgressPerson);
		inProgressPerson.name = e.target.value;
		this.setState({inProgressPerson});
	}

	onNumberChange = (e) => {
		const inProgressPerson = Object.assign({},this.state.inProgressPerson);
		inProgressPerson.number = e.target.value;
		this.setState({inProgressPerson});
	}

	onQualityChange = (e) => {
		const inProgressPerson = Object.assign({},this.state.inProgressPerson);
		inProgressPerson.quality = e.target.value;
		this.setState({inProgressPerson});
	}

	render(){
		const {
			persons,
			salonLabel,
			copyright,
			inProgressPerson,
		} = this.state;

		const isPersonValid = inProgressPerson.name !== "";
		if(inProgressPerson.quality === 0) isPersonValid = isPersonValid && inProgressPerson.number !== "";

		return(
			<section className="generator-badges">
				<section className="generator-form">
					<div>
						<div className="row">
							<div className="column column-50">
						    <label htmlFor="salonLabel">Nom du salon</label>
						    <input type="text" placeholder="Nom du salon" id="salonLabel" value={salonLabel} onChange={this.onLabelChange} />
							</div>
							<div className="column column-50">
						    <label htmlFor="copyright">Copyright</label>
						    <input type="text" placeholder="Copyright" id="copyright" value={copyright} onChange={this.onCopyrightChange} />
							</div>
						</div>
					</div>
					<section className="generator-data">
						<table>
						  <thead>
						    <tr>
						      <th>Nom</th>
						      <th>Numéro</th>
						      <th colSpan="2">Qualité</th>
						    </tr>
						  </thead>
						  <tbody>
						  	{persons.length === 0 && (
						  		<tr>
						  			<td colSpan="4">Aucune donnée, ajoutez une personne.</td>
						  		</tr>
						  	)}
						  	{persons.map((person, idx) => (
							    <tr key={idx}>
							      <td>{person.name}</td>
							      <td>{person.number}</td>
							      <td>{BadgesBuilder.personQualities[person.quality]}</td>
							      <td><button onClick={() => this.deletePerson(idx)}>Supprimer</button></td>
							    </tr>
						  	))}
						  </tbody>
						  <tfoot>
						  	<tr>
						      <td><input type="text" onChange={this.onNameChange} value={inProgressPerson.name} /></td>
						      <td><input type="number" min="0" step="1" onChange={this.onNumberChange} value={inProgressPerson.number} /></td>
						      <td>
						      	<select onChange={this.onQualityChange} value={inProgressPerson.quality}>
						      		{BadgesBuilder.personQualities.map((quality,idx) => (
						      			<option key={idx} value={idx}>{quality}</option>
						      		))}
						      	</select>
						      </td>
						      <td><button disabled={!isPersonValid} onClick={(e) => {isPersonValid && this.addPerson(e)}}>Ajouter</button></td>
						  	</tr>
						  </tfoot>
						</table>
						<blockquote>
						  <p>Pour avoir les badges, cliquer sur imprimer</p>
						</blockquote>
					</section>
				</section>
				<aside className="generator-render clearfix">
			  	{persons.map((person, idx) => (
				    <article className="pass float-left" key={"render-" + idx}>
				    	<h1>{salonLabel}</h1>
				    	<img src={LogoCMM} alt=""/>
				      <div className="name">{person.name}</div>
				      <div className="number">{person.number}</div>
				      <div className="quality">{BadgesBuilder.personQualities[person.quality]}</div>
				      <small className="copyright">{copyright}</small>
				    </article>
			  	))}
				</aside>
			</section>
		);
	}
}
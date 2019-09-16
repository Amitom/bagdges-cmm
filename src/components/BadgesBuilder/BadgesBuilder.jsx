import React, { Component, Fragment } from 'react';

import LogoCMM from './LogoCMM.jpg';
import CSS from './BadgesBuilder.css';

export default class BadgesBuilder extends Component {

	static personQualities = [
		"Exposant",
		"Organisateur",
		"Bénévole",
		"Autre",
	];

	static personModel = {
		name:"",
		company:"",
		quality:0,
	}

	state = {
		salonLabel: "Salon des pierres, minéraux et fossiles",
		persons: JSON.parse(localStorage.getItem('persons'))|| [],
		inProgressPerson: BadgesBuilder.personModel,
		copyright: "Propriété du CMM",
	};

	deletePerson = (idx) => {
		const persons = this.state.persons;
		persons.splice(idx,1);

		this.setState({
			persons,
		}, () => localStorage.setItem('persons', JSON.stringify(this.state.persons)))
	}

	addPerson = () => {
		let persons = this.state.persons;
		persons.push(this.state.inProgressPerson);

		console.log(JSON.stringify(this.state.persons))

		this.setState({
			persons,
			inProgressPerson: Object.assign({},BadgesBuilder.personModel),
		}, () => localStorage.setItem('persons', JSON.stringify(this.state.persons)))
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

	onCompanyChange = (e) => {
		const inProgressPerson = Object.assign({},this.state.inProgressPerson);
		inProgressPerson.company = e.target.value;
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
						    	<th></th>
						      <th>Compagnie</th>
						      <th>Nom</th>
						      <th colSpan="2">Qualité</th>
						    </tr>
						  </thead>
						  <tbody>
						  	{persons.length === 0 && (
						  		<tr>
						  			<td colSpan="5">Aucune donnée, ajoutez une personne.</td>
						  		</tr>
						  	)}
						  	{persons.map((person, idx) => (
							    <tr key={idx}>
							    	<td>{idx + 1}</td>
							      <td>{person.company}</td>
							      <td>{person.name}</td>
							      <td>{BadgesBuilder.personQualities[person.quality]}</td>
							      <td><button onClick={() => this.deletePerson(idx)}>Supprimer</button></td>
							    </tr>
						  	))}
						  </tbody>
						  <tfoot>
						  	<tr>
							    <td>{persons.length + 1}</td>
						      <td><input type="text" onChange={this.onCompanyChange} value={inProgressPerson.company} /></td>
						      <td><input type="text" onChange={this.onNameChange} value={inProgressPerson.name} /></td>
						      <td>
						      	<select onChange={this.onQualityChange} value={inProgressPerson.quality}>
						      		{BadgesBuilder.personQualities.map((quality,idx) => (
						      			<option key={idx} value={idx}>{quality}</option>
						      		))}
						      	</select>
						      </td>
						      <td><button onClick={(e) => {this.addPerson(e)}}>Ajouter</button></td>
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
				    <Fragment key={idx}>
					    <article className="pass float-left" key={"render-" + idx}>
					    	<h1>{salonLabel}</h1>
					    	<img src={LogoCMM} alt=""/>
					      <div className="company">{person.company || " "}</div>
					      <div className="name">{person.name || "_________________________"}</div>
					      <div className="quality">{BadgesBuilder.personQualities[person.quality]}</div>
					      <small className="copyright">{copyright}</small>
					    </article>
					    <article className="pass float-left" key={"renderv-" + idx}>
					    	<h1>{salonLabel}</h1>
					    	<img src={LogoCMM} alt=""/>
					      <div className="company">{person.company || " "}</div>
					      <div className="name">{person.name || "_________________________"}</div>
					      <div className="quality">{BadgesBuilder.personQualities[person.quality]}</div>
					      <small className="copyright">{copyright}</small>
					    </article>
				    </Fragment>
			  	))}
				</aside>
			</section>
		);
	}
}
import React, { Component } from 'react';
import Form from './Form'
import Result from './Result'
import './App.css';

const APIKey = 'd559b39a848a48e92bd21eb79796cd31'

class App extends Component {
	
	state = {
		value: '',
		date: '',
		city: '',
		sunrise: '',
		sunset: '',
		temp: '',
		pressure: '',
		wind: '',
		err: false,
	}
	
	handleInputChange = (e) => {
		this.setState({
			value: e.target.value
		})
	}
	/*
	handleCitySubmit = e => {
		e.preventDefault()
		const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;
		
		fetch(API)
		.then(response => {
			if(response.ok){
				return response
			}
			throw Error("Nie udało się")
		})
		.then(response => response.json())
		.then(data => {
			const time = new Date().toLocaleString()
			this.setState(state => ({
				err: false,
				date: time,
				sunrise: data.sys.sunrise,
				sunset: data.sys.sunset,
				temp: data.main.temp,
				pressure: data.main.pressure,
				wind: data.wind.speed,
				city: state.value,
			}))
		})
		.catch(err => {
			console.log(err);
			this.setState(prevState => ({
				err: true,
				city: prevState.value
			}))
		}) 
	}*/
	
	componentDidUpdate(prevProps, prevState) {
		//console.log(prev.State.value);
		//console.log(this.state.value);
		
		if(this.state.value.length == 0) return
		
		if(prevState.value !== this.state.value){
			
			const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;
		
			fetch(API)
			.then(response => {
				if(response.ok){
					return response
				}
				throw Error("Nie udało się")
			})
			.then(response => response.json())
			.then(data => {	
				const time = new Date().toLocaleString()
				this.setState(state => ({
					err: false,
					date: time,
					sunrise: data.sys.sunrise,
					sunset: data.sys.sunset,
					temp: data.main.temp,
					pressure: data.main.pressure,
					wind: data.wind.speed,
					city: state.value,
				}))
			})
			.catch(err => {
				console.log(err);
				this.setState(prevState => ({
					err: true,
					city: prevState.value
				}))
			}) 
			
	
		}
	}
	

	render(){
		return (
			<div className="App">
			<Form 
				value = {this.state.value} 
				change={this.handleInputChange} 
			/>
			<Result weather={this.state} />
		</div>
		);
	}
}

export default App;

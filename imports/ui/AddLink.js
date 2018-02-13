import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class PrivateHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: ''
		}
	}
	onSubmit(e) {
		e.preventDefault();
		const { url } = this.state;
		// above line is same as: const url = this.state.url

		if( url ) {
			Meteor.call('links.insert', url, (err, res) => {
				if (!err) {
					this.setState({url: ''})
				}
			});
		}
	}
	onChange(e) {
		this.setState({
			url: e.target.value.trim()
		})
	}
	render() {
		return (
			<div>
				<form onSubmit={ this.onSubmit.bind(this) }>
					<input 
						type='text' 
						placeholder='URL' 
						value={this.state.url} 
						onChange={ this.onChange.bind(this) }/>
					<button>Add link</button>
				</form>
			</div>
		)
	}
}
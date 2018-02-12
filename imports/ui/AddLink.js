import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class PrivateHeader extends React.Component {
	onSubmit(e) {
		e.preventDefault();
		const url = this.refs.url.value.trim();

		if( url ) {
			Meteor.call('links.insert', url);
			this.refs.url.value = '';
		}
	}
	render() {
		return (
			<div>
				<form onSubmit={ this.onSubmit.bind(this) }>
					<input type='text' ref='url' placeholder='URL' />
					<button>Add link</button>
				</form>
			</div>
		)
	}
}
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

export default class LinkListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false
		}
	}
	componentDidMount() {
		this.clipboard = new Clipboard(this.refs.copy)

		this.clipboard.on('success', () => {
			this.setState({ copied: true });
			setTimeout(() => this.setState({ copied: false }), 1000);
		}).on('error', () => {
			console.log('Unable to copy. Please copy manually.')
		})
	}
	componentWillUnmount() {
		this.clipboard.destroy();
	}
	render() {
		return (
			<div>
				<p>{ this.props.url }</p>
				<p>{ this.props.shortUrl }</p>
				<p>{ this.props.visible.toString() }</p>
				<button onClick={ () => {
					Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
				}}>{ this.props.visible ? 'Hide' : 'Unhide' }</button>
				<button ref='copy' data-clipboard-text={ this.props.shortUrl }>
				{ this.state.copied ? 'Copied' : 'Copy' }</button>
			</div>
		)
	}
}

LinkListItem.propTypes = {
	_id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	shortUrl: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired
}
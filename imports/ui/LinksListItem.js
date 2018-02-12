import React from 'react';
import PropTypes from 'prop-types';

export default class LinkListItem extends React.Component {
	render() {
		return (
			<div>
				<p>{ this.props.url }</p>
				<p>{ this.props.shortUrl }</p>
			</div>
		)
	}
}

LinkListItem.propTypes = {
	_id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	shortUrl: PropTypes.string.isRequired
}
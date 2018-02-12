import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
	return (
		<div>
			<h1>{ props.title }</h1>
			<button onClick={ () => Accounts.logout() }>LOGOUT</button>
		</div>
	)
}

PrivateHeader.propTypes = {
	title: PropTypes.string.isRequired
}

export default PrivateHeader;
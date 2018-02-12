import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

export const history = createHistory()

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];


export const onAuthChange = (isAuthenticated) => {
	const pathName = history.location.pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
	const isAuthenticatedPage = authenticatedPages.includes(pathName);

	if(isUnauthenticatedPage && isAuthenticated) {
		history.push('/links')
	} else if ( isAuthenticatedPage && !isAuthenticated) {
		history.replace('/')
	}
}

export const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<Route exact path="/" render={() => {
				 return Meteor.userId() ? <Redirect to="/links" /> : <Login />
			}} />
			<Route path="/signup" render={() => {
				 return Meteor.userId() ? <Redirect to="/links" /> : <Signup />
			}} />
			<Route path="/links" render={() => {
				 return !Meteor.userId() ? <Redirect to="/" /> : <Link />
			}} />
			<Route path="*" component={ NotFound } />
		</Switch>
	</Router>
);

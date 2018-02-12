import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: []
		}
	}
	componentDidMount() {
		console.log('componentDidMount LinksList' )
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('links');
			let links = Links.find().fetch()
			this.setState({ links });
		})
	}
	componentWillUnmount() {
		console.log('componentWillUnmount LinksList')
		this.linksTracker.stop()
	}
	renderLinksListItem() {
		return this.state.links.map((link) => {
			const shortUrl = Meteor.absoluteUrl(link._id);
			return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
		})
	}
	render() {
		return (
			<div>
				<p>Links List</p>
				<div>{ this.renderLinksListItem() }</div>
			</div>
		)
	}
}
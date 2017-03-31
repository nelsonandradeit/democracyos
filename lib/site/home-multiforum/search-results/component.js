import React, { Component } from 'react'
import t from 't-component'
import ForumSearchCard from './forum-search-card'

// props received:
// {
//  name: 'for the routes'
//  title: 'the democracy title'
//  owner: 'the name of the owener'
//  summary: 'summary'
//  emptyResults: boolean
// }

export default class SearchResults extends Component {
	constructor (props) {
		super(props)
	}
	render(){
		let msg
		if(!this.props.forums.length){
						msg = (<p className="msg-empty">
								{t('newsfeed.nothing-to-show')}
							</p>)
		} else {
			msg = this.props.forums.map((forum, i) => {
				return (
					<ForumSearchCard key={i} forum={forum} />
					)
				})
		}

		return(
			<div id="test-container">
				<div id="search-results">
					{msg}
				</div>
			</div>
			)
	}
}
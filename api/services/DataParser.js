/**
* DataParser.js
*
**/
let UserInstagramModel = require('../models/UserInstagramModel.js').UserInstagramModel

module.exports = {
	
	parseInstagramData: function(source) {
		const prefix = '<script type="text/javascript">window._sharedData = '
		const suffix = ';</script>'
		const notFoundMessage = 'The link you followed may be broken, or the page may have been removed'
		const userJSON = this.getStringFromHTML(source, prefix, suffix, notFoundMessage)
		if(!userJSON) {
			return false
		}

		const userData = JSON.parse(userJSON).entry_data.ProfilePage[0].graphql.user
		const userObject = new UserInstagramModel(
			userData.full_name,
			userData.biography,
			userData.edge_followed_by.count,
			userData.edge_follow.count
		)

		return userObject
	},

	getStringFromHTML: function (source, prefix, suffix, notFoundMessage) {

		if(source.includes(notFoundMessage)) {
			return false
		}
		
		let i = source.indexOf(prefix);

		if (i >= 0) {
			source = source.substring(i + prefix.length);
		}
		else {
			return ''
		}
		if (suffix) {
			i = source.indexOf(suffix)
			if (i >= 0) {
				source = source.substring(0, i)
			}
			else {
				return ''
			}
		}
		return source
	}

};
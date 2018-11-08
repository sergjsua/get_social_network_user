/**
 * HomepageController
 * 
 */

const parser = require("tinyreq")

module.exports = {

  render: (request, response) => {
		return response.view('homepage')
  },
  
  getUserInfo: async (request, response) => {
    const data = request.body
    const html = await parser(SocialNetworks[data.network].url + data.handler)
    let userInfo = {}
    
    switch(data.network) {
      case 'instagram':
        userInfo = DataParser.parseInstagramData(html)
        break
      default:
        return response.redirect('/')
        break
    }

    return response.view('homepage' ,{userInfo})
  }

}
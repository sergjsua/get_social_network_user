/**
 * ApiHomepageController
 * 
 */

const parser = require("tinyreq")

module.exports = {
  
  getUserInfo: async (request, response) => {
    const data = request.body
    const handler = data.handler
    const html = await parser(SocialNetworks[data.network].url + handler)
    const errorMessage = "User was not found"
    let responseObj = {
      handler: handler
    }
    
    switch(data.network) {
      case 'instagram':
        const parsedUserInfo = DataParser.parseInstagramData(html)
        if(parsedUserInfo) {
          responseObj.user = parsedUserInfo
        } else {
          responseObj.error = errorMessage
        }
        break

      default:
        return response.redirect('/')
        break
    }

    return response.view('homepage', responseObj)
  }

}
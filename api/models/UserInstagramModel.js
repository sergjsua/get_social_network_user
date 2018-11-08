exports.UserInstagramModel = class UserInstagramModel {

  constructor(name, description, followers_number, following_number) {
    this.name               = typeof name === 'string' ? name : ''                          // TODO: bear away properties type check from model
    this.description        = typeof description === 'string' ? description : ''
    this.followers_number   = typeof followers_number === 'number' ? followers_number : 0
    this.following_number   = typeof following_number === 'number' ? following_number : 0
  }

}
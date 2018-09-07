module.exports = {
  url (num) {
    return 'http://testweichat.8518.com/json/data/active' + num + '.json'
  },
  imgUrl (string) {
    return 'http://testweichat.8518.com/json/images/' + string + '.png'
  }
}

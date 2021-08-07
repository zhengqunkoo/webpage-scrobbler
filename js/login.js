import * as constants from '/js/constants.js'

const authenticate = submit => {
  submit.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  if (username === '' || password === '') {
    document.getElementById('response').innerHTML = 'Please fill in your username and password.'
    return
  }

  constants.postApi({
      method: 'auth.getMobileSession',
      username: username,
      password: password,
      api_key: constants.lastfmApiKey,
    })

    .then(async text => {
      const [errorCode, sessionKey, _] = constants.validateXmlDoc(await text)

      if (errorCode === undefined) {
        console.log(sessionKey)
        browser.storage.sync.set({'sessionKey': sessionKey})
          .then(window.close)
          .catch(console.error)

      } else if (errorCode === '4') {
        document.getElementById('response').innerHTML = 'Invalid username or password.'
        return
      } else {
        document.getElementById('response').innerHTML = 'Unknown error, please see browser console.'
        return
      }

    })

    .catch(console.error)
}

const init = () => {
  document.getElementById('username').focus()

  document.querySelector('form').addEventListener('submit', authenticate)

  document.getElementById('help').addEventListener(
    'click',
    () => browser.tabs.create({url: browser.runtime.getURL('/html/installed.html')})
  )

}

init()

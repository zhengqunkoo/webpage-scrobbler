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
      text = await text
      console.log(text)

      const xmlDoc = new DOMParser().parseFromString(text, 'text/xml')

      const lfm = xmlDoc.evaluate('/lfm', xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
      if (lfm.getAttribute('status') !== 'ok') {
        const error = xmlDoc.evaluate('/lfm/error', xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        console.log(error)
        const errorCode = error.getAttribute('code')
        if (errorCode === '4') {
          document.getElementById('response').innerHTML = 'Invalid username or password.'
          return
        } else {
          document.getElementById('response').innerHTML = 'Unknown error, please see browser console.'
          return
        }
      }

      const sessionKey = xmlDoc.evaluate('/lfm/session/key', xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue
      console.log(sessionKey)
      browser.storage.sync.set({'sessionKey': sessionKey})
        .then(window.close)
        .catch(console.error)

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

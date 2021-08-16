const defaultSettings = {
  'www.midomi.com': [
    '/html/body/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/p[1]', // track XPath
    '', // track separator
    '/html/body/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/p[2]/span', // artist XPath
    '', // artist separator
    '/html/body/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/p[3]/span', // album XPath
    ' • ', // album separator
  ],
}

browser.storage.sync.set(defaultSettings)

browser.browserAction.onClicked.addListener(tab => {

  browser.storage.sync.get()

    .then(data => {

      console.log(data)
      if (data.hasOwnProperty('sessionKey')) {
        browser.tabs.sendMessage(tab.id, new URL(tab.url).host)

      } else {
        browser.tabs.create({url: browser.runtime.getURL('html/login.html')})
          .then(optionsTab => {
            browser.tabs.onRemoved.addListener(tabId => {
              if (tabId === optionsTab.id) {
                browser.tabs.sendMessage(tab.id, new URL(tab.url).host)
              }
            })
          })

      }
    })

    .catch(console.error)
})

browser.runtime.onMessage.addListener(path => {
  browser.browserAction.setIcon({path: path})

  window.setTimeout(browser.browserAction.setIcon, 1000, {path: 'icons/icon.svg'})
})

browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  if (temporary) {
    return
  }

  switch (reason) {
    case 'install':
      await browser.tabs.create({url: browser.runtime.getURL('/html/installed.html')})
      break
    default:
      console.error(reason)
  }
})

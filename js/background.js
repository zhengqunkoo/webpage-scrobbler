browser.browserAction.onClicked.addListener(tab => {

  browser.storage.sync.get()

    .then(data => {

      console.log(data)
      if (data.hasOwnProperty('sessionKey')) {
        browser.tabs.sendMessage(tab.id, new URL(tab.url).host)

      } else {
        browser.tabs.create({url: browser.runtime.getURL('html/options.html')})
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

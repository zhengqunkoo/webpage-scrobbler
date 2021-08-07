const heads = [
  'host',
  'track XPath',
  'artist XPath',
  'album XPath'
]

const tbodyInsertRow = (tbody, e) => { // e: [String: [String]]
  const row = tbody.insertRow()
  for (const value of [e[0]].concat(e[1]).values()) {
    const input = document.createElement('input')
    input.value = value
    input.setAttribute('type', 'text')
    input.addEventListener('focus', input.select)
    input.addEventListener('keyup', setSettings)
    row.insertCell().appendChild(input)
  }
}

const setSettings = () => {
  let data = {}
  const rows = document.getElementById('table').tBodies[0].rows
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const values = []
    for (let j = 1; j < row.children.length; j++) {
      values.push(row.children[j].firstChild.value)
    }
    data[row.children[0].firstChild.value] = values
  }
  console.log(data)
  browser.storage.sync.clear()
  browser.storage.sync.set(data)
}

const getSettings = (data) => {
  if (data !== undefined) {
    delete data['sessionKey'] // delete sessionKey in local data, this is ok because we do not sync.set
  }

  const table = document.getElementById('table')
  const tbody = table.createTBody()
  Object.entries(data).map(e => tbodyInsertRow(tbody, e))
  const oldTbody = table.tBodies[0]
  table.replaceChild(tbody, oldTbody)
}

const init = () => {

  const table = document.getElementById('table')
  const thead = table.createTHead()
  table.createTBody()

  const headerRow = thead.insertRow()
  for (let j = 0; j < heads.length; j++) {
    const head = heads[j]
    const th = document.createElement('th')
    th.innerText = head
    headerRow.appendChild(th)
  }

  browser.storage.sync.get()
    .then(getSettings)
    .catch(console.error)

  document.getElementById('tbodyInsertRow').addEventListener(
    'click',
    () => {
      const tbody = document.getElementById('table').tBodies[0]
      tbodyInsertRow(tbody, ['', ['','','']])
      tbody.rows[tbody.rows.length - 1].firstChild.firstChild.focus()
    }
  )

  document.getElementById('help').addEventListener(
    'click',
    () => browser.tabs.create({url: browser.runtime.getURL('/html/installed.html')})
  )

}

init()

chrome.contextMenus.create(
  {
    type: 'normal',
    title: 'Markable',
    id: 'viteMark',
    contexts: ['all'],
    onclick: genericOnClick
  },
  function () {}
)

chrome.contextMenus.create(
  {
    type: 'normal',
    title: '要看',
    id: 'viteMarkNed',
    contexts: ['all'],
    parentId: 'viteMark',
    onclick: genericOnClick
  },
  function () {}
)

chrome.contextMenus.create(
  {
    type: 'normal',
    title: '常看',
    id: 'viteMarkTop',
    contexts: ['all'],
    parentId: 'viteMark',
    onclick: genericOnClick
  },
  function () {}
)

chrome.contextMenus.create(
  {
    type: 'normal',
    title: '吃灰',
    id: 'viteMarkNor',
    contexts: ['all'],
    parentId: 'viteMark',
    onclick: genericOnClick
  },
  function () {}
)

chrome.contextMenus.create(
  {
    type: 'normal',
    title: '用得着',
    id: 'viteMarkUse',
    contexts: ['all'],
    parentId: 'viteMark',
    onclick: genericOnClick
  },
  function () {}
)

chrome.contextMenus.create(
  {
    type: 'normal',
    title: '导航',
    id: 'viteMarkNav',
    contexts: ['all'],
    parentId: 'viteMark',
    onclick: genericOnClick
  },
  function () {}
)

async function genericOnClick(info, tab) {
  console.log(info, tab)
  const id = info.menuItemId
  const title = tab.title
  const url = tab.url
  const ico = tab.favIconUrl
  const type = {
    viteMarkNor: 'nor',
    viteMarkNed: 'ned',
    viteMarkNav: 'nav',
    viteMarkTop: 'top',
    viteMarkUse: 'use'
  }
  const data = { title, url, ico, type: type[id] }

  chrome.storage.local.get('vite', function (res) {
    chrome.storage.local.set({ vite: res.vite.concat(data) }, function () {
      console.log(data)
    })
  })

  let text
  try {
    const res = await fetch('https://vite.baj.workers.dev/add', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    text = await res.text()
  } catch (error) {
    //
  }

  chrome.notifications.create(null, {
    type: 'basic',
    iconUrl: './logo.png',
    title: 'Markable',
    message: text === '1' ? '成功' : '失败'
  })
}

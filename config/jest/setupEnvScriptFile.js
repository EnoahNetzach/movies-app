window.fetch = async () => ({
  json: async () => '',
  ok: window.fetch.ok,
})

window.fetch.ok = true

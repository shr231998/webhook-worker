import sendTelegramNotification from './src/handlers/send_telegram_notification'
import handleTelegramBot from './src/handlers/handle_telegram_bot'
import Router from './router'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method == 'POST') {
    const r = new Router()
    const apiKey = API_KEY
    r.post(`/sendTelegramNotification${apiKey}`, sendTelegramNotification)
    r.post(`/handleTelegramBot${apiKey}`, handleTelegramBot)

    let response = await r.route(request)

    if (response == 'undefined') {
      let body = JSON.stringify({
        result: 'Failed',
        data: 'Method not found!',
      })
      response = new Response(body, {
        status: 404,
        headers: {
          'content-type': 'application/json',
          'user-agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
        },
      })
    }

    return response
  } else {
    return await fetch(request)
  }
}

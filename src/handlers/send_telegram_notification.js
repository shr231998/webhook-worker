import { telegramBot } from '../utils/telegramBot'
import { processData } from '../utils/processData'

export default async request => {
  try {
    const requestHeaders = await request.headers
    const requestBody = await request.json()
    const processedData = await processData(requestHeaders, requestBody)
    await telegramBot(processedData, 'sendMessage')
    const responseBody = JSON.stringify({
      result: 'Success',
      data: 'OK',
    })
    return new Response(responseBody, {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'user-agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
      },
    })
  } catch (error) {
    if (error[0] == 400) {
      const responseBody = JSON.stringify({
        result: 'Failed',
        data: error[1],
      })
      return new Response(responseBody, {
        status: error[0],
        headers: {
          'content-type': 'application/json',
          'user-agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
        },
      })
    } else {
      const responseBody = JSON.stringify({
        result: 'Failed',
        data: error.toString(),
      })
      return new Response(responseBody, {
        status: 500,
        headers: {
          'content-type': 'application/json',
          'user-agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
        },
      })
    }
  }
}

const token = TELEGRAM_TOKEN
const telegramUrl = 'https://api.telegram.org/bot' + token + '/'

export async function telegramBot(params, method) {
  const fetchUrl = telegramUrl + method
  switch (method) {
    case 'sendMessage':
      for (let i = 0; i < params.chatid.length; i++) {
        await fetch(fetchUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: params.chatid[i],
            text: params.text,
            parse_mode: 'HTML',
          }),
        })
      }
  }
}

export async function processData(headers, body) {
  const userAgent = JSON.parse(await webhook_kv.get('user-agent'))
  const chatId = JSON.parse(await webhook_kv.get('chat-id'))
  const kweksNewsUserAgent = userAgent.kweeksnews
  const freshpingUserAgent = userAgent.freshping
  const wordPressLogChannel = chatId.wordpress
  const contentLogChannel = chatId.content
  const userLogChannel = chatId.user
  const managementGroup = chatId.management
  let text = ''
  let chatid = []

  switch (headers.get('user-agent')) {
    case kweksNewsUserAgent:
      text += '<b>' + body.event + '</b>\n\n'
      switch (body.channel) {
        case 'wordpress':
          chatid = [wordPressLogChannel]
          if (body.name) {
            text += '<b>Name:</b> ' + body.name + '\n'
          }
          if (body.dev) {
            text += '<b>Dev:</b> ' + body.dev + '\n'
          }
          if (body.from) {
            text += '<b>From:</b> ' + body.from + '\n'
          }
          if (body.to) {
            text += '<b>To:</b> ' + body.to + '\n'
          }
          break
        case 'content':
          chatid = [contentLogChannel]
          if (body.title) {
            text += '<b>Title:</b> ' + body.title + '\n'
          }
          if (body.post) {
            text += '<b>Post:</b> ' + body.post + '\n'
          }
          if (body.category) {
            text += '<b>Category:</b> ' + body.category + '\n'
          }
          if (body.tag) {
            text += '<b>Tag:</b> ' + body.tag + '\n'
          }
          if (body.type) {
            text += '<b>Type:</b> ' + body.type + '\n'
          }
          if (body.author) {
            text += '<b>Author:</b> ' + body.author + '\n'
          }
          if (body.from) {
            text += '<b>From:</b> ' + body.from + '\n'
          }
          if (body.email) {
            text += '<b>Email:</b> ' + body.email + '\n'
          }
          if (body.comment) {
            text += '<b>Comment:</b> ' + body.comment + '\n'
          }
          if (body.lasteditor) {
            text += '<b>Last Editor:</b> ' + body.lasteditor + '\n'
          }
          if (body.via) {
            text += '<b>Via:</b> ' + body.via + '\n'
          }
          if (body.status) {
            text += '<b>Status:</b> ' + body.status + '\n'
          }
          if (body.useragent) {
            text += '<b>User Agent:</b> ' + body.useragent + '\n'
          }
          if (body.ipaddress) {
            text += '<b>IP Address:</b> ' + body.ipaddress + '\n'
          }
          if (body.url) {
            text += '<b>URL:</b> <a href="' + body.url + '">click here</a>\n'
          }
          if (body.homeurl && body.id) {
            text +=
              '<b>Review:</b> <a href="' +
              body.homeurl +
              '/wp-admin/post.php?post=' +
              body.id +
              '&action=edit">click here</a>\n'
          }
          break
        case 'user':
          chatid = [userLogChannel]
          if (body.nicename && body.username) {
            text +=
              '<b>User:</b> ' + body.nicename + ' (' + body.username + ')\n'
          }
          if (!body.nicename && body.username) {
            text += '<b>User:</b> ' + body.username + '\n'
          }
          if (body.email) {
            text += '<b>Email:</b> ' + body.email + '\n'
          }
          if (body.role) {
            text += '<b>Role:</b> ' + body.role + '\n'
          }
          if (body.ipaddress) {
            text += '<b>IP Address:</b> ' + body.ipaddress + '\n'
          }
          break
        default:
          throw [400, 'Undefined channel!']
      }
      break
    case freshpingUserAgent:
      chatid = [managementGroup, wordPressLogChannel]
      switch (body.webhook_event_data.http_status_code) {
        case 200:
          const lastDown = await webhook_kv.get(
            body.webhook_event_data.check_name
          )
          await webhook_kv.delete(body.webhook_event_data.check_name)
          let start = new Date(lastDown).getTime()
          let stop = new Date(
            body.webhook_event_data.request_start_time
          ).getTime()
          let duration = stop - start
          const portions = []

          const msInHour = 1000 * 60 * 60
          const hours = Math.trunc(duration / msInHour)
          if (hours > 0) {
            portions.push(hours + 'h')
            duration = duration - hours * msInHour
          }

          const msInMinute = 1000 * 60
          const minutes = Math.trunc(duration / msInMinute)
          if (minutes > 0) {
            portions.push(minutes + 'm')
            duration = duration - minutes * msInMinute
          }

          const seconds = Math.trunc(duration / 1000)
          if (seconds > 0) {
            portions.push(seconds + 's')
          }

          duration = portions.join(' ')
          text +=
            '<b>#UPALERT</b>\n\n' +
            '<b>Name:</b> ' +
            body.webhook_event_data.check_name +
            ' (' +
            body.webhook_event_data.request_url +
            ')\n' +
            '<b>Status:</b> ' +
            body.webhook_event_data.check_state_name +
            '\n' +
            '<b>Status Code:</b> ' +
            body.webhook_event_data.http_status_code +
            '\n'
          if (lastDown) {
            text += '<b>Last Down Duration:</b> ' + duration + '\n'
          }
          break
        default:
          await webhook_kv.put(
            body.webhook_event_data.check_name,
            body.webhook_event_data.request_start_time
          )
          text +=
            '<b>#DOWNALERT</b>\n\n' +
            '<b>Name:</b> ' +
            body.webhook_event_data.check_name +
            ' (' +
            body.webhook_event_data.request_url +
            ')\n' +
            '<b>Status:</b> ' +
            body.webhook_event_data.check_state_name +
            '\n' +
            '<b>Status Code:</b> ' +
            body.webhook_event_data.http_status_code +
            '\n'
          break
      }
      break
    default:
      throw [400, 'User agent mismatch!']
  }

  return { chatid, text }
}

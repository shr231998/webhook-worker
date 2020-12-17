!(function(e) {
  var t = {}
  function n(a) {
    if (t[a]) return t[a].exports
    var o = (t[a] = { i: a, l: !1, exports: {} })
    return e[a].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
  }
  ;(n.m = e),
    (n.c = t),
    (n.d = function(e, t, a) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a })
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var a = Object.create(null)
      if (
        (n.r(a),
        Object.defineProperty(a, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            a,
            o,
            function(t) {
              return e[t]
            }.bind(null, o)
          )
      return a
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default
            }
          : function() {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ''),
    n((n.s = 1))
})([
  function(e, t) {},
  function(e, t, n) {
    'use strict'
    n.r(t)
    const a = 'https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/'
    var o = async e => {
        try {
          const t = await e.headers,
            n = await e.json(),
            o = await (async function(e, t) {
              const n = JSON.parse(await webhook_kv.get('user-agent')),
                a = JSON.parse(await webhook_kv.get('chat-id')),
                o = n.kweeksnews,
                s = n.freshping,
                r = a.wordpress,
                i = a.content,
                c = a.user,
                u = a.management
              let d = '',
                h = []
              switch (e.get('user-agent')) {
                case o:
                  switch (((d += '<b>' + t.event + '</b>\n\n'), t.channel)) {
                    case 'wordpress':
                      ;(h = [r]),
                        t.name && (d += '<b>Name:</b> ' + t.name + '\n'),
                        t.dev && (d += '<b>Dev:</b> ' + t.dev + '\n'),
                        t.from && (d += '<b>From:</b> ' + t.from + '\n'),
                        t.to && (d += '<b>To:</b> ' + t.to + '\n')
                      break
                    case 'content':
                      ;(h = [i]),
                        t.title && (d += '<b>Title:</b> ' + t.title + '\n'),
                        t.post && (d += '<b>Post:</b> ' + t.post + '\n'),
                        t.category &&
                          (d += '<b>Category:</b> ' + t.category + '\n'),
                        t.tag && (d += '<b>Tag:</b> ' + t.tag + '\n'),
                        t.type && (d += '<b>Type:</b> ' + t.type + '\n'),
                        t.author && (d += '<b>Author:</b> ' + t.author + '\n'),
                        t.from && (d += '<b>From:</b> ' + t.from + '\n'),
                        t.email && (d += '<b>Email:</b> ' + t.email + '\n'),
                        t.comment &&
                          (d += '<b>Comment:</b> ' + t.comment + '\n'),
                        t.lasteditor &&
                          (d += '<b>Last Editor:</b> ' + t.lasteditor + '\n'),
                        t.via && (d += '<b>Via:</b> ' + t.via + '\n'),
                        t.status && (d += '<b>Status:</b> ' + t.status + '\n'),
                        t.useragent &&
                          (d += '<b>User Agent:</b> ' + t.useragent + '\n'),
                        t.ipaddress &&
                          (d += '<b>IP Address:</b> ' + t.ipaddress + '\n'),
                        t.url &&
                          (d +=
                            '<b>URL:</b> <a href="' +
                            t.url +
                            '">click here</a>\n'),
                        t.homeurl &&
                          t.id &&
                          (d +=
                            '<b>Review:</b> <a href="' +
                            t.homeurl +
                            '/wp-admin/post.php?post=' +
                            t.id +
                            '&action=edit">click here</a>\n')
                      break
                    case 'user':
                      ;(h = [c]),
                        t.nicename &&
                          t.username &&
                          (d +=
                            '<b>User:</b> ' +
                            t.nicename +
                            ' (' +
                            t.username +
                            ')\n'),
                        !t.nicename &&
                          t.username &&
                          (d += '<b>User:</b> ' + t.username + '\n'),
                        t.email && (d += '<b>Email:</b> ' + t.email + '\n'),
                        t.role && (d += '<b>Role:</b> ' + t.role + '\n'),
                        t.ipaddress &&
                          (d += '<b>IP Address:</b> ' + t.ipaddress + '\n')
                      break
                    default:
                      throw [400, 'Undefined channel!']
                  }
                  break
                case s:
                  switch (
                    ((h = [u, r]), t.webhook_event_data.http_status_code)
                  ) {
                    case 200:
                      const e = await webhook_kv.get(
                        t.webhook_event_data.check_name
                      )
                      await webhook_kv.delete(t.webhook_event_data.check_name)
                      let n = new Date(e).getTime(),
                        a =
                          new Date(
                            t.webhook_event_data.request_start_time
                          ).getTime() - n
                      const o = [],
                        s = 36e5,
                        r = Math.trunc(a / s)
                      r > 0 && (o.push(r + 'h'), (a -= r * s))
                      const i = 6e4,
                        c = Math.trunc(a / i)
                      c > 0 && (o.push(c + 'm'), (a -= c * i))
                      const u = Math.trunc(a / 1e3)
                      u > 0 && o.push(u + 's'),
                        (a = o.join(' ')),
                        (d +=
                          '<b>#UPALERT</b>\n\n<b>Name:</b> ' +
                          t.webhook_event_data.check_name +
                          ' (' +
                          t.webhook_event_data.request_url +
                          ')\n<b>Status:</b> ' +
                          t.webhook_event_data.check_state_name +
                          '\n<b>Status Code:</b> ' +
                          t.webhook_event_data.http_status_code +
                          '\n'),
                        e && (d += '<b>Last Down Duration:</b> ' + a + '\n')
                      break
                    default:
                      await webhook_kv.put(
                        t.webhook_event_data.check_name,
                        t.webhook_event_data.request_start_time
                      ),
                        (d +=
                          '<b>#DOWNALERT</b>\n\n<b>Name:</b> ' +
                          t.webhook_event_data.check_name +
                          ' (' +
                          t.webhook_event_data.request_url +
                          ')\n<b>Status:</b> ' +
                          t.webhook_event_data.check_state_name +
                          '\n<b>Status Code:</b> ' +
                          t.webhook_event_data.http_status_code +
                          '\n')
                  }
                  break
                default:
                  throw [400, 'User agent mismatch!']
              }
              return { chatid: h, text: d }
            })(t, n)
          await (async function(e, t) {
            const n = a + t
            switch (t) {
              case 'sendMessage':
                for (let t = 0; t < e.chatid.length; t++)
                  await fetch(n, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      chat_id: e.chatid[t],
                      text: e.text,
                      parse_mode: 'HTML',
                    }),
                  })
            }
          })(o, 'sendMessage')
          const s = JSON.stringify({ result: 'Success', data: 'OK' })
          return new Response(s, {
            status: 200,
            headers: {
              'content-type': 'application/json',
              'user-agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
            },
          })
        } catch (e) {
          if (400 == e[0]) {
            const t = JSON.stringify({ result: 'Failed', data: e[1] })
            return new Response(t, {
              status: e[0],
              headers: {
                'content-type': 'application/json',
                'user-agent':
                  'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
              },
            })
          }
          {
            const t = JSON.stringify({ result: 'Failed', data: e.toString() })
            return new Response(t, {
              status: 500,
              headers: {
                'content-type': 'application/json',
                'user-agent':
                  'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
              },
            })
          }
        }
      },
      s = n(0),
      r = n.n(s)
    const i = e => t => t.method.toLowerCase() === e.toLowerCase(),
      c = i('connect'),
      u = i('delete'),
      d = i('get'),
      h = i('head'),
      b = i('options'),
      l = i('patch'),
      p = i('post'),
      w = i('put'),
      m = i('trace'),
      _ = e => t => {
        const n = new URL(t.url).pathname
        return (n.match(e) || [])[0] === n
      }
    var k = class {
      constructor() {
        this.routes = []
      }
      handle(e, t) {
        return this.routes.push({ conditions: e, handler: t }), this
      }
      connect(e, t) {
        return this.handle([c, _(e)], t)
      }
      delete(e, t) {
        return this.handle([u, _(e)], t)
      }
      get(e, t) {
        return this.handle([d, _(e)], t)
      }
      head(e, t) {
        return this.handle([h, _(e)], t)
      }
      options(e, t) {
        return this.handle([b, _(e)], t)
      }
      patch(e, t) {
        return this.handle([l, _(e)], t)
      }
      post(e, t) {
        return this.handle([p, _(e)], t)
      }
      put(e, t) {
        return this.handle([w, _(e)], t)
      }
      trace(e, t) {
        return this.handle([m, _(e)], t)
      }
      all(e) {
        return this.handle([], e)
      }
      route(e) {
        const t = this.resolve(e)
        return t ? t.handler(e) : 'undefined'
      }
      resolve(e) {
        return this.routes.find(
          t =>
            !(t.conditions && (!Array.isArray(t) || t.conditions.length)) ||
            ('function' == typeof t.conditions
              ? t.conditions(e)
              : t.conditions.every(t => t(e)))
        )
      }
    }
    addEventListener('fetch', e => {
      e.respondWith(
        (async function(e) {
          if ('POST' == e.method) {
            const t = new k(),
              n = API_KEY
            t.post('/sendTelegramNotification' + n, o),
              t.post('/handleTelegramBot' + n, r.a)
            let a = await t.route(e)
            if ('undefined' == a) {
              let e = JSON.stringify({
                result: 'Failed',
                data: 'Method not found!',
              })
              a = new Response(e, {
                status: 404,
                headers: {
                  'content-type': 'application/json',
                  'user-agent':
                    'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
                },
              })
            }
            return a
          }
          return await fetch(e)
        })(e.request)
      )
    })
  },
])

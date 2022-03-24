const fetch = require('isomorphic-fetch');
const { HttpsProxyAgent } = require('./http-proxy-agent');
const { SocksProxyAgent } = require('./socks-proxy-agent');
const { DEFAULT_FETCH_OPTIONS, DEFAULT_FETCH_HEADERS, ETIME_SEC } = require('../app.const');
const { debugLog, debugDir } = require('../util');

async function request({
  url,
  method,
  headers,
  body,
  proxy,
  fetchOtions,
  timeout = 30,
  maxAttempts = 1,
}) {
  const agent =
    typeof proxy === 'string'
      ? proxy.startsWith('http')
        ? new HttpsProxyAgent({
            proxy,
          })
        : new SocksProxyAgent(proxy)
      : undefined;

  let attemptsDone = 0;
  let isError = false;
  let response;
  let timeoutId;

  do {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), timeout * ETIME_SEC.ONE);
    isError = false;

    response = await fetch(url, {
      ...DEFAULT_FETCH_OPTIONS,
      ...fetchOtions,
      headers: {
        ...DEFAULT_FETCH_HEADERS,
        ...headers,
      },
      signal: controller.signal,
      agent,
      method,
      body,
    }).catch((e) => {
      debugLog('___Request error___');
      debugLog(e);
      debugDir(e);

      isError = true;
    });

    clearTimeout(timeoutId);

    if (response)
      debugDir({ url: response.url, status: response.status, headers: response.headers });
  } while (isError && ++attemptsDone < maxAttempts);

  if (isError || !response) throw new Error('No successful response');

  return response;
}

module.exports = { request };

const { prompt } = require('inquirer');
const { request } = require('./services');
const { log } = require('./util');

async function init() {
  const { value: answer } = await prompt({
    message: `Enter [a]`,
    type: 'input',
    name: 'value',
  });
  if (answer === 'a') return;

  await prompt({
    message: `Confirm`,
    type: 'confirm',
    name: 'name',
  });

  const response = await request({
    url: 'https://json.myip.wtf',
    proxy: 'socks://127.0.0.1:1080',
    // proxy: 'http://log:pass@ip:port',
  }).catch(() => {});

  if (!response) return;

  const text = await response.text();
  log(text);

  // for stream-like
  // const data = await response.arrayBuffer().then((_) => new Uint8Array(_));
  // console.log(Buffer.from(data.buffer).toString('utf-8'));
}

init();

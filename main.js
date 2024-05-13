const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const reciveMessage = require("./src/message.js")

const reload = require("./reload-file.js")

console.log("main.js")

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "sessions", }),
  webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', }
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();
reload("./src/message.js", () => reciveMessage(client))
// reciveMessage(client)

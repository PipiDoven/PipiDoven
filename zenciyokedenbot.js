const mineflayer = require('mineflayer');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Bot aktif');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Web server açık');
});

const hesaplar = [
  'ShaconunBicagi',
  'ShaconunBicagi2',
  'ShaconunBicagi3',
  'ShaconunBicagi4',
  'ShaconunBicagi5',
  'ShaconunBicagi6',
  'ShaconunBicagi7',
  'ShaconunBicagi8',
  'ShaconunBicagi9',
];

const HOST = 'oyna.craftluna.net';
const PORT = 25565;
const sifre = 'Ates12345';

function bekle(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 🔥 SAĞLAM QUEUE (FIXLİ)
let queue = Promise.resolve();

function baslat(username) {
  queue = queue.then(() => runBot(username));
}

async function runBot(username) {

  await bekle(random(5000, 12000));

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username
  });

  let aktif = true;

  bot.once('spawn', async () => {
    console.log(`${username} girdi`);

    await bekle(random(5000, 9000));

    if (aktif) bot.chat(`/login ${sifre}`);

    await bekle(random(5000, 8000));
    if (aktif) bot.chat('/queue smp');

    await bekle(random(5000, 8000));
    if (aktif) bot.chat('/afk 1');
  });

  bot.on('kicked', (reason) => {
    console.log(`${username} kick:`, reason);

    aktif = false;

    const delay = random(30000, 60000);

    setTimeout(() => {
      baslat(username);
    }, delay);
  });

  bot.on('error', (err) => {
    console.log(`${username} hata:`, err.message);
  });
}

// 🔥 TEK TEK BAŞLAT
async function startAll() {
  for (const isim of hesaplar) {
    await bekle(random(8000, 15000));
    baslat(isim);
  }
}

startAll();

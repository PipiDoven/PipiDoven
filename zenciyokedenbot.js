const mineflayer = require('mineflayer');

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

// 🔥 GLOBAL QUEUE (EN ÖNEMLİ FIX)
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

  let logged = false;

  bot.once('spawn', async () => {
    console.log(`${username} girdi`);

    await bekle(random(5000, 9000));

    if (!logged) {
      bot.chat(`/login ${sifre}`);
      logged = true;
    }

    await bekle(random(5000, 8000));
    bot.chat('/queue smp');

    await bekle(random(5000, 8000));
    bot.chat('/afk 1');
  });

  bot.on('kicked', (reason) => {
    console.log(`${username} kick:`, reason);

    const delay = random(30000, 60000);

    // ❗ QUEUE içine al (spam engel)
    queue = queue.then(() => {
      return new Promise(res => {
        setTimeout(() => {
          runBot(username);
          res();
        }, delay);
      });
    });
  });

  bot.on('error', (err) => {
    console.log(`${username} hata:`, err.message);
  });
}

// 🔥 SIRALI BAŞLAT (çok önemli)
async function startAll() {
  for (const isim of hesaplar) {
    await bekle(random(8000, 15000));
    baslat(isim);
  }
}

startAll();

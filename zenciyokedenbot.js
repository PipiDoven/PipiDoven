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

async function baslat(username) {
  await bekle(random(0, 5000)); // başlangıç spread

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username
  });

  let joined = false;

  bot.once('spawn', async () => {
    joined = true;

    console.log(`${username} girdi`);

    await bekle(random(3000, 7000));
    bot.chat(`/login ${sifre}`);

    await bekle(random(3000, 6000));
    bot.chat('/queue smp');

    await bekle(random(4000, 8000));
    bot.chat('/afk 1');
  });

  bot.on('kicked', async (reason) => {
    console.log(`${username} kick:`, reason);

    // ❗ rate limit cooldown
    const delay = random(15000, 40000);
    console.log(`${username} ${delay}ms sonra tekrar deneyecek`);

    await bekle(delay);
    baslat(username);
  });

  bot.on('error', (err) => {
    console.log(`${username} hata:`, err.message);
  });
}

// ❗ TEK TEK BAŞLAT (çok önemli fix)
async function startAll() {
  for (const isim of hesaplar) {
    await bekle(random(5000, 12000)); // girişleri yay
    baslat(isim);
  }
}

startAll();
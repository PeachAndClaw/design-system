const fs = require('fs');
const path = require('path');
const potrace = require('potrace');

const root = path.resolve(__dirname, '..');
const input = path.join(root, 'peachandclaw-emblem-final.png');
const outputDir = path.join(root, 'assets', 'logo');

fs.mkdirSync(outputDir, { recursive: true });

const tracer = new potrace.Potrace();
tracer.setParameters({
  threshold: 92,
  blackOnWhite: false,
  color: '#F6C2AE',
  background: 'transparent',
  turdSize: 12,
  alphaMax: 1,
  optCurve: true,
  optTolerance: 0.12
});

tracer.loadImage(input, function onLoad(error) {
  if (error) throw error;
  const svg = tracer.getSVG();
  const pathTag = svg.match(/<path[\s\S]*?<\/path>|<path[\s\S]*?\/>/i)?.[0];
  if (!pathTag) throw new Error('Vector path was not generated');

  const normalizedPath = pathTag.replace(/fill="[^"]*"/, 'fill="currentColor"');
  const symbol = `<g id="peach-claw-emblem">${normalizedPath}</g>`;
  const wrap = (content, viewBox = '0 0 1024 1024', extra = '') =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" ${extra}>${content}</svg>\n`;

  fs.writeFileSync(path.join(outputDir, 'emblem-primary.svg'),
    wrap(`<title>Peach &amp; Claw emblem</title><g style="color:#F6C2AE">${symbol}</g>`));
  fs.writeFileSync(path.join(outputDir, 'emblem-dark.svg'),
    wrap(`<title>Peach &amp; Claw emblem on ink</title><rect width="1024" height="1024" rx="112" fill="#0C090A"/><g style="color:#F6C2AE">${symbol}</g>`));
  fs.writeFileSync(path.join(outputDir, 'emblem-light.svg'),
    wrap(`<title>Peach &amp; Claw emblem on paper</title><rect width="1024" height="1024" rx="112" fill="#F5DED4"/><g style="color:#0C090A">${symbol}</g>`));
  fs.writeFileSync(path.join(outputDir, 'emblem-monochrome.svg'),
    wrap(`<title>Peach &amp; Claw monochrome emblem</title><g style="color:#000">${symbol}</g>`));

  const scaled = `<g transform="translate(56 56) scale(.25)">${normalizedPath}</g>`;
  const wordmark = `<text x="350" y="205" fill="#F6C2AE" font-family="Fraunces, Georgia, serif" font-size="124" font-weight="600" letter-spacing="-5">Peach &amp; Claw</text><text x="355" y="274" fill="#B9A5A8" font-family="Sora, Arial, sans-serif" font-size="27" font-weight="500" letter-spacing="7">SOFT TOUCH. SHARP JUDGMENT.</text>`;
  fs.writeFileSync(path.join(outputDir, 'wordmark-horizontal-dark.svg'),
    wrap(`<title>Peach &amp; Claw horizontal wordmark</title><rect width="1600" height="340" fill="#0C090A"/><g style="color:#F6C2AE">${scaled}</g>${wordmark}`, '0 0 1600 340'));
  fs.writeFileSync(path.join(outputDir, 'wordmark-horizontal-light.svg'),
    wrap(`<title>Peach &amp; Claw horizontal wordmark</title><rect width="1600" height="340" fill="#F5DED4"/><g style="color:#0C090A">${scaled}</g>${wordmark.replaceAll('#F6C2AE', '#0C090A').replaceAll('#B9A5A8', '#78263E')}`, '0 0 1600 340'));

  const monogram = `<rect width="512" height="512" rx="72" fill="#0C090A"/><path d="M72 382V130h92c72 0 114 34 114 98 0 62-42 100-114 100h-28v54H72zm64-112h25c35 0 53-13 53-41 0-26-18-39-53-39h-25v80z" fill="#F6C2AE"/><path d="M450 176c-25-34-61-51-106-51-76 0-128 54-128 131s52 131 128 131c45 0 81-17 106-51l-48-38c-14 18-32 27-55 27-38 0-65-28-65-69s27-69 65-69c23 0 41 9 55 27l48-38z" fill="#F6C2AE"/><path d="M292 126h28l-94 260h-28z" fill="#EB716A"/>`;
  fs.writeFileSync(path.join(outputDir, 'monogram-pc.svg'), wrap(`<title>Peach &amp; Claw monogram</title>${monogram}`, '0 0 512 512'));
  fs.writeFileSync(path.join(outputDir, 'favicon.svg'), wrap(`<title>Peach &amp; Claw</title><rect width="1024" height="1024" rx="180" fill="#0C090A"/><g style="color:#F6C2AE">${symbol}</g>`));

  console.log(`Generated logo family in ${outputDir}`);
});

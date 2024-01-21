const { stdout } = process;
const path = require('path');
const absPath = path.resolve(__dirname, 'text.txt');
const fs = require('fs');
const readableStream = fs.createReadStream(absPath, 'utf-8');

readableStream.on('data', (chunk) => stdout.write(chunk));
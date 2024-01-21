const { stdin, stdout, exit } = process;
const path = require('path');
const absPath = path.resolve(__dirname, 'text.txt');
const fs = require('fs');
const writebleStream = fs.createWriteStream(absPath);

function goodBye() {
  stdout.write('Thank you for being with us');
  exit();
}

process.on('SIGINT', goodBye);

stdout.write('Please enter your text\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    goodBye();
  }
  writebleStream.write(data);
});

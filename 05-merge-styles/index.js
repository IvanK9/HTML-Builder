const path = require('path');
const fs = require('fs');
const stylesPath = path.resolve(__dirname, 'styles');
const projectDistPath = path.resolve(__dirname, 'project-dist/bundle.css');
const writebleStream = fs.createWriteStream(projectDistPath);

fs.readdir(stylesPath, { withFileTypes: true }, function (err, data) {
  data.forEach((el) => {
    const filePath = path.resolve(__dirname, 'styles', el.name);
    const extname = path.extname(filePath);
    console.log(`${el.name} - ${extname}`);
    fs.writeFile(projectDistPath, '', (err) => {
      if (err) throw err;
    });
    if (extname == '.css') {
      const readableStream = fs.createReadStream(
        path.resolve(stylesPath, el.name),
      );
      readableStream.on('data', (data) => {
        writebleStream.write(`${data.toString()}\n`);
      });
    }
  });
});

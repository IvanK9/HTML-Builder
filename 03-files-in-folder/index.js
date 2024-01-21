const path = require('path');
const absPath = path.resolve(__dirname, 'secret-folder');
const fs = require('fs');

fs.readdir(absPath, { withFileTypes: true }, function (err, data) {
  data.forEach((el) => {
    if (el.isFile()) {
      const filePath = path.resolve(__dirname, 'secret-folder', el.name);
      const extname = path.extname(filePath);
      fs.stat(filePath, (err, stats) => {
        const fileSize = stats.size;
        console.log(
          `${el.name.replace(extname, '')} - ${extname.replace('.', '')} - ${
            fileSize / 1024
          }kb`,
        );
      });
    }
  });
});

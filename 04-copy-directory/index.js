const path = require('path');
const absPath = path.resolve(__dirname, 'files');
const absCopyPath = path.resolve(__dirname, 'files-copy');
const fs = require('fs');

(function copyDir() {
  fs.mkdir(absCopyPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(absCopyPath, (err, files) => {
    if (err) throw err;
    for (let file of files) {
      fs.unlink(path.resolve(__dirname, 'files-copy', file), (err) => {
        if (err) throw err;
      });
    }
  });
  fs.readdir(absPath, { withFileTypes: true }, function (err, data) {
    data.forEach((el) => {
      const filePath = path.resolve(__dirname, 'files', el.name);
      const fileCopyPath = path.resolve(__dirname, 'files-copy', el.name);
      function callback(err) {
        if (err) throw err;
      }
      fs.copyFile(filePath, fileCopyPath, callback);
    });
  });
})();

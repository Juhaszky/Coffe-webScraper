const fs = require('fs');
const path = require('path');
function writeToFile(machines) {
  const writeStream = fs.createWriteStream('../output/data.txt');
  machines.forEach((machine) => {
    const line = Buffer.from(
      `Gép neve: ${machine.title} - kávéörlő neve: ${machine.grindder} - gép jelenlegi ára: ${machine.price} - gép speciális ára: ${machine.specialPrice} - gép múltbeli ára: ${machine.oldPrice} \n`,
      'utf8'
    )
      .toString('utf8')
      .trim();
    writeStream.write(line);
  });
  writeStream.end();
}
function readFromFile() {
  const filePath = path.resolve(__dirname, '../oldData.json');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          console.log(jsonData);
          resolve(jsonData);
        } catch (e) {
          resolve(e);
        }
      }
    });
  });
}
module.exports = { writeToFile, readFromFile };

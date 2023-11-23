const fs = require('fs');
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
module.exports = { writeToFile };

const { processTitle, processItemNumber } = require('./formatterController');

function processMachines(machines) {
  machines.forEach((machine) => {
    const processedTitle = processTitle(machine.title);
    machine.title = processedTitle.title;
    machine.itemNumber = processItemNumber(machine.itemNumber);
    machine.grinder = processedTitle.grinder;
    machine.kit = processedTitle.kit;
  });

  return machines;
}
module.exports = { processMachines };

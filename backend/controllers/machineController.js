const { processTitle } = require('./titleController');

function processMachines(machines) {
  machines.forEach((machine) => {
    const processedTitle = processTitle(machine.title);
    machine.title = processedTitle.title;
    machine.grinder = processedTitle.grinder;
    machine.kit = processedTitle.kit;
  });

  return machines;
}
/*exports.fetchMachines = (req, res) => {
  try {
    writeToFile(machines);
    res.json(machines);
  } catch (err) {
    console.error(err);
  }
};*/
//fetchMachines().then(machines => console.log(machines));
module.exports = { processMachines };

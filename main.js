var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function() {
	for(var name in Memory.creeps) {
		var creep = Game.creeps[name];
		if (name == "Miner2") {
			return;
		}
		if (name == "miner2" && creep == undefined) {
			creep = Game.creeps["Miner2"];
		}
		if (creep == undefined) {
			/* It's dead Jim */
			var err = Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], name);
			if (err != OK) {
				console.log("Could not spawn creep: " + err);
			}
		} else {
			switch (creep.memory.role) {
			case "miner":
				roleMiner.run(creep);
				break;
			case "upgrader":
				roleUpgrader.run(creep);
				break;
			default:
				console.log("Creep (" + name + ") has unknown role (" + creep.memory.role + ")");
				break;
			}
		}
	}
}
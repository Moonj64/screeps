var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function() {
	for(var name in Memory.creeps) {
		var creep = Game.creeps[name];
		if (creep == undefined) {
			/* It's dead Jim */
			var body = [WORK, CARRY, MOVE];
			switch (Memory.creeps[name].role) {
			case "miner":
				body = [WORK, WORK, CARRY, MOVE];
				break;
			case "upgrader":
				body = [WORK, CARRY, CARRY, MOVE, MOVE];
				break;
			case "builder"
				body = [WORK, CARRY, CARRY, MOVE, MOVE];
				break;
			default:	
				body = [WORK, CARRY, MOVE];
				break;
			}
			var err = Game.spawns["Spawn1"].spawnCreep(body, name);
			if (err != OK && err != ERR_NOT_ENOUGH_ENERGY) {
				console.log("Could not spawn creep (" + name + "), error code: " + err);
			}
		} else {
			switch (creep.memory.role) {
			case "miner":
				roleMiner.run(creep);
				break;
			case "upgrader":
				roleUpgrader.run(creep);
				break;
			case "builder":
				roleBuilder.run(creep);
				break;
			default:
				console.log("Creep (" + name + ") has unknown role (" + creep.memory.role + ")");
				break;
			}
		}
	}
}
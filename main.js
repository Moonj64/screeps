var roleMiner     = require('role.miner');
var roleUpgrader  = require('role.upgrader');
var roleBuilder   = require('role.builder');
var roleRestocker = require('role.restocker');

function get_role(role_name) {
	switch (role_name) {
	case "miner":
		return roleMiner;
	case "upgrader":
		return roleUpgrader;
	case "builder":
		return roleBuilder;
	case "restocker":
		return roleRestocker;
	default:
		return null;
	}
}


module.exports.loop = function() {
	for(var name in Memory.creeps) {
		var creep = Game.creeps[name];
		var role = get_role(Memory.creeps[name].role);
		if (role == null) {
			console.log("Creep (" + name + ") has unknown role (" + Memory.creeps[name].role + ")");
		} else {
			if (creep == undefined) {
				/* It's dead Jim */
				var body = role.get_body(Game.spawns["Spawn1"].room.controller.level);
				var err = Game.spawns["Spawn1"].spawnCreep(body, name);
				if (err != OK && err != ERR_NOT_ENOUGH_ENERGY) {
					console.log("Could not spawn creep (" + name + "), error code: " + err);
				}
			} else {
				role.run(creep);
			}
		}
	}
}
var creepBase = require('creep.base');

module.exports = {
	init: function(creep) {

	},

	run: function(creep) {
		if (creep.memory.working && creep.carry[RESOURCE_ENERGY] == 0) {
			/* Out of energy, go get refilled */
			creep.memory.working = false;
		} else if (!creep.memory.working && creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
			/* Energy refilled, proceed to upgrade */
			creep.memory.working = true;
		}

		if (creep.memory.working) {
			var spawn = Game.spawns["Spawn1"];
			if (spawn.energy != spawn.energyCapacity) {
				var err = creep.transfer(spawn, RESOURCE_ENERGY);
				if (err == ERR_NOT_IN_RANGE) {
					creepBase.moveTo(creep, spawn);
				}
				return;
			}

			var err = creep.upgradeController(creep.room.controller);
			if (err == ERR_NOT_IN_RANGE) {
				creepBase.moveTo(creep, creep.room.controller);
			}
		} else {
			creepBase.refill_energy(creep);
		}
	}
};
var creepBase = require('creep.base');

module.exports = {
	init: function(creep) {

	},

	run: function(creep) {
		if (creepBase.ready_to_work(creep)) {
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
		}
	},

	get_body: function(level) {
		switch (level) {
		case 0:
		case 1:
			/* Just starting, cost must be <= 300 */
			return [ WORK, CARRY, MOVE, MOVE ];
		case 2:
		case 3:
		default:
			/* 10 extensions possible, total energy 800 */
			return [ WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE ];
		}
	}
};
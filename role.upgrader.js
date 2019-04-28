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
	}
};
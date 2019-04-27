
module.exports = {
	run: function(creep) {
		if (creep.memory.upgrading && creep.carry[RESOURCE_ENERGY] == 0) {
			/* Out of energy, go get refilled */
			creep.memory.upgrading = false;
		} else if (!creep.memory.upgrading && creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
			/* Energy refilled, proceed to upgrade */
			creep.memory.upgrading = true;
		}

		if (creep.memory.upgrading) {
			var spawn = Game.spawns["Spawn1"];
			if (spawn.energy != spawn.energyCapacity) {
				var err = creep.transfer(spawn, RESOURCE_ENERGY);
				if (err == ERR_NOT_IN_RANGE) {
					creep.moveTo(spawn);
				}
			}

			var err = creep.upgradeController(creep.room.controller);
			if (err == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
		} else {
			if (creep.memory.energy_source != undefined) {
				var energy_source = Game.getObjectById(creep.memory.energy_source);
				var	err = creep.withdraw(energy_source, RESOURCE_ENERGY);
				if (err == ERR_NOT_IN_RANGE) {
					creep.moveTo(energy_source);
				}
			}
		}
	}
};
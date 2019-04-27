
module.exports = {
	run: function(creep) {
		if (creep.memory.upgrading && creep.carry[RESOURCE_ENERGY] == 0) {
			creep.memory.upgrading = false;
		} else if (!creep.memory.upgrading && creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
			creep.memory.upgrading = true;
		}

		if (creep.memory.upgrading) {
			var err = creep.upgradeController(creep.room.controller);
			if (err == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
		} else {
			if (creep.memory.source != undefined) {
				var energy_source = Game.getObjectById(creep.memory.energy_source);
				var	err = creep.withdraw(energy_source, RESOURCE_ENERGY);
				if (err == ERR_NOT_IN_RANGE) {
					creep.MoveTo(energy_source);
				}
			}
		}
	}
};
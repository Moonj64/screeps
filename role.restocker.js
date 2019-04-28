var creepBase = require('creep.base');

function find_restock_targets(creep) {
	var targets = creep.room.find(FIND_STRUCTURES, {
		filter:function(structure) {
			switch(structure.structureType) {
			case STRUCTURE_SPAWN:
			case STRUCTURE_EXTENSION:
			case STRUCTURE_TOWER:
				return true;
			default:
				return false;
			}
		}
	});

}

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
			
		} else {
			creepBase.refill_energy(creep);
		}
	}
};
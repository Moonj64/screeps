var creepBase = require('creep.base');

function find_restock_targets(creep) {
	var targets = creep.room.find(FIND_STRUCTURES, {
		filter:function(structure) {
			switch(structure.structureType) {
			case STRUCTURE_SPAWN:
			case STRUCTURE_EXTENSION:
			case STRUCTURE_TOWER:
				return structure.energy < structure.energyCapacity;
			default:
				return false;
			}
		}
	});
	targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
}

module.exports = {
	init: function(creep) {

	},

	run: function(creep) {
		if (creepBase.ready_to_work(creep)) {

		}
	}
};
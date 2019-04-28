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
		if (creepBase.ready_to_work(creep)) {

		}
	}
};
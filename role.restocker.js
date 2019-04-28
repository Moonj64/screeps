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
	return targets;
}

module.exports = {
	init: function(creep) {

	},

	run: function(creep) {
		if (creepBase.ready_to_work(creep)) {
			var restock_target = Game.getObjectById(creep.memory.restock_target);
			if (restock_target == undefined) {
				targets = find_restock_targets(creep);
				if (targets.length == 0) {
					/* Nothing to restock */
					return;
				}
				restock_target = targets[0];
				creep.memory.restock_target = restock_target.id;
			}
			var err = creep.transfer(restock_target, RESOURCE_ENERGY);
			if (err == ERR_NOT_IN_RANGE) {
				creepBase.moveTo(creep, restock_target);
			}
		}
	}
};
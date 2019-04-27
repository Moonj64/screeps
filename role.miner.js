
module.exports = {
	run: function(creep) {
		if (creep.memory.worksource == undefined) {
			/* Dont have a worksource, set it */
			var sources = creep.room.find(FIND_SOURCES);
			creep.memory.worksource = sources[0].id;
		}
		var worksource = Game.getObjectById(creep.memory.worksource);

		var range = creep.pos.getRangeTo(worksource);
		if (range > 1) {
			creep.moveTo(worksource);
			return;
		}

		if (creep.carry[RESOURCE_ENERGY] != creep.carryCapacity) {
			creep.harvest(worksource);
			return;
		}
	}
};
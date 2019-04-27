
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

		var energy_caches = creep.pos.findInRange(FIND_STRUCTURES, 1, { 
			filter:function(structure) { 
				switch (structure.structureType) {
				case STRUCTURE_STORAGE:
				case STRUCTURE_CONTAINER:
					return structure.store[RESOURCE_ENERGY] != structure.storeCapacity;
				case STRUCTURE_LINK:
				case STRUCTURE_SPAWN:
				case STRUCTURE_EXTENSION:
				case STRUCTURE_TOWER:
					/* true only if energy required, false otherwise */
					return structure.energy != structure.energyCapacity;
				default:
					return false;
				}
			}});

		if (energy_caches.length == 0) {
			/* Nowhere to drop off energy, look for construction sites */
			var construction_sites = creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1);

			if (construction_sites.length == 0) {
				/* Nothing to build either, try to build a container on current location */
				creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
			} else {
				/* We have something to build, build it! */
				creep.build(construction_sites[0]);
			}
		} else {
			/* We have a cache to drop off in, drop off our energy there */
			creep.transfer(energy_caches[0], RESOURCE_ENERGY);
		}
	}
};
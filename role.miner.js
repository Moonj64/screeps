

function miner_refill_priority(structure_type) {
	switch (structure_type) {
	case STRUCTURE_STORAGE:
		return 1000;
	case STRUCTURE_CONTAINER:
		return 100;
	case STRUCTURE_LINK:
		return 50;
	case STRUCTURE_SPAWN:
		return 1500;
	case STRUCTURE_EXTENSION:
		return 1500;
	case STRUCTURE_TOWER:
		return 1250;
	default:
		return 0;
	}
}

function update_energy_caches(creep) {
	var energy_cache_objects = creep.pos.findInRange(FIND_STRUCTURES, 1, { 
		filter:function(structure) { 
			return (miner_refill_priority(structure.structureType) > 0);
		}});
	energy_cache_objects.sort(function (a, b) {
		return (miner_refill_priority(a.structureType) - miner_refill_priority(b.structureType));
	});

	var energy_cache_ids = [];
	for (energy_cache_object in energy_cache_objects) {
		energy_cache_ids.push(energy_cache_object.id);
	}

	creep.memory.energy_caches = energy_cache_ids;
}

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

		if (creep.carry[RESOURCE_ENERGY] != creep.carryCapacity && ((creep.carry[RESOURCE_ENERGY] % 2) == 0)) {
			creep.harvest(worksource);
			return;
		}

		var repair_structures = creep.pos.findInRange(FIND_STRUCTURES, 1, {
			filter:function(structure) {
				return structure.hits < (structure.hitsMax * 0.9);
		}});

		if (repair_structures.length != 0) {
			creep.repair(repair_structures[0]);
			return;
		}

		update_energy_caches(creep);

		if (creep.memory.energy_caches.length == 0) {
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
			creep.transfer(Game.getObjectById(creep.memory.energy_caches[0]), RESOURCE_ENERGY);
		}
	}
};
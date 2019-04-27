var roleUpgrader = require('role.upgrader');
var creepBase = require('creep.base');

module.exports = {
	init: function(creep) {
		
	}

	run: function(creep) {
		if (creep.memory.working && creep.carry[RESOURCE_ENERGY] == 0) {
			/* Out of energy, go get refilled */
			creep.memory.working = false;
		} else if (!creep.memory.working && creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
			/* Energy refilled, proceed to upgrade */
			creep.memory.working = true;
		}

		if (creep.memory.working) {
			var build_target;
			if (creep.memory.build_target == undefined || 
				((build_target = Game.getObjectById(creep.memory.build_target)) == undefined)) {
				/* Either no defined build target or our build target doesnt exist 
				 * In either case, get a new build target
				 */
				var construction_sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
				if (construction_sites.length == 0) {
					/* No sites to build, act as an upgrader */
					roleUpgrader.run(creep);
					return;
				}
				build_target = construction_sites[0];
				creep.memory.build_target = build_target.id;
			}
			var err = creep.build(build_target);
			if (err == ERR_NOT_IN_RANGE) {
				creep.moveTo(build_target);
			}
			
		} else {
			creepBase.refill_energy(creep);
		}
	}
}
var roleUpgrader = require('role.upgrader');
var creepBase = require('creep.base');

module.exports = {
	init: function(creep) {

	},

	run: function(creep) {
		if (creepBase.ready_to_work(creep)) {
			var build_target = Game.getObjectById(creep.memory.build_target);
			if (build_target == undefined) {
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
				creepBase.moveTo(creep, build_target);
			}
		}
	}
}
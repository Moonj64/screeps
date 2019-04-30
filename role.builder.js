var roleUpgrader = require('role.upgrader');
var creepBase = require('creep.base');

function run_repair(creep) {
	var repair_target = Game.getObjectById(creep.memory.repair_target);
	if (repair_target == undefined || repair_target.hits == repair_target.hitsMax) {
		/* Either no defined repair target, the target doesnt exist, or it's at full health */
		repair_targets = creep.room.find(FIND_STRUCTURES, {
			filter: function(target) {
				return target.hits < target.hitsMax;
			}
		});
		if (repair_targets.length == 0) {
			return ERR_NOT_FOUND;
		}
		repair_target = repair_targets[0];
		creep.memory.repair_target = repair_target.id;
	}
	var err = creep.repair(repair_target);
	if (err == ERR_NOT_IN_RANGE) {
		creepBase.moveTo(creep, repair_target);
	}
	return err;
}

function run_build(creep) {
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
	return err;
}

module.exports = {
	init: function(creep) {

	},

	run: function(creep) {
		if (creepBase.ready_to_work(creep)) {
			var err = run_repair(creep);
			if (err != OK && err != ERR_NOT_IN_RANGE) {
				err = run_build(creep);
			}
		}
	},

	get_body: function(level) {
		switch (level) {
		case 0:
		case 1:
			/* Just starting, cost must be <= 300 */
			return [ WORK, CARRY, MOVE, MOVE ];
		case 2:
			/* 5 extensions possible, total energy 550 */
			return [ WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE ];
		case 3:
		default:
			/* 10 extensions possible, total energy 800 */
			return [ WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE ];
		}
	}
}
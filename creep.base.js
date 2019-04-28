
module.exports = {
	refill_energy: function(creep) {
		if (creep.memory.energy_source == undefined) {
			/* TODO logic to acquire an energy source*/
			return;
		}
		var energy_source = Game.getObjectById(creep.memory.energy_source);
		var	err = creep.withdraw(energy_source, RESOURCE_ENERGY);
		if (err == ERR_NOT_IN_RANGE) {
			this.moveTo(creep, energy_source);
		}
	},

	moveTo: function(creep, target) {
		creep.moveTo(target, {
			visualizePathStyle: { 
				stroke: '#fff', 
				strokeWidth: .15,
    			opacity: .2,
    			lineStyle: 'dashed'
    		}
    	});
	},

	ready_to_work: function(creep) {
		if (creep.memory.working && creep.carry[RESOURCE_ENERGY] == 0) {
			/* Out of energy, go get refilled */
			creep.memory.working = false;
		} else if (!creep.memory.working && creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
			/* Energy refilled, proceed to upgrade */
			creep.memory.working = true;
		}
		if (!creep.memory.working) {
			this.refill_energy(creep);
		}
		return creep.memory.working;
	}
}
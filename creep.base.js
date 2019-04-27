
module.exports = {
	refill_energy: function(creep) {
		if (creep.memory.energy_source == undefined) {
			/* TODO logic to acquire an energy source*/
			return;
		}
		var energy_source = Game.getObjectById(creep.memory.energy_source);
		var	err = creep.withdraw(energy_source, RESOURCE_ENERGY);
		if (err == ERR_NOT_IN_RANGE) {
			creep.moveTo(energy_source);
		}
	}
}
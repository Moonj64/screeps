
module.exports = {
	run: function(creep) {
		if (creep.memory.workroom == undefined) {
			/* Dont have a workroom, set it */
			creep.memory.workroom = creep.room.name;
		}
		var room = Game.rooms[creep.memory.workroom];

		if (creep.memory.worksource == undefined) {
			/* Dont have a worksource, set it */
			var sources = creep.room.find(FIND_SOURCES);
			creep.memory.worksource = sources[0].id;
		}
		var worksource = Game.getObjectById(creep.memory.worksource);

		var range = creep.pos.getRangeTo(worksource);
		console.log(range);
		if (range > 1) {
			creep.moveTo(worksource);
		} else {
			console.log("I'm here!");
		}
	}
};
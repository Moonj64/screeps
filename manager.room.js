function checkMiners(room) {
	if (room.memory.sources == undefined) {
		var sources = room.find(FIND_SOURCES);
		room.memory.sources = [];
		_.forEach(sources, function(source) {
			room.memory.sources.push({ id:source.id });
		});
	}
	_.forEach(room.memory.sources, function(source_mem) {
		var source = Game.getObjectById(source_mem.id);

	});
}


module.exports = {
	run: function(room) {
		checkMiners(room);
		for(var name in room.memory.creeps) {

		}
	}
}

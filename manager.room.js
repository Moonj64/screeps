function init(room) {
//	Memory.rooms[room.name] = {};
//	room.memory = Memory.rooms[room.name];
	room.memory = {};

	var sources = room.find(FIND_SOURCES);
	room.memory.sources = [];
	_.forEach(sources, function(source) {
		room.memory.sources[source.id] = { id:source.id };
	});
}



function checkMiners(room) {
	_.forEach(room.memory.sources, function(source_mem) {
		var source = Game.getObjectById(source_mem.id);

	});
}


module.exports = {
	run: function(room) {
//		if (room.memory == undefined) {
			init(room);
//		}
		checkMiners(room);
		for(var name in room.memory.creeps) {

		}
	}
}

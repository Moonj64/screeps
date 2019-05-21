function checkMiners(room) {
	if (room.memory.sources == undefined) {
		var sources = room.find(FIND_SOURCES);
		room.memory.sources = [];
		_.forEach(sources, function(source) {
			room.memory.sources.push(source.id);
		});
	}

}


module.exports = {
	run: function(room) {
		for(var name in room.memory.creeps) {

		}
	}
}

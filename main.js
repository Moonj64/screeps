
module.exports.loop = function() {
	for(var name in Memory.creeps) {
		var creep = Game.creeps[name];
		console.log(creep);
	}
}
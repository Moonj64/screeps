
module.exports.loop = function() {
	for(var name in Memory.creeps) {
		var creep = Game.creeps[name];
		if (creep == undefined) {
			/* It's dead Jim */
			var err = Game.Spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], name);
			if (err != OK) {
				console.log(err);
			}
		} else {
			console.log("success");
		}
	}
}
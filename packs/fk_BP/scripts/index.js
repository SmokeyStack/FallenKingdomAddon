import { BlockLocation, EntityQueryOptions, MinecraftBlockTypes, world } from "mojang-minecraft";

let currentTick = 0;

// && Math.floor(Math.random() * 255) === 0

function updateBlock(block) {
	if (block.id == "fk:electrified_grass") {
		if ((world.getDimension("overworld").getBlock(block.location.offset(0, 1, 0)).type != MinecraftBlockTypes.air)) {
			block.setType(MinecraftBlockTypes.get("fk:electrified_dirt"));
		} else {
			let direction = Math.round(Math.random() * 3);
			switch (direction) {
				case 0:
					if ((world.getDimension("overworld").getBlock(block.location.offset(1, 1, 0)).type == MinecraftBlockTypes.air) && (world.getDimension("overworld").getBlock(block.location.offset(1, 0, 0)).type == MinecraftBlockTypes.dirt)) {
						world.getDimension("overworld").getBlock(block.location.offset(1, 0, 0)).setType(MinecraftBlockTypes.get("fk:electrified_grass"));
					}
					break;
				case 1:
					if ((world.getDimension("overworld").getBlock(block.location.offset(-1, 1, 0)).type == MinecraftBlockTypes.air) && (world.getDimension("overworld").getBlock(block.location.offset(-1, 0, 0)).type == MinecraftBlockTypes.dirt)) {
						world.getDimension("overworld").getBlock(block.location.offset(-1, 0, 0)).setType(MinecraftBlockTypes.get("fk:electrified_grass"));
					}
					break;
				case 2:
					if ((world.getDimension("overworld").getBlock(block.location.offset(0, 1, 1)).type == MinecraftBlockTypes.air) && (world.getDimension("overworld").getBlock(block.location.offset(0, 0, 1)).type == MinecraftBlockTypes.dirt)) {
						world.getDimension("overworld").getBlock(block.location.offset(0, 0, 1)).setType(MinecraftBlockTypes.get("fk:electrified_grass"));
					}
					break;
				case 3:
					if ((world.getDimension("overworld").getBlock(block.location.offset(0, 1, -1)).type == MinecraftBlockTypes.air) && (world.getDimension("overworld").getBlock(block.location.offset(0, 0, -1)).type == MinecraftBlockTypes.dirt)) {
						world.getDimension("overworld").getBlock(block.location.offset(0, 0, -1)).setType(MinecraftBlockTypes.get("fk:electrified_grass"));
					}
					break;
			}
		}
	}
}

function checkForblocks() {
	currentTick++;
	if (currentTick % 20 == 0) {
		for (var a = -3; a < 3; a++) {
			for (var b = -3; b < 3; b++) {
				for (var c = -3; c < 3; c++) {
					var checkPlayer = world.getDimension("overworld").getPlayers(new EntityQueryOptions());
					for (const player of checkPlayer) {
						var checkBlock = world.getDimension("overworld").getBlock(new BlockLocation(Math.trunc(player.location.x) + a, Math.trunc(player.location.y) + b, Math.trunc(player.location.z) + c));
						updateBlock(checkBlock);
					}
				}
			}
		}
	}
}

world.events.tick.subscribe(checkForblocks);
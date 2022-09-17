// particles - special
const AIR = 0;
const FIRE = 10;

// particles - solids
const WALL = 100;
const WOOD = 110;
const PLANT = 120;

// particles - powders
const SAND = 300;
const STONE = 310;
const GUNPOWDER = 320;
const EMBER = 330;
const SEED = 340;
const SNOW = 350;

// particles - liquids
const WATER = 500;
const COMPRESSED_WATER = 501;
const LAVA = 510;
const ACID = 520;
const OIL = 530;

// particles - gases
const STEAM = 750;

// pixel rules
const GRAVITY = "gravity";
const SLOW_GRAVITY = "slowGravity";
const ANTIGRAVITY = "antigravity";
const SAND_PILE = "sandPile";
const LIQUID_SPREAD = "liquidSpread";
const COMPRESSED_WATER_SPREAD = "doubleWaterSpread";
const SINK_LIKE_STONE = "sinkLikeStone";
const SINK_LIKE_SAND = "sinkLikeSand";
const LAVA_EVAPORATE = "lavaEvaporate";
const LAVA_SPREAD = "lavaSpread";
const ACID_EVAPORATE = "acidEvaporate";
const GAS_FLOAT = "gasFloat";
const GAS_SPREAD = "gasSpread";
const FIRE_SPREAD = "fireSpread";
const VOLATILE = "volatile";
const EMBER_VOLATILE = "emberVolatile";
const COMPRESS_WATER = "compressWater";
const SEED_RULE = "seedRuleTemp";

// pixel definitions
let PIXEL_DEF = {
	add_rule: (sourceTypes, rule) => {
		for (let st = 0; st < sourceTypes.length; st++) {
			if (sourceTypes[st] in PIXEL_DEF) {
				PIXEL_DEF[sourceTypes[st]].push(rule);
			} else {
				PIXEL_DEF[sourceTypes[st]] = [rule];
			}
		}
	},
}

function setupRules() {
	PIXEL_DEF.add_rule([SAND, STONE, GUNPOWDER, EMBER, SEED, WATER, COMPRESSED_WATER, LAVA, ACID, OIL], GRAVITY); // falling straight through air

	PIXEL_DEF.add_rule([SAND, GUNPOWDER, EMBER], SAND_PILE); // pilage of sand
	PIXEL_DEF.add_rule([SAND, GUNPOWDER], SINK_LIKE_SAND); // sinkage of sand through water, and spreading

	PIXEL_DEF.add_rule([WATER, COMPRESSED_WATER, ACID, OIL], LIQUID_SPREAD); // spread of water

	PIXEL_DEF.add_rule([STONE], SINK_LIKE_STONE); // sinkage of stone through sand and water

	PIXEL_DEF.add_rule([LAVA], LAVA_EVAPORATE); // evaporate whitelist
	PIXEL_DEF.add_rule([LAVA], LAVA_SPREAD); // spread of lava, like water, but slower
	PIXEL_DEF.lava_whitelist = [WATER, COMPRESSED_WATER]; // whitelist

	PIXEL_DEF.add_rule([ACID], ACID_EVAPORATE); // evaporate everything thats not in the blacklist
	PIXEL_DEF.acid_blacklist = [AIR, WALL, ACID, STEAM]; // blacklist

	PIXEL_DEF.add_rule([STEAM, FIRE], ANTIGRAVITY); // antigravity
	PIXEL_DEF.add_rule([STEAM, FIRE], GAS_SPREAD); // spread of gasses

	PIXEL_DEF.add_rule([FIRE, LAVA, EMBER], FIRE_SPREAD); // spread of fire
	PIXEL_DEF.add_rule([FIRE, STEAM, SNOW], VOLATILE); // dissapear
	PIXEL_DEF.add_rule([EMBER], EMBER_VOLATILE); // turn to fire
	PIXEL_DEF.combustible = [GUNPOWDER, WOOD, SEED, PLANT, OIL]; // list of combustible particles

	PIXEL_DEF.add_rule([WATER, COMPRESSED_WATER], COMPRESS_WATER); // water compression rule
	PIXEL_DEF.add_rule([COMPRESSED_WATER], COMPRESSED_WATER_SPREAD); // heavier water spread

	PIXEL_DEF.add_rule([SEED], SEED_RULE); // seed growth

	PIXEL_DEF.add_rule([SNOW], SLOW_GRAVITY); // snow slow fall
}
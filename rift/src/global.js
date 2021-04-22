let globals = {
	values:
	{
		burstChance: 150,
	},
	unlocks: 
	{
		tabs:
		[
			"#clicker",
			"#_log",
			"#resources",
			"#purchases",
			"#activities",
			"#population",
		],
		tabbuttons_purchases:
		[
			"#tab-buildings-button",
			"#tab-upgrades-button",
			"#tab-workers-button",
		],
		tabbuttons_activities:
		[
			"#tab-mattercondenser-button",
			"#tab-exploration-button",
			"#tab-warp-button",
		],
		resources:
		[
			"#resource-energy",
			"#resource-carbon",
			"#resource-oxygen",
			"#resource-moonstone",
			"#resource-darkmatter",
			"#resource-exoticmatter",
		],
		buildings:
		[
			"#building-spacevacuum",
			"#building-energygun",
			"#building-storagerift",
			"#building-energycondenser",
			"#building-carboncube",
			"#building-oxygentank",
			"#building-tribute",
		]
	},
	resources:
	[
		{name: "Raw Energy", description: "You're unsure how you can hold this, or what it even is", e: "#resource-energy", capped: true, maxAmount: 1000},
		{name: "Carbon", description: "The most basic building element", e: "#resource-carbon", capped: true, maxAmount: 100},
		{name: "Oxygen", description: "A breathable, flammable gas", e: "#resource-oxygen", capped: true, maxAmount: 500},
		{name: "Moonstone", description: "Tiny sparkly, coarse rocks, that react with Oxygen. Very rare", e: "#resource-moonstone", capped: false, maxAmount: -1},
		{name: "Dark Matter", description: "A really dense Material, you cant look at it directly", e: "#resource-darkmatter", capped: false, maxAmount: -1},
		{name: "Exotic Matter", description: "???", e: "#resource-exoticmatter", capped: false, maxAmount: -1},
	],
	mc:
	{
		recipes:
		[
			{
				index: 1,
				name: "Carbon",
				costs:
				[
					{index: 0, amount: 75},
				],

			},
			{
				index: 2,
				name: "Oxygen",
				costs:
				[
					{index: 0, amount: 50},
				],

			},
		],
	},
	buildings:
	[
		{
			name: "Space Vacuum", 
			costs: [
				{index: 0, amount: 25},
			], 
			costMult: 1.15,
			eps: 0.1,
			cps: 0,
			epc: 0,
			description: "Continually generates 0.1 EpS from the Rift",
		},
		{
			name: "Energy Gun", 
			costs: [
				{index: 0, amount: 250}, 
			], 
			costMult: 1.152, 
			eps: 0,
			cps: 15,
			epc: 1,
			description: "Shoots the Rift every 5 Seconds, adding 1 Energy to it.",
		},
		{
			name: "Storage Rift", 
			costs: [
				{index: 0, amount: 500}, 
			], 
			costMult: 2, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "Doubles your Energy Storage",
		},
		{
			name: "Energy Condenser", 
			costs: [
				{index: 0, amount: 3000}, 
			], 
			costMult: 1.1, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "Unlocks the Creation of Matter from Raw Energy, more Condensers mean faster Production",
		},
		{
			name: "Carbon Cube", 
			costs: [
				{index: 0, amount: 2000}, 
				{index: 1, amount: 75}, 
			], 
			costMult: 2, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "Doubles your Carbon Storage",
		},
		{
			name: "Oxygen Tank", 
			costs: [
				{index: 0, amount: 3500}, 
				{index: 1, amount: 240}, 
			], 
			costMult: 2, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "Doubles your Oxygen Storage",
		},
		{
			name: "Tribute", 
			costs: [
				{index: 0, amount: 10000}, 
				{index: 1, amount: 500}, 
			], 
			costMult: 1.05, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "You gain 1% more Resources from all sources.",
		},
	],
	upgrades:
	[
		{
			name: "Better Vacuums ", 
			costs: [
				{index: 0, amount: 200},
			], 
			costMult: 3.5, 
			description: "Your Space Vacuums are 50% more efficient",
		},
		{
			name: "Faster Multiplier ", 
			costs: [
				{index: 0, amount: 400},
			], 
			costMult: 4, 
			description: "The Multiplier increases 5% faster",
		},
		{
			name: "Rift Stabilization ", 
			costs: [
				{index: 0, amount: 750},
			], 
			costMult: 4.5, 
			description: "The Burst Chance of the Rift is reduced by 25%",
		},
		{
			name: "Improved Energy Gun ", 
			costs: [
				{index: 0, amount: 750},
			], 
			costMult: 7, 
			description: "Each Shot of the Energy Guns generates 5% of Rift Energy",
		},
		{
			name: "Faster Matter Creation ", 
			costs: [
				{index: 0, amount: 1000},
				{index: 1, amount: 50},
				{index: 2, amount: 100},
			], 
			costMult: 2.5, 
			description: "Matter is created 10% faster",
		},
	],
};

const BASE = {
	resources:
	[
		{name: "Raw Energy", description: "You're unsure how you can hold this, or what it even is", e: "#resource-energy", capped: true, maxAmount: 1000},
		{name: "Carbon", description: "The most basic building element", e: "#resource-carbon", capped: true, maxAmount: 100},
		{name: "Oxygen", description: "A breathable, flammable gas", e: "#resource-oxygen", capped: true, maxAmount: 500},
		{name: "Moonstone", description: "Tiny sparkly, coarse rocks, that react with Oxygen. Very rare", e: "#resource-moonstone", capped: false, maxAmount: -1},
		{name: "Dark Matter", description: "A really dense Material, you cant look at it directly", e: "#resource-darkmatter", capped: false, maxAmount: -1},
		{name: "Exotic Matter", description: "???", e: "#resource-exoticmatter", capped: false, maxAmount: -1},
	],
	buildings:
	[
		{
			name: "Space Vacuum", 
			costs: [
				{index: 0, amount: 25},
			], 
			costMult: 1.15,
			eps: 0.1,
			cps: 0,
			epc: 0,
			description: "Continually generates 0.1 EpS from the Rift",
		},
		{
			name: "Energy Gun", 
			costs: [
				{index: 0, amount: 250}, 
			], 
			costMult: 1.152, 
			eps: 0,
			cps: 15,
			epc: 1,
			description: "Shoots the Rift every 5 Seconds, adding 1 Energy to it.",
		},
		{
			name: "Storage Rift", 
			costs: [
				{index: 0, amount: 500}, 
			], 
			costMult: 2, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "Doubles your Energy Storage",
		},
		{
			name: "Energy Condenser", 
			costs: [
				{index: 0, amount: 3000}, 
			], 
			costMult: 1.1, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "Unlocks the Creation of Matter from Raw Energy, more Condensers mean faster Production",
		},
		{
			name: "Carbon Cube", 
			costs: [
				{index: 0, amount: 2000}, 
				{index: 1, amount: 75}, 
			], 
			costMult: 2, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "Doubles your Carbon Storage",
		},
		{
			name: "Oxygen Tanks", 
			costs: [
				{index: 0, amount: 3500}, 
				{index: 1, amount: 240}, 
			], 
			costMult: 2, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "Doubles your Oxygen Storage",
		},
		{
			name: "Tribute", 
			costs: [
				{index: 0, amount: 10000}, 
				{index: 1, amount: 500}, 
			], 
			costMult: 1.05, 
			eps: 0,
			cps: 0,
			epc: 0,
			description: "You gain 1% more Resources from all sources.",
		},
	],
	upgrades:
	[
		{
			name: "Space Vacuum Mk", 
			costs: [
				{index: 0, amount: 200},
			], 
			costMult: 3.5, 
			description: "Your Space Vacuums are 50% more efficient",
		},
		{
			name: "Faster Multiplier ", 
			costs: [
				{index: 0, amount: 400},
			], 
			costMult: 4, 
			description: "The Multiplier increases 20% faster",
		},
		{
			name: "Rift Stabilization ", 
			costs: [
				{index: 0, amount: 750},
			], 
			costMult: 4.5, 
			description: "The Burst Chance of the Rift is reduced by 25%",
		},
		{
			name: "Improved Energy Gun ", 
			costs: [
				{index: 0, amount: 750},
			], 
			costMult: 7, 
			description: "Each Shot of the Energy Guns generates 5% of Rift Energy",
		},
		{
			name: "Faster Matter Creation ", 
			costs: [
				{index: 0, amount: 1000},
				{index: 1, amount: 50},
				{index: 2, amount: 100},
			], 
			costMult: 2.5, 
			description: "Matter is created 10% faster",
		},
	],
};
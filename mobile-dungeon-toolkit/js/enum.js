const EQUIPMENT_SLOTS = {
    WEAPON: 0,
    HELMET: 1,
    ARMOR: 2,
    NECKLACE: 3,
    RING: 4,
    OTHER: 5,
}

const ATTRIBUTES = {
    NONE: 0,
    STRENGTH: 1,
    DEXTERITY: 2,
    INTELLIGENCE: 3,
}

const ROLE = {
    OFFENSIVE: 1,
    DEFENSIVE: 2,
    CONTROL: 3,
    SUPPORT: 4,
}

const PERKS = {
    HEALTH_PERCENT: { id: 0, name: "Health Percent", icon: "images/heart.svg" },
    ATTACK_PERCENT: { id: 1, name: "Attack Percent", icon: "images/sword.svg" },
    DEFENCE_PERCENT: { id: 2, name: "Defence Percent", icon: "images/shield.svg" },
    AGILITY_PERCENT: { id: 3, name: "Agility Percent", icon: "images/boot.svg" },
    HEALTH_FLAT: { id: 4, name: "Health Flat", icon: "images/heart.svg" },
    ATTACK_FLAT: { id: 5, name: "Attack Flat", icon: "images/sword.svg" },
    DEFENCE_FLAT: { id: 6, name: "Defence Flat", icon: "images/shield.svg" },
    AGILITY_FLAT: { id: 7, name: "Agility Flat", icon: "images/boot.svg" },
    CRIT_CHANCE: { id: 8, name: "Critical Chance", icon: "images/percent.svg" },
    CRIT_RESISTANCE: { id: 9, name: "Critical Resistance", icon: "images/shield.svg" },
    CRIT_DAMAGE: { id: 10, name: "Critical Damage", icon: "images/crit.svg" },
    CRIT_DAMAGE_REDUCTION: { id: 11, name: "Critical Damage Reduction", icon: "images/shield.svg" },
    ACCURACY: { id: 12, name: "Accuracy", icon: "images/percent.svg" },
    RESISTANCE: { id: 13, name: "Resistance", icon: "images/shield.svg" },
    BOSS_DAMAGE: { id: 14, name: "Boss Damage", icon: "images/sword.svg" },
    BOSS_DAMAGE_REDUCTION: { id: 15, name: "Boss Damage Reduction", icon: "images/shield.svg" },
    AOE_DAMAGE_REDUCTION: { id: 16, name: "AoE Damage Reduction", icon: "images/shield.svg" },
    AP_DAMAGE_REDUCTION: { id: 17, name: "AP Damage Reduction", icon: "images/shield.svg" },
    LIFE_STEAL: { id: 18, name: "Life Steal", icon: "images/health_plus.svg" },
    HEALING_EFFICIENCY: { id: 19, name: "Healing Efficiency", icon: "images/healing.svg" },
    HEALING_RECOVERY: { id: 20, name: "Healing Recovery", icon: "images/healing.svg" },
    FIRE_DAMAGE: { id: 21, name: "Fire Damage", icon: "images/fire.svg" },
    NATURE_DAMAGE: { id: 22, name: "Nature Damage", icon: "images/nature.svg" },
    WATER_DAMAGE: { id: 23, name: "Water Damage", icon: "images/water.svg" },
    LIGHT_DAMAGE: { id: 24, name: "Light Damage", icon: "images/light.svg" },
    SHADOW_DAMAGE: { id: 25, name: "Shadow Damage", icon: "images/shadow.svg" },
    FIRE_DAMAGE_REDUCTION: { id: 26, name: "Fire Damage Reduction", icon: "images/fire.svg" },
    NATURE_DAMAGE_REDUCTION: { id: 27, name: "Nature Damage Reduction", icon: "images/light.svg" },
    WATER_DAMAGE_REDUCTION: { id: 28, name: "Water Damage Reduction", icon: "images/water.svg" },
    LIGHT_DAMAGE_REDUCTION: { id: 29, name: "Light Damage Reduction", icon: "images/light.svg" },
    SHADOW_DAMAGE_REDUCTION: { id: 30, name: "Shadow Damage Reduction", icon: "images/shadow.svg" },
}

const RARITY = {
    COMMON: 0,
    UNCOMMON: 1,
    RARE: 2,
    EPIC: 3,
    LEGENDARY: 4,
    MYTHICAL: 5,
}

const ELEMENT = {
    FIRE: 0,
    WATER: 1,
    NATURE: 2,
    LIGHT: 3,
    SHADOW: 4,
}

const UNIQUE_SKILLS = {
    NOTHING: 0,

    // STRENGTH
    PUMPKIN_SCYTHE: 100,
    DRILL_SLAMMER: 101,
    LIGHT_AXE: 102,
    FROST_BINDER: 103,
    HYDRAS_BITE: 104,
    VAMPIRES_STAKE: 105,
    SKY_PIERCER: 106,
    VOID_PIERCER_LANCE: 107,
    VOID_SPLITTER: 108,
    LIGHT_SWORD: 109,
    SUN_SPLITTER: 110,
    RUST_BINDER: 111,
    MAGMA_EDGE: 112,
    ROTTEN_MAUL: 113,
    HOOK_HAMMER: 114,
    TITANS_MAUL: 115,
    EARTH_BREAKER: 116,
    PROBLEM_SOLVER: 117,

    // INTELLIGENCE
    EMBRYONIC_CATALYST: 200,
    PEST_BRINGER: 201,
    MIASMA_STAFF: 201,
    FIRE_STARTER: 202,
    ICILE: 203,
    LIFE_CATALYST: 204,
    ARCANE_CODEX: 205,
    LAST_OATH: 206,
    BASILISKS_EYE: 207,
    RAINBOW_STAFF: 208,
    SEED_OF_ROT: 209,
    TOME_OF_ETERNAL_FROST: 210,
    GODS_VOW: 211,
    SOUL_CATALYST: 212,
    ARCANE_PULSE: 213,

    // AGILITY
    BLASTER: 300,
    BONE_BOW: 301,
    BOOMSTICK: 302,
    WOLF_CLAWS: 303,
    CORKSCREW_KNUCKLE: 304,
    SOUL_STABBER: 305,
    WHISPER_BLADE: 306,
    STARFIRE_BALLISTA: 307,
    BLACK_FEATHER_BOW: 308,
    SHADOW_SPIKES: 309,
    VORTEX_DANCER: 310,
    RELICFANG_DAGGER: 311,
    NEEDLE_POINT: 312,
    BRUTE_FORCE: 313,
}
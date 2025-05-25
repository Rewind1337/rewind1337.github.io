let ITEM_SETS = []
let TEMP_ITEM = {}
let SAVED_ITEMS = []

function add_set(name, setBonus, pieces, attributeRequirement) {
    let id = ITEM_SETS.length
    ITEM_SETS.push({ id: id, name: name, setBonus: setBonus, pieces: pieces, attributeRequirement: attributeRequirement })
}

function get_set_id_by_name(name) {
    for (let i = 0; i < ITEM_SETS.length; i++) {
        if (ITEM_SETS[i].name == name) { return ITEM_SETS[i].id }
    }
}

function save_item_local() {
    let slot = Number(TEMP_ITEM.slot)
    let id = Number(TEMP_ITEM.id)
    let selectedItem
    switch (slot) {
        case EQUIPMENT_SLOTS.WEAPON:
            selectedItem = deepCopy(BASE_ITEMS.WEAPONS[id])
            break;
        case EQUIPMENT_SLOTS.HELMET:
            selectedItem = deepCopy(BASE_ITEMS.HELMETS[id])
            break;
        case EQUIPMENT_SLOTS.ARMOR:
            selectedItem = deepCopy(BASE_ITEMS.ARMORS[id])
            break;
        case EQUIPMENT_SLOTS.NECKLACE:
            selectedItem = deepCopy(BASE_ITEMS.NECKLACES[id])
            break;
        case EQUIPMENT_SLOTS.RING:
            selectedItem = deepCopy(BASE_ITEMS.RINGS[id])
            break;
        case EQUIPMENT_SLOTS.OTHER:
            // not implemented
            break;

        default:
            break;
    }
    selectedItem.level = TEMP_ITEM.level
    SAVED_ITEMS.push(selectedItem)
    TEMP_ITEM = {}
}

// STRENGTH SETS
add_set("Downhole", [PERKS.HEALTH_PERCENT, PERKS.AP_DAMAGE_REDUCTION], 2, ATTRIBUTES.STRENGTH)
add_set("Thorn", [PERKS.HEALTH_PERCENT, PERKS.CRIT_RESISTANCE], 2, ATTRIBUTES.STRENGTH)
add_set("Breaker", [PERKS.DEFENCE_PERCENT, PERKS.BOSS_DAMAGE, PERKS.CRIT_CHANCE], 4, ATTRIBUTES.STRENGTH)
add_set("Goliath", [PERKS.ATTACK_PERCENT, PERKS.CRIT_DAMAGE, PERKS.LIFE_STEAL], 4, ATTRIBUTES.STRENGTH)
add_set("Titan", [PERKS.HEALTH_PERCENT, PERKS.BOSS_DAMAGE_REDUCTION, PERKS.AP_DAMAGE_REDUCTION], 4, ATTRIBUTES.STRENGTH)

// INTELLIGENCE SETS
add_set("Cyber", [PERKS.DEFENCE_PERCENT, PERKS.CRIT_DAMAGE_REDUCTION], 2, ATTRIBUTES.INTELLIGENCE)
add_set("Pumpkin", [PERKS.HEALTH_PERCENT, PERKS.RESISTANCE], 2, ATTRIBUTES.INTELLIGENCE)
add_set("Warlock", [PERKS.ATTACK_PERCENT, PERKS.CRIT_CHANCE, PERKS.CRIT_DAMAGE], 4, ATTRIBUTES.INTELLIGENCE)
add_set("Warden", [PERKS.HEALTH_PERCENT, PERKS.CRIT_RESISTANCE, PERKS.AP_DAMAGE_REDUCTION], 4, ATTRIBUTES.INTELLIGENCE)
add_set("Saint", [PERKS.AGILITY_PERCENT, PERKS.HEALING_RECOVERY, PERKS.HEALING_EFFICIENCY], 4, ATTRIBUTES.INTELLIGENCE)

// AGILITY SETS
add_set("Dragonbone", [PERKS.ATTACK_PERCENT, PERKS.CRIT_DAMAGE], 2, ATTRIBUTES.DEXTERITY)
add_set("Burnt", [PERKS.AGILITY_PERCENT, PERKS.ACCURACY], 2, ATTRIBUTES.DEXTERITY)
add_set("Hunter", [PERKS.ATTACK_PERCENT, PERKS.BOSS_DAMAGE, PERKS.CRIT_DAMAGE], 4, ATTRIBUTES.DEXTERITY)
add_set("Jester", [PERKS.AGILITY_PERCENT, PERKS.HEALING_RECOVERY, PERKS.CRIT_CHANCE], 4, ATTRIBUTES.DEXTERITY)
add_set("Specter", [PERKS.HEALTH_PERCENT, PERKS.CRIT_RESISTANCE, PERKS.AP_DAMAGE_REDUCTION], 4, ATTRIBUTES.DEXTERITY)

// SHARED SETS (ACCESSOIRES)
add_set("Celestial", [PERKS.AGILITY_PERCENT, PERKS.HEALING_EFFICIENCY], 2, ATTRIBUTES.NONE)
add_set("Weaver", [PERKS.ATTACK_PERCENT, PERKS.CRIT_CHANCE], 2, ATTRIBUTES.NONE)
add_set("Mystic", [PERKS.DEFENCE_PERCENT, PERKS.AOE_DAMAGE_REDUCTION], 2, ATTRIBUTES.NONE)

let BASE_ITEMS = {
    WEAPONS: [],
    HELMETS: [],
    ARMORS: [],
    NECKLACES: [],
    RINGS: [],
    OTHER: [] // not implemented
}

function add_weapon(name, attributes, unique, rarity, attributeRequirement) {
    let id = BASE_ITEMS.WEAPONS.length
    unique = (unique != undefined ? unique : UNIQUE_SKILLS.NOTHING)
    BASE_ITEMS.WEAPONS.push({ id: id, slot: EQUIPMENT_SLOTS.WEAPON, name: name, attributes: attributes, unique: unique, rarity: rarity, attributeRequirement: attributeRequirement })
}

//      WEAPONS
// STRENGTH WEAPONS
add_weapon("Pumpkin Scythe", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.PUMPKIN_SCYTHE, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Hydras Bite", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.HYDRAS_BITE, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Vampire's Stake", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.VAMPIRES_STAKE, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Light Axe", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.LIGHT_AXE, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Sky Piercer", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.SKY_PIERCER, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Void Piercer Lance", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.VOID_PIERCER_LANCE, RARITY.RARE, ATTRIBUTES.STRENGTH)

add_weapon("Light Sword", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.LIGHT_SWORD, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Void Splitter", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.VOID_SPLITTER, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Sun Splitter", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.SUN_SPLITTER, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Rust Binder", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.RUST_BINDER, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Magma Edge", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.MAGMA_EDGE, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Frost Binder", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.FROST_BINDER, RARITY.RARE, ATTRIBUTES.STRENGTH)

add_weapon("Rotten Maul", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.ROTTEN_MAUL, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Hook Hammer", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.HOOK_HAMMER, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Drill Slammer", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.DRILL_SLAMMER, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Titan's Maul", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.TITANS_MAUL, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Earth Breaker", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.EARTH_BREAKER, RARITY.RARE, ATTRIBUTES.STRENGTH)
add_weapon("Problem Solver", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.PROBLEM_SOLVER, RARITY.RARE, ATTRIBUTES.STRENGTH)

//      WEAPONS
// INTELLIGENCE WEAPONS
add_weapon("Arcane Codex", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.ARCANE_CODEX, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Last Oath", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.LAST_OATH, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("God's Vow", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.GODS_VOW, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Tome of Eternal Frost", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.TOME_OF_ETERNAL_FROST, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)

add_weapon("Pest Bringer", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.PEST_BRINGER, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Embryonic Catalyst", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.EMBRYONIC_CATALYST, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Icicle", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.ICILE, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Rainbow Staff", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.RAINBOW_STAFF, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Arcane Pulse", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.ARCANE_PULSE, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)

add_weapon("Miasma Staff", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.MIASMA_STAFF, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Fire Starter", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.FIRE_STARTER, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Life Catalyst", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.LIFE_CATALYST, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Basilisk's Eye", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.BASILISKS_EYE, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Seed of Rot", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.SEED_OF_ROT, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)
add_weapon("Soul Catalyst", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.SOUL_CATALYST, RARITY.RARE, ATTRIBUTES.INTELLIGENCE)

//      WEAPONS
// AGILITY WEAPONS
add_weapon("Blaster", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.BLASTER, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Boomstick", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.BOOMSTICK, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Wolf Claws", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.WOLF_CLAWS, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Corkscrew Knuckle", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.CORKSCREW_KNUCKLE, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Shadow Fangs", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.SHADOW_SPIKES, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Vortex Dancer", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.VORTEX_DANCER, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Brute Force", [PERKS.AGILITY_FLAT], UNIQUE_SKILLS.BRUTE_FORCE, RARITY.RARE, ATTRIBUTES.DEXTERITY)

add_weapon("Bone Bow", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.BONE_BOW, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Soul Stabber", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.SOUL_STABBER, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Whisper Blade", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.WHISPER_BLADE, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Shadow Spikes", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.SHADOW_SPIKES, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Needle Point", [PERKS.ATTACK_FLAT], UNIQUE_SKILLS.NEEDLE_POINT, RARITY.RARE, ATTRIBUTES.DEXTERITY)

add_weapon("Starfire Ballista", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.STARFIRE_BALLISTA, RARITY.RARE, ATTRIBUTES.DEXTERITY)
add_weapon("Black Feather Bow", [PERKS.DEFENCE_FLAT], UNIQUE_SKILLS.BLACK_FEATHER_BOW, RARITY.RARE, ATTRIBUTES.DEXTERITY)

function add_equipment(slot, name, attributes, set, rarity, attributeRequirement) {
    set = (set != undefined ? set : -1)
    let id
    switch (slot) {
        case EQUIPMENT_SLOTS.HELMET:
            id = BASE_ITEMS.HELMETS.length
            BASE_ITEMS.HELMETS.push({ id: id, slot: slot, name: name, attributes: attributes, set: set, rarity: rarity, attributeRequirement: attributeRequirement })
            break;
        case EQUIPMENT_SLOTS.ARMOR:
            id = BASE_ITEMS.ARMORS.length
            BASE_ITEMS.ARMORS.push({ id: id, slot: slot, name: name, attributes: attributes, set: set, rarity: rarity, attributeRequirement: attributeRequirement })
            break;
        case EQUIPMENT_SLOTS.NECKLACE:
            id = BASE_ITEMS.NECKLACES.length
            BASE_ITEMS.NECKLACES.push({ id: id, slot: slot, name: name, attributes: attributes, set: set, rarity: rarity, attributeRequirement: attributeRequirement })
            break;
        case EQUIPMENT_SLOTS.RING:
            id = BASE_ITEMS.RINGS.length
            BASE_ITEMS.RINGS.push({ id: id, slot: slot, name: name, attributes: attributes, set: set, rarity: rarity, attributeRequirement: attributeRequirement })
            break;
        case EQUIPMENT_SLOTS.OTHER:
            // not implemented
            break;
        default:
            break;
    }
}
add_equipment(EQUIPMENT_SLOTS.HELMET, "Downhole Helmet", [PERKS.HEALTH_FLAT], get_set_id_by_name("Downhole"), RARITY.RARE, ATTRIBUTES.STRENGTH)
add_equipment(EQUIPMENT_SLOTS.ARMOR, "Downhole Armor", [PERKS.DEFENCE_FLAT, PERKS.ATTACK_FLAT], get_set_id_by_name("Downhole"), RARITY.RARE, ATTRIBUTES.STRENGTH)

function generate_perks(itemObject) {
    let generatedPerks = []
    let numberOfPerks = Math.min(itemObject.rarity, 3)
    if (itemObject.slot == EQUIPMENT_SLOTS.WEAPON) {
        if (itemObject.unique == UNIQUE_SKILLS.NONE) {
            numberOfPerks += 1;
        } else {

        }
    } else {
        if (itemObject.set == -1) {
            numberOfPerks += 1;
        } else {

        }
    }

    for (let i = 0; i < numberOfPerks; i++) { generatedPerks.push(generate_perk()) }
    return generatedPerks
}

function generate_perk(id) {
    if (id != undefined) { return PERKS[Object.keys(PERKS)[id]] }

    let r = Math.floor(Math.random() * Object.keys(PERKS).length)
    return PERKS[Object.keys(PERKS)[r]]
}

function render_item_in_container(itemObject, containerId) {
    let sprite_src
    console.log(itemObject)
    let data_type
    slot = itemObject.slot
    if (slot == EQUIPMENT_SLOTS.WEAPON) {
        if (itemObject.unique != UNIQUE_SKILLS.NOTHING) {
            data_type = "unique"
            sprite_src = "weapons/unique/" + itemObject.name.toLowerCase().replaceAll(" ", "_").replaceAll("'", "").replaceAll(".", "").replaceAll("-", "_")
        } else {
            data_type = ""
        }
    } else {
        if (itemObject.set != -1) {
            let pieces = ITEM_SETS[itemObject.set].pieces;
            data_type = pieces + 'set'
            switch (slot) {
                case EQUIPMENT_SLOTS.HELMET:
                    sprite_src = "helmets/sets/" + ITEM_SETS[itemObject.set].name.toLowerCase()
                    break;
                case EQUIPMENT_SLOTS.ARMOR:
                    sprite_src = "armor/sets/" + ITEM_SETS[itemObject.set].name.toLowerCase()
                    break;
                case EQUIPMENT_SLOTS.RING:
                    sprite_src = "rings/sets/" + ITEM_SETS[itemObject.set].name.toLowerCase()
                    break;
                case EQUIPMENT_SLOTS.NECKLACE:
                    sprite_src = "necklaces/sets/" + ITEM_SETS[itemObject.set].name.toLowerCase()
                    break;
                case EQUIPMENT_SLOTS.OTHER:
                    // not implemented
                    break;

                default:
                    break;
            }

        } else {
            data_type = ""
        }
    }
    let icon_src
    switch (data_type) {
        case "unique":
            icon_src = "unique"
            break;
        case "2set":
            icon_src = "two"
            break;
        case "4set":
            icon_src = "four"
            break;
        default:
            break;
    }

    let html = '<div class="item-slot" data-rarity=' + itemObject.rarity + ' data-slot="' + slot + '" data-id="' + itemObject.id + '" data-type="' + data_type + '" data-level=' + (itemObject.level ? itemObject.level : "1") + '>'
        + '<div class="item-icon"><img class="icon" src="images/' + icon_src + '.svg"/></div>'
        + '<div class="item-flex">'
        + '<div class="item-sprite"><img class="item-sprite" src="sprites/' + sprite_src + '.png"/></div>'
        + '<div class="item-level">' + (itemObject.level ? itemObject.level : "1") + '</div>'
        + '</div>'
        + '</div>'

    $(containerId).append(html);
}
let BASE_HEROES = []
let TEMP_HERO = {}
let SAVED_HEROES = []

function add_hero (name, mainAttribute, baseStats, rarity, element) {
    let id = BASE_HEROES.length
    BASE_HEROES.push({id: id, name: name, mainAttribute: mainAttribute, baseStats: baseStats, rarity: rarity, element: element})
}

function get_hero_id_by_name (name) {
    for (let i = 0; i < BASE_HEROES.length; i++) {
        if (BASE_HEROES[i].name == name) {return BASE_HEROES[i].id}
    }
}

function save_hero_local () {
    let selectedHero = deepCopy(BASE_HEROES[TEMP_HERO.id])
    selectedHero.level = TEMP_HERO.level
    SAVED_HEROES.push(selectedHero)
    TEMP_HERO = {}
}

// LEGENDARIES
// STRENGTH
add_hero("Thor", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.LIGHT, ROLE.OFFENSIVE)
add_hero("Arachnotaur", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.DEFENSIVE)
add_hero("Prellbog", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE, ROLE.OFFENSIVE)
add_hero("Valkyre", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE, ROLE.OFFENSIVE)
add_hero("Black Skull Overlord", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.SHADOW, ROLE.OFFENSIVE)
add_hero("Cybork", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE, ROLE.CONTROL)
add_hero("Goblin Shredder", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE)
add_hero("Heimdall", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.LIGHT, ROLE.SUPPORT)
add_hero("Hephaestus", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE, ROLE.SUPPORT)
add_hero("Krampus", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE, ROLE.SUPPORT)
add_hero("Lucifer", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.LIGHT, ROLE.SUPPORT)
add_hero("Murdermachine", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.LIGHT)
add_hero("Anubis", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.SHADOW, ROLE.OFFENSIVE)

// AGILITY
add_hero("Mercy", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.LIGHT, ROLE.OFFENSIVE)
add_hero("Jack-o'-Lantern", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.OFFENSIVE)
add_hero("Headless Horseman", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE, ROLE.SUPPORT)
add_hero("Wendigo", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.OFFENSIVE)
add_hero("Athena", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.LIGHT, ROLE.OFFENSIVE)
add_hero("Bastet", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.OFFENSIVE)
add_hero("Davy Jane", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE, ROLE.OFFENSIVE)
add_hero("Hades", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE, ROLE.SUPPORT)
add_hero("Loki", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.FIRE, ROLE.CONTROL)
add_hero("Muzen", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.SUPPORT)
add_hero("Shroom Empress", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.CONTROL)
add_hero("Sleipnir", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.DEFENSIVE)

// INTELLIGENCE
add_hero("Shroom Emperor", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.DEFENSIVE)
add_hero("Undead Dragon", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.WATER, ROLE.CONTROL)
add_hero("Dracula", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.SHADOW, ROLE.DEFENSIVE)
add_hero("Monk", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.DEFENSIVE)
add_hero("Siren", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.WATER, ROLE.SUPPORT)
add_hero("Lilith", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.SHADOW, ROLE.CONTROL)
add_hero("Murdering Mass", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.WATER, ROLE.DEFENSIVE)
add_hero("Medusa", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.NATURE, ROLE.CONTROL)
add_hero("Aphrodite", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.WATER, ROLE.SUPPORT)
add_hero("Cthulhu", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.SHADOW, ROLE.DEFENSIVE)
add_hero("Isolde", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.SHADOW, ROLE.SUPPORT)
add_hero("Odin", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.SHADOW, ROLE.SUPPORT)
add_hero("Sphinx", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.LEGENDARY, ELEMENT.LIGHT)

// EPICS
// STRENGTH
add_hero("Dr. Pestilence", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.CONTROL)
add_hero("Yulamb", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE)
add_hero("Cornelius", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.SUPPORT)
add_hero("Orkdozer", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.OFFENSIVE)
add_hero("Orkopter", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.OFFENSIVE)
add_hero("Construct", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.DEFENSIVE)
add_hero("Monika", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER, ROLE.DEFENSIVE)
add_hero("Werewolf", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.OFFENSIVE)
add_hero("Bandit Captain", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.OFFENSIVE)
add_hero("Golem", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.DEFENSIVE)
add_hero("Scourge", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.OFFENSIVE)
add_hero("Ragnor", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.OFFENSIVE)
add_hero("Frankenstein", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.DEFENSIVE)
add_hero("Black Skull Warrior", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.SHADOW, ROLE.OFFENSIVE)
add_hero("Jotunn", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER, ROLE.OFFENSIVE)
add_hero("King Crab", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER)
add_hero("Neanderthal", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.DEFENSIVE)
add_hero("Orca", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER, ROLE.DEFENSIVE)
add_hero("Rudolph", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.DEFENSIVE)
add_hero("War Bard", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.SUPPORT)
add_hero("Yulamb", ATTRIBUTES.STRENGTH, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.CONTROL)

// AGILITY
add_hero("Hermes", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.CONTROL)
add_hero("Drone", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.OFFENSIVE)
add_hero("Predator", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.CONTROL)
add_hero("Assassin", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.SHADOW, ROLE.OFFENSIVE)
add_hero("Jack The Ripper", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.SHADOW)
add_hero("Robyn", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.OFFENSIVE)
add_hero("Badgerer", ATTRIBUTES.DEXTERITY, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.CONTROL)

// INTELLIGENCE
add_hero("Candy Elemental", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.SHADOW, ROLE.CONTROL)
add_hero("Oil Elemental", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER, ROLE.OFFENSIVE)
add_hero("Joanne", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.SUPPORT)
add_hero("Black Skull Mage", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.SHADOW, ROLE.CONTROL)
add_hero("Margrethe", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.SUPPORT)
add_hero("Banshee", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER, ROLE.SUPPORT)
add_hero("Taurus", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.DEFENSIVE)
add_hero("Lotte", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.SUPPORT)
add_hero("Gondolf", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.OFFENSIVE)
add_hero("Alien", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.FIRE, ROLE.CONTROL)
add_hero("Legba", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.SHADOW, ROLE.DEFENSIVE)
add_hero("Unicorn", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.SUPPORT)
add_hero("Alice", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.OFFENSIVE)
add_hero("Ice Worm", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER, ROLE.CONTROL)
add_hero("Nerissa", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER, ROLE.DEFENSIVE)
add_hero("Cleo", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.LIGHT, ROLE.SUPPORT)
add_hero("Djinn", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER, ROLE.SUPPORT)
add_hero("Witch", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.CONTROL)
add_hero("Sylvanna", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.NATURE, ROLE.DEFENSIVE)
add_hero("Yaotl", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.SHADOW, ROLE.OFFENSIVE)
add_hero("Catalina", ATTRIBUTES.INTELLIGENCE, {health: 1000, attack: 750, defence: 500, agility: 350}, RARITY.EPIC, ELEMENT.WATER, ROLE.CONTROL)

function render_hero_in_container (heroObject, containerId, classes = "") {
    let sprite_src = heroObject.name.toLowerCase().replaceAll(" ", "_").replaceAll("'", "").replaceAll(".", "").replaceAll("-", "_")
    let icon_src
    switch (heroObject.element) {
        case ELEMENT.FIRE:
            icon_src = "fire"
        break;
        case ELEMENT.WATER:
            icon_src = "water"
        break;
        case ELEMENT.NATURE:
            icon_src = "nature"
        break;
        case ELEMENT.LIGHT:
            icon_src = "light"
        break;
        case ELEMENT.SHADOW:
            icon_src = "shadow"
        break;
        
        default:
        break;
    }

    let html =  '<div class="hero-slot ' + classes + '" data-id="' + heroObject.id + '" data-rarity="' + heroObject.rarity + '" data-element="' + heroObject.element + '" data-level="' + (heroObject.level ? heroObject.level : 1) + '">'
             +      '<div class="hero-icon"><img class="icon" src="images/' + icon_src + '.svg"/></div>'
             +      '<div class="hero-flex">'
             +          '<div class="hero-sprite"><img class="hero-sprite" src="sprites/heroes/' + sprite_src + '.png"/></div>'
             +          '<div class="hero-level">' + (heroObject.level ? heroObject.level : 1) + '</div>'
             +      '</div>'
             +  '</div>'

    $(containerId).append(html);
}
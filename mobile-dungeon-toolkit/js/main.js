$(window).on("load", () => {
    console.log("window loaded");
});

function deepCopy(obj) { return JSON.parse(JSON.stringify(obj)) }

$(document).ready(() => {
    console.log("document loaded");

    // testing

    for (let i = 0; i < BASE_HEROES.length; i++) {
        render_hero_in_container(BASE_HEROES[i], "#all-heroes-list")
    }

    for (let i = 0; i < BASE_ITEMS.WEAPONS.length; i++) {
        render_item_in_container(BASE_ITEMS.WEAPONS[i], "#all-items-list")
    }

    for (let i = 0; i < BASE_ITEMS.HELMETS.length; i++) {
        render_item_in_container(BASE_ITEMS.HELMETS[i], "#all-items-list")
    }

    for (let i = 0; i < BASE_ITEMS.ARMORS.length; i++) {
        render_item_in_container(BASE_ITEMS.ARMORS[i], "#all-items-list")
    }

    for (let i = 0; i < BASE_ITEMS.RINGS.length; i++) {
        render_item_in_container(BASE_ITEMS.RINGS[i], "#all-items-list")
    }

    for (let i = 0; i < BASE_ITEMS.NECKLACES.length; i++) {
        render_item_in_container(BASE_ITEMS.NECKLACES[i], "#all-items-list")
    }

    console.log("items loaded")

    // sidebar 
    $("#desktop-sidebar").hover(() => {
        $("#desktop-sidebar").removeClass("collapsed")
    }, () => {
        $("#desktop-sidebar").addClass("collapsed")
    })

    // tab switch buttons
    $(".sidebar-buttons button:not(.disabled)").click((e) => {
        let target = $(e.currentTarget).attr("data-target");
        $(".page-content").css({ "display": "none" });
        $("#page-" + target).css({ "display": "grid" });
    })

    // landing page tab switch buttons
    $(".landing-guide button:not(disabled)").click((e) => {
        let target = $(e.currentTarget).attr("data-target");
        $(".page-content").css({ "display": "none" });
        $("#page-" + target).css({ "display": "grid" });
    })

    // start adding new hero from preset
    $(".heroes-col .hero-list .hero-slot.empty").click((e) => {
        $(".heroes-col").css({ "overflow": "hidden" })
        $(".hero-list").css({ "overflow": "hidden" }).addClass("collapsed")
        $(".all-heroes-list").css({ "overflow": "hidden" }).removeClass("collapsed")
        setTimeout(() => {
            $(".heroes-col").css({ "overflow": "auto" })
            $(".hero-list").css({ "overflow": "auto" })
            $(".all-heroes-list").css({ "overflow": "auto" })
        }, 125)
    })

    // select a hero from saved heroes
    $(".heroes-col .hero-list .hero-slot:not(.empty)").click((e) => {
        console.log("e")
    })

    function cancel_adding_hero_from_preset() {
        $(".heroes-col").css({ "overflow": "hidden" })
        $(".hero-list").css({ "overflow": "hidden" }).removeClass("collapsed")
        $(".all-heroes-list").css({ "overflow": "hidden" }).addClass("collapsed")
        $("#preset-hero-row").css({ "display": "none" })
        $("#saved-hero-row").css({ "display": "none" })
        setTimeout(() => {
            $(".heroes-col").css({ "overflow": "auto" })
            $(".hero-list").css({ "overflow": "auto" })
            $(".all-heroes-list").css({ "overflow": "auto" })
        }, 125)
    }
    // cancel adding new hero from preset
    $(".heroes-col .all-heroes-list .hero-slot.empty").click((e) => {
        cancel_adding_hero_from_preset()
    })

    // select an item from saved items for equipping
    $(".selected-hero-col .flex-row .item-slot.empty").click((e) => {
        $(".selected-hero-col .flex-row .item-slot.empty").removeClass("selected")
        $(e.currentTarget).addClass("selected")
        $(".equipment-wrapper .flex-row").addClass("collapsed")
        $(".equipment-list").css({ "overflow": "hidden" }).removeClass("collapsed")
        setTimeout(() => {
            $(".equipment-list").css({ "overflow": "auto" })
        }, 125)
    })

    // cancel selecting an item from saved items for equipping
    $(".selected-hero-col .equipment-list .item-slot.empty").click((e) => {
        $(".selected-hero-col .flex-row .item-slot.empty").removeClass("selected")
        $(".equipment-wrapper .flex-row").removeClass("collapsed")
        $(".equipment-list").css({ "overflow": "hidden" }).addClass("collapsed")
        setTimeout(() => {
            $(".equipment-list").css({ "overflow": "auto" })
        }, 125)
    })

    // start adding new item from preset
    $(".items-col .item-list .item-slot.empty").click((e) => {
        $(".items-col").css({ "overflow": "hidden" })
        $(".item-list").css({ "overflow": "hidden" }).addClass("collapsed")
        $(".all-items-list").css({ "overflow": "hidden" }).removeClass("collapsed")
        setTimeout(() => {
            $(".items-col").css({ "overflow": "auto" })
            $(".item-list").css({ "overflow": "auto" })
            $(".all-items-list").css({ "overflow": "auto" })
        }, 125)
    })

    function cancel_adding_item_from_preset() {
        $(".items-col").css({ "overflow": "hidden" })
        $(".item-list").css({ "overflow": "hidden" }).removeClass("collapsed")
        $(".all-items-list").css({ "overflow": "hidden" }).addClass("collapsed")
        $("#saved-item-row").css({ "display": "none" })
        $("#saved-item-stats-row").css({ "display": "none" })
        $("#preset-item-row").css({ "display": "none" })
        $("#preset-item-stats-row").css({ "display": "none" })
        $(".selected-item-col").addClass("empty")
        setTimeout(() => {
            $(".items-col").css({ "overflow": "auto" })
            $(".item-list").css({ "overflow": "auto" })
            $(".all-items-list").css({ "overflow": "auto" })
        }, 125)
    }
    // cancel adding new item from preset
    $(".items-col .all-items-list .item-slot.empty").click((e) => {
        cancel_adding_item_from_preset()
    })

    // click on preset hero
    $(".heroes-col .all-heroes-list .hero-slot:not(.empty)").click((e) => {
        TEMP_HERO.id = Number($(e.currentTarget).attr("data-id"))
        TEMP_HERO.level = 1
        $(".heroes-col .all-heroes-list .hero-slot:not(.empty)").removeClass("selected")
        $(e.currentTarget).addClass("selected")
        $("#preset-hero-row").css({ "display": "flex" })
        $("#saved-hero-row").css({ "display": "none" })
    })

    function render_saved_heroes_in_container(container) {
        $(container).find(".hero-slot:not(.empty)").remove()

        for (let i = 0; i < SAVED_HEROES.length; i++) {
            render_hero_in_container(SAVED_HEROES[i], container)
        }

        $(".hero-slot:not(.empty)").click((e) => {

        })
    }

    // save hero locally
    $("#save-hero-local-button").click((e) => {
        save_hero_local()
        cancel_adding_hero_from_preset()
        render_saved_heroes_in_container("#hero-list")

    })

    // click on preset item
    $(".items-col .all-items-list .item-slot:not(.empty)").click((e) => {
        TEMP_ITEM.slot = $(e.currentTarget).attr("data-slot")
        TEMP_ITEM.id = $(e.currentTarget).attr("data-id")
        TEMP_ITEM.level = 1
        $(".items-col .all-items-list .item-slot:not(.empty)").removeClass("selected")
        $(e.currentTarget).addClass("selected")
        $("#saved-item-row").css({ "display": "none" })
        $("#saved-item-stats-row").css({ "display": "none" })
        $("#preset-item-row").css({ "display": "flex" })
        $("#preset-item-stats-row").css({ "display": "flex" })
        $(".selected-item-col").removeClass("empty")
    })

    function render_saved_items_in_container(container) {
        $(container).find(".item-slot:not(.empty)").remove()

        for (let i = 0; i < SAVED_ITEMS.length; i++) {
            render_item_in_container(SAVED_ITEMS[i], container)
        }

        $(".item-slot:not(.empty)").click((e) => {

        })
    }

    // save item locally
    $("#save-item-local-button").click((e) => {
        save_item_local()
        cancel_adding_item_from_preset()
        render_saved_items_in_container("#item-list")
    })

    // edit item level
    $(".item-level img.icon").click((e) => {
        let root = $(e.currentTarget).parents(".item-slot")
        let oldLevel = root.attr("data-level")
        let replace = root.find(".item-level").remove()
        let input = document.createElement("input")
        $(input).addClass("item-level")
        root.find(".item-flex").append(input)
        $(input).focus()
        $(input).on("focusout", () => {
            let newLevel = $(input).val();
            if (newLevel == "") { newLevel = oldLevel }
            $(input).remove();
            root.find(".item-flex").append(replace);
            root.find(".item-level").html(newLevel + '<img class="icon" src="images/edit.svg"/>')
        })
    })

    // edit hero level
    $(".hero-level img.icon").click((e) => {
        let root = $(e.currentTarget).parents(".hero-slot")
        console.log(root);
        let oldLevel = root.attr("data-level")
        let replace = root.find(".hero-level").remove()
        let input = document.createElement("input")
        $(input).addClass("hero-level")
        root.find(".hero-flex").append(input)
        $(input).focus()
        $(input).on("focusout", () => {
            let newLevel = $(input).val();
            if (newLevel == "") { newLevel = oldLevel }
            $(input).remove();
            root.find(".hero-flex").append(replace);
            root.find(".hero-level").html(newLevel + '<img class="icon" src="images/edit.svg"/>')
            TEMP_HERO.level = Number(newLevel)
        })
    })

    // click on perk on preset item for selection
    let TEMP_PERK_HTML_ID
    $(".preset-perks li").click((e) => {
        TEMP_PERK_HTML_ID = $(e.currentTarget).attr("id")
        console.log(TEMP_PERK_HTML_ID)
        $(".modal-backdrop").css({ "display": "block" })
        $("#perk-selection-modal").css({ "display": "block" })
    })

    // click on perk in perk modal
    $("#perk-selection-modal li").click((e) => {
        let perkId = Number($(e.currentTarget).attr("data-perk-id"))
        let perk = PERKS[Object.keys(PERKS)[perkId]];
        console.log(TEMP_PERK_HTML_ID)
        $("#" + TEMP_PERK_HTML_ID).find(".perk-name").html('<img class="svg" src="' + perk.icon + '" />' + perk.name)
        $(".modal-backdrop").css({ "display": "none" })
        $("#perk-selection-modal").css({ "display": "none" })
    })

    function update_tooltip_position(event, tooltipId, displayValue = "block") {
        let mouseX = event.originalEvent.clientX;
        let mouseY = event.originalEvent.clientY;
        let width = $(tooltipId).width();
        let height = $(tooltipId).height();
        $(tooltipId).css({ "top": mouseY + "px", "left": mouseX + "px", "display": displayValue })
        if (mouseY + height >= window.innerHeight - 64) {
            $(tooltipId).css({ "transform": "translate(-50%, -110%)" })
            return;
        }
        if (mouseX + width >= window.innerWidth) {
            $(tooltipId).css({ "transform": "translate(-110%, -50%)" })
            return;
        }
        if (mouseX <= 150) {
            $(tooltipId).css({ "transform": "translate(10%, -50%)" })
            return;
        }
        $(tooltipId).css({ "transform": "translate(-50%, 32px)" })
    }

    function update_tooltip_information(event, tooltipId) {
        let slot = $(event.currentTarget).attr("data-slot");
        let id = $(event.currentTarget).attr("data-id");
        let level = $(event.currentTarget).attr("data-level");
        let sprite_src = "sprites/";

        if (tooltipId == "#item-tooltip") {
            let BASE_ITEM = {};

            switch (Number(slot)) {
                case EQUIPMENT_SLOTS.WEAPON:
                    BASE_ITEM = deepCopy(BASE_ITEMS.WEAPONS[id])
                    if (BASE_ITEM.unique != UNIQUE_SKILLS.NOTHING) {
                        sprite_src += "weapons/unique/" + BASE_ITEM.name.toLowerCase().replaceAll(" ", "_").replaceAll("'", "").replaceAll(".", "").replaceAll("-", "_")
                    } else {

                    }
                    break;
                case EQUIPMENT_SLOTS.HELMET:
                    break;
                case EQUIPMENT_SLOTS.ARMOR:
                    break;
                case EQUIPMENT_SLOTS.NECKLACE:
                    break;
                case EQUIPMENT_SLOTS.RING:
                    break;
                case EQUIPMENT_SLOTS.OTHER:
                    // not implemented
                    break;
                default:
                    break;
            }

            BASE_ITEM.level = Number(level);
            $(tooltipId + " .fancy-header").html(BASE_ITEM.name)
            $(tooltipId + " .item-slot").find("img.item-sprite").attr("src", sprite_src + ".png")
        }

        if (tooltipId == "#hero-tooltip") {
            let BASE_HERO = deepCopy(BASE_HEROES[id])
            sprite_src += "heroes/" + BASE_HERO.name.toLowerCase().replaceAll(" ", "_").replaceAll("'", "").replaceAll(".", "").replaceAll("-", "_")
            BASE_HERO.level = level;
            $(tooltipId + " .fancy-header").html(BASE_HERO.name)
            $(tooltipId + " .hero-slot").find("img.hero-sprite").attr("src", sprite_src + ".png")
        }

    }

    $(".hero-slot:not(.empty)").mousemove((e) => {
        update_tooltip_position(e, "#hero-tooltip")
    })
    $(".hero-slot:not(.empty)").hover((e) => {
        update_tooltip_information(e, "#hero-tooltip")
    }, (e) => {
        update_tooltip_position(e, "#hero-tooltip", "none")
    })

    $(".item-slot:not(.empty)").mousemove((e) => {
        update_tooltip_position(e, "#item-tooltip")
    })
    $(".item-slot:not(.empty)").hover((e) => {
        update_tooltip_information(e, "#item-tooltip")
    }, (e) => {
        update_tooltip_position(e, "#item-tooltip", "none")
    })
});
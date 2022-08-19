let viewportHeight = 1000;
let viewportWidth = 1000;

let global_timer;

let firstTimeExpand = {a: false, b: false, c: false, d: false, e: false,
  typeOutA: function () {
    setTimeout(function () {
      typeOut("Placeholder", false, "#a-1-1");
      typeOut("Placeholder", false, "#a-1-2");
      typeOut("Placeholder", false, "#a-1-3");
      typeOut("Placeholder", false, "#a-2-1");
      typeOut("Placeholder", false, "#a-2-2");
      typeOut("Placeholder", false, "#a-2-3");
      typeOut("Placeholder", false, "#a-3-1");
      typeOut("Placeholder", false, "#a-3-2");
      typeOut("Placeholder", false, "#a-3-3");
    }, 333)
  },
  typeOutB: function () {
    setTimeout(function () {
      typeOut("Categories", false, "#game-category-list-header")
      typeOut("Idle / Clicker", true, $("#game-category-list").children().eq(0));
      typeOut("Minigames", true, $("#game-category-list").children().eq(1));
      typeOut("Simulations", true, $("#game-category-list").children().eq(2));
      typeOut("Other Stuff", true, $("#game-category-list").children().eq(3));
    }, 333)
  },
  typeOutC: function () {
    setTimeout(function () {
      typeOut("Categories", false, "#tool-category-list-header")
      typeOut("Design", true, $("#tool-category-list").children().eq(0));
      typeOut("Function", true, $("#tool-category-list").children().eq(1));
      typeOut("Other Stuff", true, $("#tool-category-list").children().eq(2));
    }, 333)
  },
  typeOutD: function () {
    setTimeout(function () {
      typeOut("Contact Form", true, "#contact-form-header")
      typeOut("Placeholder", false, "#contact-form-sidetext")
      typeOut("Send Mail", true, "#mail-button-text")
    }, 333)
  },
  typeOutE: function () {
    setTimeout(function () {
      typeOut("Placeholder", false, "#e-1-1");
      typeOut("Placeholder", false, "#e-1-3");
    }, 333)
  },
}

let gameList = {
  idleclicker: [],
  minigames: [],
  simulations: [],
  other: [],
};

for (let cat in gameList) {
  for (let i = 0; i < gameList[cat].length; i++) {
    let game = gameList[cat][i];
    game.link = "./pages/" + game.id + "/index.html";
  }
}

let toolList = {
  design: [],
  function: [],
  other: [
    {
      id: "literal-canvas",
      name: "Literal Canvas",
      link: "",
    },
  ],
};

for (let cat in toolList) {
  for (let i = 0; i < toolList[cat].length; i++) {
    let tool = toolList[cat][i];
    tool.link = "./pages/" + tool.id + "/index.html";
  }
}

$(document).ready(function () {
  viewportHeight = window.innerHeight;
  viewportWidth = window.innerWidth;

  $("section:not(.expanded)").find(".sec-expanded").hide();

  $("#sec-a").delay(100).animate({"opacity": 1}, 500);
  $("#sec-b").delay(200).animate({"opacity": 1}, 500);
  $("#sec-c").delay(300).animate({"opacity": 1}, 500);
  $("#sec-d").delay(400).animate({"opacity": 1}, 500);
  $("#sec-e").delay(500).animate({"opacity": 1}, 500);

  $("#piz-a").delay(200).animate({"opacity": 1}, 500);
  $("#piz-b").delay(300).animate({"opacity": 1}, 500);
  $("#piz-c").delay(400).animate({"opacity": 1}, 500);
  $("#piz-d").delay(500).animate({"opacity": 1}, 500);
  $("#piz-e").delay(600).animate({"opacity": 1}, 500);

  setTimeout(function () {typeOut("Rewind's Github Index", true, "#title-a", 100)}, 300)
  setTimeout(function () {typeOut("Game Corner", true, "#title-b", 120)}, 600)
  setTimeout(function () {typeOut("Tool Box", true, "#title-c", 130)}, 900)
  setTimeout(function () {typeOut("Contact Me", true, "#title-d", 140)}, 1200)
  setTimeout(function () {typeOut("The End", true, "#title-e", 150)}, 1500)

  setTimeout(function () {typeOut("- about me -", true, "#subtitle-a", 80)}, 750)
  setTimeout(function () {typeOut("- all kinds of games -", true, "#subtitle-b", 80)}, 1050)
  setTimeout(function () {typeOut("- tools and things -", true, "#subtitle-c", 80)}, 1350)
  setTimeout(function () {typeOut("- jolly cooperation -", true, "#subtitle-d", 80)}, 1650)
  setTimeout(function () {typeOut("- social links and more -", true, "#subtitle-e", 80)}, 1950)
  
  $("*").animate({"opacity": 1}, 200);

  $("body").scroll(function () {updateScrolls();})

  $("section").click(function () {
    sectionClick($(this));
  })

  $("#game-category-list li").click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    $("#game-list-header").show();
    // fill list, typeOut content from array
    let category = $(this).attr("data-category");
    if (gameList[category].length < 1) return;
    
    $("#game-list").empty();

    for (let i = 0; i < gameList[category].length; i++) {
      let game = gameList[category][i];
      $("#game-list").append('<li data-url="' + game.link + '" data-id="' + game.id + '"></li>');
      setTimeout(function () {
        let el = $("#game-list").find('li[data-id="' + game.id + '"]')
        typeOut(game.name, true, el);
      })
    }

    $("#game-list li").click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      //open link

    })

    $("#game-list").show();
  })

  $("#tool-category-list li").click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    $("#tool-list-header").show();
    // fill list, typeOut content from array
    let category = $(this).attr("data-category");
    if (toolList[category].length < 1) return;

    $("#tool-list").empty();

    for (let i = 0; i < toolList[category].length; i++) {
      let tool = toolList[category][i];
      $("#tool-list").append('<li data-url="' + tool.link + '" data-id="' + tool.id + '"></li>');
      setTimeout(function () {
        let el = $("#tool-list").find('li[data-id="' + tool.id + '"]')
        typeOut(tool.name, true, el);
      })
    }

    $("#tool-list li").click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      //open link
      let url = $(this).attr("data-url");
      let bool = confirm()
      if (!bool) return;

      location = url;
    })

    $("#tool-list").show();
  })

  $("input").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
  })

  $("textarea").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
  })

  $("a").click(function (e) {
    e.stopPropagation();
  })

  $(document).resize(function () {
    let a = setInterval(function () {updateScrolls();}, 1)
    setTimeout(function () {
      clearInterval(a);
    }, 1000)
  })

  window.onorientationchange = (event) => {
    updateScrolls();
  };

  $("#piz-b").hover(function () {
    $(this).css({"background-color": "var(--one-alt)"})
    $("#sec-b").css({"background-color": "var(--one-alt)", "box-shadow": "0 0 0 100vmax var(--one-alt)"})
  }, function () {
    $(this).css({"background-color": "var(--one)"})
    $("#sec-b").css({"background-color": "var(--one)", "box-shadow": "0 0 0 100vmax var(--one)"})
  }).click(function () {
    sectionClick("#sec-b");
  })

  $("#piz-c").hover(function () {
    $(this).css({"background-color": "var(--two-alt)"})
    $("#sec-c").css({"background-color": "var(--two-alt)", "box-shadow": "0 0 0 100vmax var(--two-alt)"})
  }, function () {
    $(this).css({"background-color": "var(--two)"})
    $("#sec-c").css({"background-color": "var(--two)", "box-shadow": "0 0 0 100vmax var(--two)"})
  }).click(function () {
    sectionClick("#sec-c");
  })

  $("#piz-d").hover(function () {
    $(this).css({"background-color": "var(--three-alt)"})
    $("#sec-d").css({"background-color": "var(--three-alt)", "box-shadow": "0 0 0 100vmax var(--three-alt)"})
  }, function () {
    $(this).css({"background-color": "var(--three)"})
    $("#sec-d").css({"background-color": "var(--three)", "box-shadow": "0 0 0 100vmax var(--three)"})
  }).click(function () {
    sectionClick("#sec-d");
  })

  $("#piz-e").hover(function () {
    $(this).css({"background-color": "var(--four-alt)"})
    $("#sec-e").css({"background-color": "var(--four-alt)", "box-shadow": "0 0 0 100vmax var(--four-alt)"})
  }, function () {
    $(this).css({"background-color": "var(--four)"})
    $("#sec-e").css({"background-color": "var(--four)", "box-shadow": "0 0 0 100vmax var(--four)"})
  }).click(function () {
    sectionClick("#sec-e");
  })

  let a = setInterval(function () {updateScrolls();}, 1)
  setTimeout(function () {
    clearInterval(a);
  }, 1000)
})

function sectionClick(el) {
  let that = $(el);
  clearTimeout(global_timer);
  let id = $(that).attr("id");
  let expanded = $(that).hasClass("expanded") || false;
  let href = $(that).attr("id") + "-anchor";

  if ($(that).attr("id") == "sec-d" && expanded == false) {
    let _h = $("#sec-d")[0].getBoundingClientRect().top;
    $("body").css({"paddingBottom": _h + "px"})
    setTimeout(function () {
      $("body").css({"paddingBottom": "0"})
    }, 1000)
  }

  if ($(that).attr("id") == "sec-e" && expanded == false) {
    $("body").css({"paddingBottom": "100vh"})
    setTimeout(function () {
      $("body").css({"paddingBottom": "0"})
    }, 1000)
  }

  if (expanded == false) {
    let _letter = id.substring(id.length - 1);

    let _t = $(that).find("#subtitle-" + _letter)[0].getBoundingClientRect().top;
    let _h = $(that).find("#subtitle-" + _letter)[0].getBoundingClientRect().height;
    let _offset = _t + _h;
    _offset = Math.abs(_offset);

    $(that).find(".sec-expanded").show().css({"height": "calc(96vh - 300px)"});
    $(that).addClass("expanded");
    document.getElementById(href).scrollIntoView({behavior: 'smooth'});

    if (firstTimeExpand[_letter] == false) {
      switch (_letter) {
        case "a":
          firstTimeExpand.typeOutA();
        break;
        case "b":
          firstTimeExpand.typeOutB();
        break;
        case "c":
          firstTimeExpand.typeOutC();
        break;
        case "d":
          firstTimeExpand.typeOutD();
        break;
        case "e":
          firstTimeExpand.typeOutE();
        break;
      }
      firstTimeExpand[_letter] = true;
    }

  } else {
    $(that).removeClass("expanded");
    global_timer = setTimeout(function () {
      $(that).find(".sec-expanded").css({"display": "none", "height": "300px"})
    }, 1000)
  }

  let a = setInterval(function () {updateScrolls();}, 1)
  setTimeout(function () {
    clearInterval(a);
  }, 1000)
}

function updateScrolls () {
  viewportHeight = window.innerHeight;
  viewportWidth = window.innerWidth;

  let b = $("#sec-b")[0].getBoundingClientRect().top
  $("#piz-b").css({"height": Math.min(b, viewportHeight) + "px"})

  let c = $("#sec-c")[0].getBoundingClientRect().top
  $("#piz-c").css({"height": Math.min(c, viewportHeight) + "px"})

  let d = $("#sec-d")[0].getBoundingClientRect().top
  $("#piz-d").css({"height": Math.min(d, viewportHeight) + "px"})

  let e = $("#sec-e")[0].getBoundingClientRect().top
  $("#piz-e").css({"height": Math.min(e, viewportHeight) + "px"})
}

function typeOut(word, spaceToNbsp = false, destination, speed) {
  if (speed == undefined) {
    speed = 80 + Math.random() * 40;
  }

  $(destination).html("");
  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i) == " " && spaceToNbsp == true) {
      setTimeout(function () {
        let html = $(destination).html();
        $(destination).html(html.substring(0, html.length - 1) + "&nbsp;" + "_");
      }, i * speed)
    } else {
      setTimeout(function () {
        let html = $(destination).html();
        $(destination).html(html.substring(0, html.length - 1) + word.charAt(i) + "_");
      }, i * speed)
    }
  }

  setTimeout(function () {
    let html = $(destination).html();
    $(destination).html(html.substring(0, html.length - 1));
  }, word.length * speed)
}
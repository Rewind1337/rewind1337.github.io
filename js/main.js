let viewportHeight = 1000;
let viewportWidth = 1000;

$(document).ready(function () {
  viewportHeight = window.innerHeight;
  viewportWidth = window.innerWidth;

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

  setTimeout(function () {typeOut("Rewind's Github Index", "#title-a", 100)}, 300)
  setTimeout(function () {typeOut("Game Corner", "#title-b", 120)}, 600)
  setTimeout(function () {typeOut("Tool Box", "#title-c", 130)}, 900)
  setTimeout(function () {typeOut("Contact Me", "#title-d", 140)}, 1200)
  setTimeout(function () {typeOut("The End", "#title-e", 150)}, 1500)

  setTimeout(function () {typeOut("- about me -", "#subtitle-a", 80)}, 750)
  setTimeout(function () {typeOut("- all kinds of games -", "#subtitle-b", 80)}, 1050)
  setTimeout(function () {typeOut("- tools and things -", "#subtitle-c", 80)}, 1350)
  setTimeout(function () {typeOut("- jolly cooperation -", "#subtitle-d", 80)}, 1650)
  setTimeout(function () {typeOut("- social links and more -", "#subtitle-e", 80)}, 1950)
  
  $("*").animate({"opacity": 1}, 200);

  $("body").scroll(function () {updateScrolls();})

  $("section").click(function() {
    let expanded = $(this).hasClass("expanded") || false;
    let href = $(this).attr("id") + "-anchor";
    if (expanded == false) {
      $(this).addClass("expanded", true);
      document.getElementById(href).scrollIntoView({behavior: 'smooth'});
    } else {
      $(this).removeClass("expanded", true);
    }
    let a = setInterval(function () {updateScrolls();}, 1)
    setTimeout(function () {
      clearInterval(a);
    }, 1000)
  })

  $("ul li").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
  })

  $("input").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
  })

  $("a").click(function (e) {
    e.stopPropagation();
  })

  $(document).resize(function () {
    updateScrolls();
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
    let that = "#sec-b";
    let expanded = $(that).hasClass("expanded") || false;
    let href = $(that).attr("id") + "-anchor";
    if (expanded == false) {
      $(that).addClass("expanded", true);
      document.getElementById(href).scrollIntoView({behavior: 'smooth'});
    } else {
      $(that).removeClass("expanded", true);
    }
    let a = setInterval(function () {updateScrolls();}, 1)
    setTimeout(function () {
      clearInterval(a);
    }, 1000)
  })

  $("#piz-c").hover(function () {
    $(this).css({"background-color": "var(--two-alt)"})
    $("#sec-c").css({"background-color": "var(--two-alt)", "box-shadow": "0 0 0 100vmax var(--two-alt)"})
  }, function () {
    $(this).css({"background-color": "var(--two)"})
    $("#sec-c").css({"background-color": "var(--two)", "box-shadow": "0 0 0 100vmax var(--two)"})
  }).click(function () {
    let that = "#sec-c";
    let expanded = $(that).hasClass("expanded") || false;
    let href = $(that).attr("id") + "-anchor";
    if (expanded == false) {
      $(that).addClass("expanded", true);
      document.getElementById(href).scrollIntoView({behavior: 'smooth'});
    } else {
      $(that).removeClass("expanded", true);
    }
    let a = setInterval(function () {updateScrolls();}, 1)
    setTimeout(function () {
      clearInterval(a);
    }, 1000)
  })

  $("#piz-d").hover(function () {
    $(this).css({"background-color": "var(--three-alt)"})
    $("#sec-d").css({"background-color": "var(--three-alt)", "box-shadow": "0 0 0 100vmax var(--three-alt)"})
  }, function () {
    $(this).css({"background-color": "var(--three)"})
    $("#sec-d").css({"background-color": "var(--three)", "box-shadow": "0 0 0 100vmax var(--three)"})
  }).click(function () {
    let that = "#sec-d";
    let expanded = $(that).hasClass("expanded") || false;
    let href = $(that).attr("id") + "-anchor";
    if (expanded == false) {
      $(that).addClass("expanded", true);
      document.getElementById(href).scrollIntoView({behavior: 'smooth'});
    } else {
      $(that).removeClass("expanded", true);
    }
    let a = setInterval(function () {updateScrolls();}, 1)
    setTimeout(function () {
      clearInterval(a);
    }, 1000)
  })

  $("#piz-e").hover(function () {
    $(this).css({"background-color": "var(--four-alt)"})
    $("#sec-e").css({"background-color": "var(--four-alt)", "box-shadow": "0 0 0 100vmax var(--four-alt)"})
  }, function () {
    $(this).css({"background-color": "var(--four)"})
    $("#sec-e").css({"background-color": "var(--four)", "box-shadow": "0 0 0 100vmax var(--four)"})
  }).click(function () {
    let that = "#sec-e";
    let expanded = $(that).hasClass("expanded") || false;
    let href = $(that).attr("id") + "-anchor";
    if (expanded == false) {
      $(that).addClass("expanded", true);
      document.getElementById(href).scrollIntoView({behavior: 'smooth'});
    } else {
      $(that).removeClass("expanded", true);
    }
    let a = setInterval(function () {updateScrolls();}, 1)
    setTimeout(function () {
      clearInterval(a);
    }, 1000)
  })


  updateScrolls();
})

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

function typeOut(word, destination, speed) {
  $(destination).html("");
  for (let i = 0; i < word.length; i++) {
    setTimeout(function () {
      let html = $(destination).html();
      $(destination).html(html.substring(0, html.length - 1) + word.charAt(i) + "_");
    }, i * speed)
  }

  setTimeout(function () {
    let html = $(destination).html();
    $(destination).html(html.substring(0, html.length - 1));
  }, word.length * speed)
}
let viewportHeight = 1000;
let viewportWidth = 1000;

$(document).ready(function () {
  viewportHeight = window.innerHeight;
  viewportWidth = window.innerWidth;

  updateScrolls();


  $("#sec-a").delay(100).animate({"opacity": 1}, 500);
  $("#sec-b").delay(200).animate({"opacity": 1}, 500);
  $("#sec-c").delay(300).animate({"opacity": 1}, 500);
  $("#sec-d").delay(400).animate({"opacity": 1}, 500);
  $("#sec-e").delay(500).animate({"opacity": 1}, 500);
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

  $(document).resize(function () {updateScrolls();})
})

function updateScrolls () {
  let b = $("#sec-b")[0].getBoundingClientRect().top
  $("#piz-b").css({"height": Math.min(b, viewportHeight) + "px"})

  let c = $("#sec-c")[0].getBoundingClientRect().top
  $("#piz-c").css({"height": Math.min(c, viewportHeight) + "px"})

  let d = $("#sec-d")[0].getBoundingClientRect().top
  $("#piz-d").css({"height": Math.min(d, viewportHeight) + "px"})

  let e = $("#sec-e")[0].getBoundingClientRect().top
  $("#piz-e").css({"height": Math.min(e, viewportHeight) + "px"})
}

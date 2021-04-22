$(document).ready(function () {
  setup();

  bind();
});

function setup() {}

function bind() {
  $("#btn-editable").off();
  $(".btn-preview").off();
  $("#file.css").off();
  $("#file.min.css").off();

  $("#file.css").on("click", function () {
    // Real Download Thing . click();
  });

  $("#file.min.css").on("click", function () {
    // Real Download Thing . click();
  });

  $("#output-html").on("keyup", function (e) {
    $("#btn-liveedit")[0].outerHTML = $(this).val().replace('">', '" id="btn-liveedit">');
  });

  $("#btn-editable").on("keypress", function (e) {
    if (e.originalEvent.charCode == 13) {
      let newText = $(this).text().trim();
      applyToAllPreviewButtons(newText);
      return false;
    }
  });

  $(".btn-preview").on("click", function (e) {
    $("#output-html").val($(this)[0].outerHTML.replace(" btn-preview", "").replace(/  /g, "").replace(/<span/g, "	<span"));
    $("#btn-liveedit")[0].outerHTML = $(this)[0].outerHTML.replace('">', '" id="btn-liveedit">');
  });
}

function applyToAllPreviewButtons(s) {
  $('.btn:not("#btn-editable") > span, .btn:not("#btn-liveedit") > span').text(s);
}

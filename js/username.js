"use strict";

var getEl = function getEl(el) {
  return document.querySelector(el);
};

$('.wrapper').addClass('blur');
$('#modalUsername').modal('show');
$('#modalUsername').on('shown.bs.modal', function () {
  $('#username').focus();
});
$('#modalUsername').on('hide.bs.modal', function () {
  window.location = 'index.html';
});
var username = getEl('#username');
var submitBtn = getEl('#usernameBtn');

var validateUsername = function validateUsername() {
  var str = username.value;
  var strLength = str.length;
  var specialSymbolsRegex = /^[a-zA-Z0-9]*$/;
  var feedbackWrap = username.nextElementSibling;
  var icon = '';
  var msg = '';

  if (str) {
    if (!specialSymbolsRegex.test(str)) {
      // 只能有英文和數字
      username.className = 'is-invalid';
      msg = 'Username cannot use special symbols.';
      icon = 'icon_error.svg';
      submitBtn.disabled = true;
    } else if (strLength < 6) {
      // 字數至少六個字
      username.className = 'is-invalid';
      msg = 'Username is less than 6 characters.';
      icon = 'icon_error.svg';
      submitBtn.disabled = true;
    } else {
      username.className = 'is-valid';
      msg = 'This uesrname can be used.';
      icon = 'icon_correct.svg';
      submitBtn.disabled = false;
    }

    feedbackWrap.innerHTML = "<img src=\"images/common/".concat(icon, "\"><span class=\"feedback-msg\">").concat(msg, "</span>");
  } else {
    username.className = '';
    msg = '';
    icon = '';
    submitBtn.disabled = true;
    feedbackWrap.innerHTML = '';
  }
};

username.addEventListener('keyup', validateUsername, false);
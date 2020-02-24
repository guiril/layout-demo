"use strict";

(function () {
  var getEl = function getEl(el) {
    return document.querySelector(el);
  };

  var getAllEl = function getAllEl(el) {
    return document.querySelectorAll(el);
  };

  if (getEl('.header-lang')) {
    // 語系切換
    var lang = '.header-lang li a';
    $(lang).click(function () {
      $(lang).removeClass('active');
      $(this).addClass('active');
    });
  }

  if (getEl('.tab-list')) {
    // 選單 active 樣式
    var changeTablist = function changeTablist() {
      var el = '.tab-list li a';
      $(el).click(function () {
        $(el).removeClass('active');
        $(this).addClass('active');
      });
    };

    changeTablist();
  }

  $('.marquee-list').marquee({
    // 首頁跑馬燈文字
    duration: 20000,
    delayBeforeStart: 0,
    direction: 'left',
    duplicated: true
  });

  if (getEl('.aside-line')) {
    // 關閉右側 QRcode
    var wrapper = getEl('.aside-line');
    var btn = getEl('.aside-line-close');
    btn.addEventListener('click', function () {
      wrapper.classList.add('closed');
    });
  }

  if (getEl('.go-top')) {
    // go top
    var goTopBtn = getEl('.go-top');

    window.onscroll = function () {
      if (window.scrollY > 0) {
        goTopBtn.style.opacity = '1';
      } else {
        goTopBtn.style.opacity = '0';
      }
    };

    $(goTopBtn).click(function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 800);
    });
  }

  $(function () {
    // Bootstrap
    // modal
    $('.modal').on('show.bs.modal', function () {
      $('body').css('overflow', 'hidden');
    });
    $('.modal').on('hide.bs.modal', function () {
      $('body').css('overflow', 'auto');
    });
    $('.member-modal').on('show.bs.modal', function () {
      $('.wrapper').addClass('blur');
    });
    $('.member-modal').on('hide.bs.modal', function () {
      $('.wrapper').removeClass('blur');
    });
    $('#modalSignin').on('shown.bs.modal', function () {
      $('#signinUsername').focus();
    });
    $('#modalSignup').on('shown.bs.modal', function () {
      $('#signupUsername').focus();
    });
    $('[data-toggle="popover"]').popover(); // popover

    $('[data-toggle="tooltip"]').tooltip({
      // tooltip
      trigger: 'hover'
    });
  });
  document.addEventListener('readystatechange', function () {
    // loading icon
    var state = document.readyState;
    var spinner = getEl('.spinner-wrapper');

    if (state === 'complete') {
      setTimeout(function () {
        spinner.style.visibility = 'hidden';
        new WOW().init();
      }, 1000);
    }
  });

  if (getEl('.banner-wrapper')) {
    // index carousel
    var item = getEl('.banner-wrapper');
    var mySwiper = new Swiper(item, {
      // eslint-disable-line no-unused-vars
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      loop: true,
      pagination: {
        el: '.banner-swiper-pagination',
        clickable: true
      },
      navigation: {
        prevEl: '.banner-button-prev',
        nextEl: '.banner-button-next'
      }
    });
    item.addEventListener('mouseover', function () {
      mySwiper.autoplay.stop();
    }, false);
    item.addEventListener('mouseout', function () {
      mySwiper.autoplay.start();
    }, false);
  }

  if (getEl('.popular-games-carousel')) {
    var _item = getEl('.popular-games-carousel');

    var _mySwiper = new Swiper(_item, {
      // eslint-disable-line no-unused-vars
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.popular-swiper-pagination',
        clickable: true
      },
      loop: false
    });

    _item.addEventListener('mouseover', function () {
      _mySwiper.autoplay.stop();
    }, false);

    _item.addEventListener('mouseout', function () {
      _mySwiper.autoplay.start();
    }, false);
  }

  if (getEl('.daily-games-content')) {
    // daily games carousel
    var _item2 = getEl('.daily-games-content');

    var _mySwiper2 = new Swiper(_item2, {
      // eslint-disable-line no-unused-vars
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
        reverseDirection: true
      },
      direction: 'vertical',
      loop: true
    });

    _item2.addEventListener('mouseover', function () {
      _mySwiper2.autoplay.stop();
    }, false);

    _item2.addEventListener('mouseout', function () {
      _mySwiper2.autoplay.start();
    }, false);
  }

  if (getEl('.footer-providers-container')) {
    // footer carousel
    var _mySwiper3 = new Swiper('.footer-providers-container', {
      // eslint-disable-line no-unused-vars
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      slidesPerView: 12,
      loop: true
    });
  }

  $('#modalDownloadMobile').on('shown.bs.modal', function (e) {
    // 手機下載視窗輪播
    var mySwiper = new Swiper('.download-swiper-container', {
      // eslint-disable-line no-unused-vars
      slidesPerView: 3,
      slidesPerGroup: 3,
      navigation: {
        prevEl: '.modal-button-prev',
        nextEl: '.modal-button-next'
      }
    });
  });

  if (getEl('.slots-games')) {
    // slots-game 分頁
    var paginationList = getEl('.pagination-list');
    var slotsCardList = getEl('.slots-games');
    var slotsNoGames = getEl('.no-data');

    var fakeData = function fakeData() {
      // 假資料陣列
      var result = [];

      for (var i = 0; i < 30; i++) {
        result.push({
          name: "Wrath of Thor 00".concat(i),
          img: 'images/slots/game.png'
        });
      }

      return result;
    };

    var dataLength = fakeData().length; // 總資料數

    var currentPage = 1; // 目前的頁碼

    var pageSize = 24; // 每頁資料數

    var totalPage = Math.ceil(dataLength / pageSize); // 總頁數

    var lastPageSize = dataLength % pageSize; // 最後一頁的資料數

    var pageString; // 頁碼字串

    var dataString; // 資料字串

    var renderPagination = function renderPagination(page) {
      // 印出頁碼
      var startPageNumber;
      var endPageNumber;
      pageString = '';

      if (totalPage > 0 && totalPage <= 5) {
        // 總頁數小於等於五頁，印出全部的頁碼
        startPageNumber = 1;
        endPageNumber = totalPage;

        for (var i = startPageNumber; i <= endPageNumber; i++) {
          if (i === page) {
            pageString += "<li><a class=\"page-item active\" href=\"#\" data-page=\"".concat(i, "\">").concat(i, "</a></li>");
          } else {
            pageString += "<li><a class=\"page-item\" href=\"#\" data-page=\"".concat(i, "\">").concat(i, "</a></li>");
          }
        }
      } else if (totalPage > 5) {
        // 總頁數大於五頁，只印出五個頁碼
        if (page >= 1 && page <= 3) {
          // 目前點擊的頁碼是 1-3 頁
          startPageNumber = 1;
          endPageNumber = 5;

          for (var _i = startPageNumber; _i <= endPageNumber; _i++) {
            if (_i === page) {
              pageString += "<li><a class=\"page-item active\" href=\"#\" data-page=\"".concat(_i, "\">").concat(_i, "</a></li>");
            } else {
              pageString += "<li><a class=\"page-item\" href=\"#\" data-page=\"".concat(_i, "\">").concat(_i, "</a></li>");
            }
          }
        } else if (page >= totalPage - 2 && page <= totalPage) {
          // 目前點擊的頁碼是倒數 3 頁
          startPageNumber = totalPage - 4;
          endPageNumber = totalPage;

          for (var _i2 = startPageNumber; _i2 <= endPageNumber; _i2++) {
            if (_i2 === page) {
              pageString += "<li><a class=\"page-item active\" href=\"#\" data-page=\"".concat(_i2, "\">").concat(_i2, "</a></li>");
            } else {
              pageString += "<li><a class=\"page-item\" href=\"#\" data-page=\"".concat(_i2, "\">").concat(_i2, "</a></li>");
            }
          }
        } else {
          startPageNumber = page - 2;
          endPageNumber = page + 2;

          for (var _i3 = startPageNumber; _i3 <= endPageNumber; _i3++) {
            if (_i3 === page) {
              pageString += "<li><a class=\"page-item active\" href=\"#\" data-page=\"".concat(_i3, "\">").concat(_i3, "</a></li>");
            } else {
              pageString += "<li><a class=\"page-item\" href=\"#\" data-page=\"".concat(_i3, "\">").concat(_i3, "</a></li>");
            }
          }
        }
      }

      if (totalPage > 0) {
        paginationList.innerHTML = "\n        <li><a class=\"page-first\" href=\"#\" data-page=\"1\">First</a></li>\n        <li><a class=\"page-prev\" href=\"#\" data-page=\"prev\">Previous</a></li>\n        ".concat(pageString, "\n        <li><a class=\"page-next\" href=\"#\" data-page=\"next\">Next</a></li>\n        <li><a class=\"page-last\" href=\"#\" data-page=\"").concat(totalPage, "\">Last</a></li>");
        getEl('.pagination-list').style.display = 'flex';

        if (page === 1 && page !== totalPage) {
          getEl('.page-first').classList.add('disabled');
          getEl('.page-prev').classList.add('disabled');
        } else if (page !== 1 && page === totalPage) {
          getEl('.page-next').classList.add('disabled');
          getEl('.page-last').classList.add('disabled');
        } else if (page === 1 && page === totalPage) {
          getEl('.page-first').classList.add('disabled');
          getEl('.page-prev').classList.add('disabled');
          getEl('.page-next').classList.add('disabled');
          getEl('.page-last').classList.add('disabled');
        }
      } else if (totalPage <= 0) {
        getEl('.pagination-list').style.display = 'none';
      }
    };

    var renderData = function renderData() {
      var startIndex;
      var endIndex;
      dataString = '';

      if (dataLength < 1) {
        // 空資料狀態
        slotsNoGames.style.display = 'block';
        slotsCardList.style.display = 'none';
      } else if (dataLength >= 1) {
        slotsNoGames.style.display = 'none';
        slotsCardList.style.display = '';
        startIndex = (currentPage - 1) * pageSize;

        if (currentPage === totalPage && lastPageSize !== 0) {
          endIndex = startIndex + lastPageSize;
        } else {
          endIndex = currentPage * pageSize;
        }

        for (var i = startIndex; i < endIndex; i++) {
          dataString += "\n          <li>\n            <div class=\"slots-container\">\n              <div class=\"slots-img\">\n                <img src=\"".concat(fakeData()[i].img, "\" alt=\"").concat(fakeData()[i].name, "\"/>\n              </div>\n              <div class=\"slots-txt\">\n                <h3>").concat(fakeData()[i].name, "</h3>\n              </div>\n              <div class=\"slots-play\">\n                <h3>Wrath of Thor</h3>\n                <button class=\"play-btn\" data-content=\"Play Now\" data-hover=\"Go!\"></button>\n                <button class=\"free-btn\" data-content=\"Free\" data-hover=\"Try it !\"></button>\n              </div>\n            </div>\n          </li>");
        }
      }

      slotsCardList.innerHTML = dataString; // 將資料寫入 .slots-card-list
    };

    var getPage = function getPage(e) {
      // 目前點擊到的頁碼
      e.preventDefault();
      var page;

      if (e.target.nodeName === 'A') {
        page = e.target.dataset.page; // 點擊到的頁碼

        if (page === 'prev' || page === 'next') {
          if (page === 'prev' && currentPage !== 1) {
            currentPage = currentPage - 1;
          } else if (page === 'next' && currentPage !== totalPage) {
            currentPage = currentPage + 1;
          }
        } else {
          currentPage = Number(page);
        }

        renderPagination(currentPage);
        renderData();
      }
    };

    renderPagination(currentPage); // 進到頁面渲染頁碼和資料

    renderData();
    paginationList.addEventListener('click', getPage, false);
  }

  if (getEl('.psw-btn')) {
    (function () {
      // 顯示或隱藏密碼
      var icon = getAllEl('.psw-btn');
      var hideIcon = '<img src="images/common/icon_psw_hide.svg" alt="Hide password">';
      var showIcon = '<img src="images/common/icon_psw_show.svg" alt="Show password">';

      var _loop = function _loop(i) {
        var input = $(icon[i]).siblings('input');

        if (icon[i].dataset.page === 'member') {
          hideIcon = '<img src="images/member/icon_psw_hide.svg" alt="Hide password">';
          showIcon = '<img src="images/member/icon_psw_show.svg" alt="Show password">';
        }

        icon[i].addEventListener('click', function (e) {
          e.preventDefault();

          if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon[i].innerHTML = showIcon;
            $(icon[i]).tooltip('hide');
            icon[i].setAttribute('data-original-title', 'Hide password');
            console.log();
          } else if (input.attr('type') === 'text') {
            input.attr('type', 'password');
            icon[i].innerHTML = hideIcon;
            $(icon[i]).tooltip('hide');
            icon[i].setAttribute('data-original-title', 'Show password');
          }
        }, false);
      };

      for (var i = 0; i < icon.length; i++) {
        _loop(i);
      }
    })();
  }

  if (getEl('.current-date')) {
    // current date
    var currentDate = getAllEl('.current-date');

    for (var i = 0; i < currentDate.length; i++) {
      currentDate[i].value = moment().format('YYYY-MM-DD');
    }
  }

  if (getEl('.current-time')) {
    // current time
    var currentTime = getAllEl('.current-time');

    for (var _i4 = 0; _i4 < currentTime.length; _i4++) {
      currentTime[_i4].value = moment().format('HH:mm');
    }
  }

  if (getEl('.copy-btn')) {
    // 複製文字
    var copyBtn = getEl('.copy-btn');

    var copyToClipBoard = function copyToClipBoard(e) {
      e.preventDefault();
      var inputEl = document.createElement('input');
      var inputWrapper = getEl('.copy-element');
      var copyArea = getEl('.copy-text');
      var copyStatus = document.execCommand('copy');
      var message;

      if (copyArea.nodeName === 'INPUT') {
        inputEl.setAttribute('value', copyArea.value);
      } else {
        inputEl.setAttribute('value', copyArea.textContent);
      }

      inputWrapper.appendChild(inputEl);
      inputEl.select();
      document.execCommand('copy');
      inputWrapper.removeChild(inputEl);
      copyStatus ? message = 'Copied' : message = 'Unable to copy';
      $(copyBtn).tooltip({
        trigger: 'click',
        placement: 'right',
        title: message
      });
      $(copyBtn).tooltip('show');
      setTimeout(function () {
        $(copyBtn).tooltip('hide');
      }, 1500);
    };

    copyBtn.addEventListener('click', copyToClipBoard, false);
  }

  if (getEl('#name') || getEl('#tel')) {
    var fullName = getEl('#name');
    var mobileNumber = getEl('#tel');

    if (fullName.value) {
      fullName.disabled = true;
    } else {
      fullName.disabled = false;
    }

    if (mobileNumber.value) {
      mobileNumber.disabled = true;
    } else {
      mobileNumber.disabled = false;
    }
  }

  if (getEl('#historyType')) {
    // History 表格
    var historyType = getEl('#historyType');
    var tableHead = getEl('.history-table-head');
    var tableBody = getEl('.history-table-body'); // 預設載入 statement

    tableHead.innerHTML = "\n    <tr>\n      <th width=\"180\">Type</th>\n      <th width=\"200\">Turnover</th>\n      <th width=\"150\">Win/Loss</th>\n      <th class=\"text-right\" width=\"150\">Active Bet</th>\n    </tr>";
    tableBody.innerHTML = "\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>\n    <tr>\n      <td>Total</td>\n      <td>0.00</td>\n      <td>0.00</td>\n      <td class=\"text-right\">0.00</td>\n    </tr>";
    historyType.addEventListener('change', function () {
      var currentSelected = historyType.value;

      if (currentSelected === 'Statement') {
        tableHead.innerHTML = "\n        <tr>\n          <th width=\"180\">Type</th>\n          <th width=\"200\">Turnover</th>\n          <th width=\"150\">Win/Loss</th>\n          <th class=\"text-right\" width=\"150\">Active Bet</th>\n        </tr>";
        tableBody.innerHTML = "\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>\n        <tr>\n          <td>Total</td>\n          <td>0.00</td>\n          <td>0.00</td>\n          <td class=\"text-right\">0.00</td>\n        </tr>";
      } else if (currentSelected === 'Transfer') {
        tableHead.innerHTML = "\n        <tr>\n          <th width=\"190\">Date</th>\n          <th>pages.from</th>\n          <th>pages.to</th>\n          <th class=\"text-right\">Amount</th>\n          <th>Status</th>\n        </tr>";
        tableBody.innerHTML = "\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Spadegaming</td>\n          <td>Evolution Gaming</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Mian Wallet</td>\n          <td>Playtech</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Evolution Gaming</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Playtech</td>\n          <td>Evolution Gaming</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Evolution Gaming</td>\n          <td>Mian Wallet</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Evolution Gaming</td>\n          <td>Playtech</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Mian Wallet</td>\n          <td>Evolution Gaming</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Evolution Gaming</td>\n          <td>Playtech</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Evolution Gaming</td>\n          <td>Mian Wallet</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>Mian Wallet</td>\n          <td>Playtech</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n        </tr>";
      } else if (currentSelected === 'Transaction') {
        tableHead.innerHTML = "\n        <tr>\n          <th>Date</th>\n          <th>ID</th>\n          <th>Type</th>\n          <th class=\"text-right\">Amount</th>\n          <th>Status</th>\n          <th>Remark</th>\n        </tr>";
        tableBody.innerHTML = "\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>\n        <tr>\n          <td>2019/02/25 15:35:56</td>\n          <td>024735</td>\n          <td>Withdrawal</td>\n          <td class=\"text-right\">30.00</td>\n          <td>Success</td>\n          <td>Testing</td>\n        </tr>";
      }
    }, false);
  }

  if (getEl('#modalSignup')) {
    // 註冊表單驗證訊息
    var username = getEl('#signupUsername');
    var password = getEl('#signupPassword');
    var fullname = getEl('#signupFullname');
    var mobile = getEl('#signupMobile');
    var signupBtn = getEl('#signupBtn');

    var controlSubmitBtn = function controlSubmitBtn() {
      if (username.className === 'is-valid' && password.className === 'is-valid' && fullname.className === 'is-valid' && mobile.className === 'is-valid') {
        signupBtn.disabled = false;
      } else {
        signupBtn.disabled = true;
      }
    };

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
        } else if (strLength < 6) {
          // 字數至少六個字
          username.className = 'is-invalid';
          msg = 'Username is less than 6 characters.';
          icon = 'icon_error.svg';
        } else {
          username.className = 'is-valid';
          msg = 'This uesrname can be used.';
          icon = 'icon_correct.svg';
        }

        feedbackWrap.innerHTML = "<img src=\"images/common/".concat(icon, "\"><span class=\"feedback-msg\">").concat(msg, "</span>");
        controlSubmitBtn();
      } else {
        username.className = '';
        msg = '';
        icon = '';
        feedbackWrap.innerHTML = '';
      }
    };

    var validatePassword = function validatePassword() {
      var str = password.value;
      var strLength = str.length;
      var specialSymbolsRegex = /^[a-zA-Z0-9]*$/;
      var feedbackWrap = password.nextElementSibling;
      var msg = '';
      var icon = '';

      if (str) {
        if (!specialSymbolsRegex.test(str)) {
          // 只能有英文和數字
          password.className = 'is-invalid';
          msg = 'Password cannot use special symbols.';
          icon = 'icon_error.svg';
        } else if (strLength < 6) {
          // 字數至少六個字
          password.className = 'is-invalid';
          msg = 'Password is less than 6 characters.';
          icon = 'icon_error.svg';
        } else {
          password.className = 'is-valid';
          msg = 'Password is okay.';
          icon = 'icon_correct.svg';
        }

        feedbackWrap.innerHTML = "<img src=\"images/common/".concat(icon, "\"><span class=\"feedback-msg\">").concat(msg, "</span>");
        controlSubmitBtn();
      } else {
        password.className = '';
        msg = '';
        icon = '';
        feedbackWrap.innerHTML = '';
      }
    };

    var validateFullname = function validateFullname() {
      var str = fullname.value;
      var regex = /^[a-zA-Z\u0e00-\u0e7e][a-zA-Z\u0e00-\u0e7e\s]*$/;
      var feedbackWrap = fullname.nextElementSibling;
      var msg = '';
      var icon = '';

      if (str) {
        if (!regex.test(str)) {
          // 只能填英文、泰文，首字不能空白，字跟字中間可輸入空白
          fullname.className = 'is-invalid';
          msg = 'Please enter the correct name format.';
          icon = 'icon_error.svg';
        } else if (regex.test(str)) {
          fullname.className = 'is-valid';
          msg = 'Full name is okay.';
          icon = 'icon_correct.svg';
        }

        feedbackWrap.innerHTML = "<img src=\"images/common/".concat(icon, "\"><span class=\"feedback-msg\">").concat(msg, "</span>");
        controlSubmitBtn();
      } else {
        fullname.className = '';
        msg = '';
        icon = '';
        feedbackWrap.innerHTML = '';
      }
    };

    var validateMobile = function validateMobile() {
      var str = mobile.value;
      var strLength = str.length;
      var numberRegex = /^[0][0-9]*$/;
      var feedbackWrap = mobile.nextElementSibling;
      var msg = '';
      var icon = '';

      if (str) {
        if (!numberRegex.test(str) || strLength < 9 || strLength > 10) {
          // 只能填數字，至少 9 個字，最多 10 個字
          mobile.className = 'is-invalid';
          msg = 'Please enter the correct Mobile Number format.';
          icon = 'icon_error.svg';
        } else {
          mobile.className = 'is-valid';
          msg = 'Mobile Number is okay.';
          icon = 'icon_correct.svg';
        }

        feedbackWrap.innerHTML = "<img src=\"images/common/".concat(icon, "\"><span class=\"feedback-msg\">").concat(msg, "</span>");
        controlSubmitBtn();
      } else {
        mobile.className = '';
        msg = '';
        icon = '';
        feedbackWrap.innerHTML = '';
      }
    };

    username.addEventListener('keyup', validateUsername, false);
    password.addEventListener('keyup', validatePassword, false);
    fullname.addEventListener('keyup', validateFullname, false);
    mobile.addEventListener('keyup', validateMobile, false);
  }

  if (getEl('#modalSignin')) {
    // 登入表單驗證訊息
    var signinUsername = getEl('#signinUsername');
    var signinPassword = getEl('#signinPassword');
    var signinBtn = getEl('#signinBtn');

    var controlSigninBtn = function controlSigninBtn() {
      var username = signinUsername.value;
      var password = signinPassword.value;

      if (username.length >= 6 && password.length >= 6) {
        signinBtn.disabled = false;
      } else {
        signinBtn.disabled = true;
      }
    };

    signinUsername.addEventListener('keyup', function () {
      controlSigninBtn();
    }, false);
    signinPassword.addEventListener('keyup', function () {
      controlSigninBtn();
    }, false);
  }
})();
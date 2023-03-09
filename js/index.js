/*
$('a').click(function () {
  event.preventDefault();
  $(this).attr('href', '#forma');
  var id = $(this).attr('href'),
    top = $(id).offset().top;
  $('body,html').animate({
    scrollTop: top - 70
  }, 1500);
});
*/

$(document).ready(function () {
    $("a").on('click', function () {
        $("#forma")[0].scrollIntoView({
          behavior: "smooth", // or "auto" or "instant"
          block: "start" // or "end"
      });
        
    });

});

const months = ['يَنَايِرُ', 'فِبْرَايِرُ', 'مَارِسُ', 'أَبْرِيلُ', 'مَايُو', 'يُونْيُو', 'يُولْيُو', 'أَغُسْطُسُ', 'سِبْتَمْبَرُ', 'أُكْتُوبَرُ', 'نُوفَمْبَرُ', 'دِيسَمْبَرُ'],
  monthMin = ['', '', '', '', '', '', '', '', '', '', '', ''],
  days = ['‫الأحد', '‫الاثنين', '‫الثلاثاء', '‫الأربعاء', 'الخميس', 'الجمعة‬', 'السبت‬'],
  daysMin = ['', '', '', '', '', '', ''],
  seasons = ['شِتَاء', 'رَبِيع', 'صَيْف', 'خَرِيف'];

function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {
  const _counterLength = 60;
  for (let counter = 0; counter < _counterLength; counter++) {
    innerDate(counter, 'date-');
    innerDate(counter, 'date')
  }

  function innerDate(counter, dateType) {
    let newCounter;
    dateType === 'date-' ? newCounter = -counter : newCounter = counter;
    const _msInDay = 86400000,
      _localDate = new Date(Date.now() + (newCounter * _msInDay)),
      _day = _localDate.getDate(),
      _month = _localDate.getMonth() + 1,
      _year = _localDate.getFullYear();
    const dayDefault = addZero(_day),
      monthDefault = addZero(_month),
      defaultDate = dayDefault + '.' + monthDefault + '.' + _year;
    const dateClass = dateType + counter,
      nodeList = document.querySelectorAll('.' + dateClass);
    for (let i = 0; i < nodeList.length; i++) {
      const dateFormat = nodeList[i].dataset.format;
      dateFormat !== undefined && dateFormat !== '' ? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)) : nodeList[i].innerHTML = defaultDate
    }
  }

  function changeFormat(_day, _month, _year, format, counter) {
    let innerFormat = format;
    const testFormat = ["dd", "mm", "yyyy", "monthFull"],
      dateFormat = {
        dd: _day,
        mm: addZero(_month),
        yyyy: _year,
        monthFull: getMonthName(_month, monthsName, false),
      };
    for (let i = 0; i < testFormat.length; i++) {
      let string = testFormat[i];
      let regExp = new RegExp(string);
      innerFormat = innerFormat.replace(regExp, dateFormat[string]);
    }
    return innerFormat.split(' ').join(' ')
  }

  function getMonthName(_month, monthsName, bigFirstLetter, counter) {
    const monthCounter = !!counter ? counter : 0;
    let month;
    _month + monthCounter > 12 ? month = monthCounter - (12 - _month) : month = _month + monthCounter;
    _month + monthCounter <= 0 ? month = 12 + monthCounter + 1 : month = _month + monthCounter;
    return changeFirstLetter(bigFirstLetter, monthsName[month - 1])
  }

  function addZero(numb) {
    return numb < 10 ? '0' + numb : numb
  }

  function changeFirstLetter(isBig, str) {
    return isBig && str && str.length > 0 ? str[0].toUpperCase() + str.slice(1) : str
  }
}
if (document.body.classList.contains('ev-date')) {
  document.addEventListener("DOMContentLoaded", function () {
    postDate(days, daysMin, months, monthMin, seasons)
  });
}

let lastpack2 = document.querySelector(".lastpack2");
packs = 20;

function packDown() {
  if (packs > 2) {
    return lastpack2.innerHTML = --packs;
  } else {
    clearInterval(ID);
  }
}

let ID = setInterval(packDown, 8000);

// const oldPrice = document.querySelectorAll(".x_price_previous");
const newPrice = document.querySelectorAll(".x_price_current");

function delimiter(price) {
  for (let i = 0; i < price.length; i++) {
    price[i].textContent = price[i].textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1.');
  }
}
// delimiter(oldPrice);
delimiter(newPrice);
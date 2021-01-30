document.addEventListener("DOMContentLoaded", () => {
  const ppOpeners = document.querySelectorAll('.popup-open');
  const ppClosers = document.querySelectorAll('.popup-close');
  const popups = document.querySelectorAll('.popup');
  const lockPadding = document.querySelectorAll('.lock-padding');
  const body = document.querySelector('body');

  const selects = document.querySelector('.select');

  const menuBtn = document.querySelector('.menu-btn');
  const menuMobile = document.querySelector('.header__menu-mobile');

  let isMobileMenu = false;
  let unlock = true;
  let timeout = 400;


  $(document).ready(function () {
    if (document.querySelector('.intro__slider')) {
      $('.intro__slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '#intro-slider-prev',
        nextArrow: '#intro-slider-next',
        fade: true
      });
      onSliderInit('.intro__slider');
    }
    if (document.querySelector('.events__slider')) {
      $('.events__slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '#events-slider-prev',
        nextArrow: '#events-slider-next',
        variableWidth: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
        ]
        //fade: true
      });
      onSliderInit('.events__slider');
    }
    Fresh();
  });

  //Listeners
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    if (menuBtn.classList.contains('active')) {
      openMenu();
    }
    else {
      closeMenu();
    }
  })
  if (selects) {
    selects.forEach((item, index, arr) => {
      const active = item.querySelector('span');
      const list = item.querySelector('ul.select__list');
      const options = list.querySelectorAll('li');
      const input = item.querySelector('input[type=text]');
      let bottom = active.getBoundingClientRect().bottom;
      active.addEventListener('click', () => {
        item.classList.toggle('opened');
      })
      options.forEach((option) => {
        option.addEventListener('click', () => {
          let value = option.textContent;
          active.textContent = value;
          input.setAttribute('value', value);
          item.classList.remove('opened');
        })
      })
    });
  }
  window.addEventListener('resize', () => {
    Fresh();
  })


  // Functions
  function openMenu() {
    menuMobile.classList.add('opened');
  }
  function closeMenu() {
    menuMobile.classList.remove('opened');
  }
  function onSliderInit(sliderSelector) {
    const slickSlider = document.querySelector(sliderSelector);
    const sliderWrapper = slickSlider.closest('.slider-wrapper');
    const dotsCount = sliderWrapper.querySelector('.slider-dots span');
    const slides = sliderWrapper.querySelectorAll('.slider-item');
    let slidesCount = slides.length;
    //init dots
    dotsCount.textContent = `1/${slidesCount}`;
    positionSliderControls(sliderSelector);
    if (sliderSelector === '.events__slider') {
      let lastActiveDot = '0';
      for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('slick-active')) {
          lastActiveDot = i + 1;
        }
      }
      dotsCount.textContent = `${lastActiveDot}/${slidesCount}`;
    }
    //on slider change(before)
    $(sliderSelector).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      dotsCount.textContent = `${nextSlide + 1}/${slidesCount}`
      positionSliderControls(sliderSelector, nextSlide);

      if (sliderSelector === '.events__slider') {
        let lastActiveDot = '0';
        console.log(slides);
        for (let i = 0; i < slides.length; i++) {
          if (slides[i].classList.contains('slick-active')) {
            lastActiveDot = i + 1;
          }
        }
        dotsCount.textContent = `${lastActiveDot}/${slidesCount}`;
      }
    });
    //on slider change(after)
    $(sliderSelector).on('afterChange', function (event, slick, currentSlide, nextSlide) {
      if (sliderSelector === '.events__slider') {
        let lastActiveDot = '0';
        for (let i = 0; i < slides.length; i++) {
          if (slides[i].classList.contains('slick-active')) {
            lastActiveDot = i + 1;
            //console.log(1231);
          }
        }
        dotsCount.textContent = `${lastActiveDot}/${slidesCount}`;
      }
    });
  }
  function positionSliderControls(sliderSelector, nextSlide = 0) {
    const slickSlider = document.querySelector(sliderSelector);
    const sliderWrapper = slickSlider.closest('.slider-wrapper');
    const slides = sliderWrapper.querySelectorAll('.slider-item');
    if (sliderSelector === '.intro__slider') {
      const arrows = sliderWrapper.querySelector('.slider-np');
      const dots = sliderWrapper.querySelector('.slider-dots');
      const sliderImg = slides[nextSlide].querySelector('img');
      let bottom = sliderWrapper.getBoundingClientRect().bottom - sliderImg.getBoundingClientRect().bottom;

      arrows.style.bottom = bottom + 'px';
      dots.style.bottom = (bottom - 50) + 'px';
    }
  }
  function Fresh() {
    positionSliderControls('.intro__slider');
  }











  //PopUp
  if (ppOpeners.length > 0) {
    for (let i = 0; i < ppOpeners.length; i++) {
      const ppOpener = ppOpeners[i];
      ppOpener.addEventListener('click', (event) => {
        const ppCurrent = document.querySelector(ppOpener.getAttribute('href'));
        openPopup(ppCurrent);
        event.preventDefault();
      })
    }
  }
  if (ppClosers.length > 0) {
    ppClosers.forEach((item, index, arr) => {
      item.addEventListener('click', (event) => {
        const activePopup = document.querySelector('.popup.opened');
        if (activePopup) { closePopup(activePopup) }
        event.preventDefault();
      })
    })
  }
  if (popups.length > 0) {
    for (let i = 0; i < popups.length; i++) {
      popups[i].addEventListener('click', (event) => {
        if (!event.target.closest('.popup__content')) {
          closePopup(popups[i]);
        }
      })
    }
  }
  function openPopup(popup) {
    if (popup && unlock) {
      const popupActive = document.querySelector('.popup.opened');
      if (popupActive) {
        closePopup(popupActive, false);
      }
      else {
        bodyLock();
      }
      popup.classList.add('opened');
      popup.addEventListener('click', (event) => {
        if (!event.target.closest('.popup__content')) {
          closePopup(event.target.closest('.popup'));
        }
      })
    }
  }
  function closePopup(popup, doUnlock = true) {
    if (unlock) {
      popup.classList.remove('opened');
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }
  function openResultPopup(msg = 'Спасибо! Ваша заявка была отправлена.') {
    const msgNode = document.querySelector('#result .result-msg');
    msgNode.textContent = msg;
    openPopup(document.querySelector('#result'));
  }
  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.header').offsetWidth + 'px';
    //console.log(lockPaddingValue);
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }
  function bodyUnlock() {
    setTimeout(() => {
      if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i];
          el.style.paddingRight = '';
        }
      }
      body.style.paddingRight = '';
      body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const activePopup = document.querySelector('.popup.opened');
      closePopup(activePopup);
    }
    //console.log(typeof (e.key));
  })
  //Functions
  function send(form, event, php, succesMSG) {
    const btn = form.querySelector('#formSubmit');

    const oldTextContent = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.setAttribute('disabled', 'disabled');
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
        json = JSON.parse(this.response); // Ебанный internet explorer 11
        console.log(json);

        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          btn.textContent = oldTextContent;
          btn.removeAttribute('disabled');
          openResultPopup(succesMSG);
        } else {
          // Если произошла ошибка
          btn.textContent = oldTextContent;
          btn.removeAttribute('disabled');
          openResultPopup(`Ой... Ошибка. Сообщение не отправлено (${json.result})`);
        }
        // Если не удалось связаться с php файлом
      } else {
        btn.textContent = oldTextContent;
        btn.removeAttribute('disabled');
        openResultPopup('Ошибка сервера. Код ошибки: ' + req.status);
        //alert("Ошибка сервера. Номер: " + req.status);
      }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function () { alert("Ошибка отправки запроса"); };
    req.send(new FormData(event.target));
  }

})

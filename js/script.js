document.addEventListener("DOMContentLoaded", () => {
  document.body.onload = () => {
    Fresh();
  }
  Fresh();
  const ppOpeners = document.querySelectorAll('.popup-open');
  const ppClosers = document.querySelectorAll('.popup-close');
  const popups = document.querySelectorAll('.popup');
  const lockPadding = document.querySelectorAll('.lock-padding');
  const body = document.querySelector('body');

  const selects = document.querySelector('.select');

  const menuBtn = document.querySelector('.menu-btn');
  const menuMobile = document.querySelector('.header__menu-mobile');
  let speakersPageItems;
  if (document.querySelector('.speakers-page')) {
    speakersPageItems = document.querySelectorAll('.speakers__slider-item');
    speakersPageItems.forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.toggle('opened');
      })
    })
  }
  if (document.querySelector('form#sendForm')) {
    form = document.querySelector('form#sendForm');
    form.onsubmit = (event) => {
      event.preventDefault();
      send(form, event, 'mailer/sendForm.php', 'Спасибо! Ваша заявка была отправлена.')
    }
  }
  if (document.querySelector('form#subscribe')) {
    form = document.querySelector('form#subscribe');
    form.onsubmit = (event) => {
      event.preventDefault();
      send(form, event, 'mailer/subscribe.php', 'Теперь вы будете получать рассылку новостей от Бизнес Среды')
    }
  }

  let unlock = true;
  let timeout = 400;
  if (document.querySelector('.counters')) {
    const spans = document.querySelectorAll('.counters__counter span');
    spans.forEach((span) => {
      span.closest('.counters__counter').setAttribute('data-number', span.textContent);
      span.textContent = 0;
    });
  }


  $(document).ready(function () {
    if (document.querySelector('.intro__slider')) {
      $('.intro__slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '#intro-slider-prev',
        nextArrow: '#intro-slider-next',
        fade: true,
        speed: 1000
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
    if (document.querySelector('.popular__slider')) {
      $('.popular__slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '#popular-slider-prev',
        nextArrow: '#popular-slider-next',
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
      onSliderInit('.popular__slider');
    }
    if (document.querySelector('.speakers__slider')) {
      $('.speakers__slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '#speakers-slider-prev',
        nextArrow: '#speakers-slider-next',
        fade: true,
        speed: 1000
      });
      onSliderInit('.speakers__slider');
    }
    if (document.querySelector('.reviews__slider')) {
      $('.reviews__slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '#reviews-slider-prev',
        nextArrow: '#reviews-slider-next',
        //variableWidth: true,
        //fade: true,
        speed: 700
      });
      onSliderInit('.reviews__slider');
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
  window.addEventListener('scroll', () => {
    if (document.querySelector('.counters')) {
      const counters = document.querySelectorAll('.counters__counter');
      counters.forEach((item) => {
        let toTop = item.getBoundingClientRect().top;
        if (toTop <= document.documentElement.clientHeight * 0.8) {
          if (!item.getAttribute('data-started')) {
            item.setAttribute('data-started', true);
            const span = item.querySelector('span');
            const countTo = parseInt(item.getAttribute('data-number'));
            span.textContent = '0';
            span.setAttribute('data-text', 0);

            let duration = 2000; //ms
            let stepDuration = 10; //ms
            let steps = duration / stepDuration;

            let countStep = countTo / steps;
            let interval = setInterval(() => {

              let spanText = parseFloat(span.getAttribute('data-text'));

              if (spanText <= countTo) {
                if ((countTo - spanText) < countStep) {
                  spanText = countTo;
                  span.textContent = spanText;
                  span.setAttribute('data-text', spanText);
                  clearInterval(interval);
                }
                else {
                  spanText = spanText + countStep;
                  span.setAttribute('data-text', spanText);
                  span.textContent = Math.floor(spanText);
                }
              }
              else {
                spanText = countTo;
                span.textContent = spanText;
                span.setAttribute('data-text', spanText);
                clearInterval(interval);
              }
            }, stepDuration);

          }
        }
        else {
          if (toTop > document.documentElement.clientHeight) {
            const span = item.querySelector('span');
            span.setAttribute('data-text', 0);
            span.textContent = '0';
            item.setAttribute('data-started', '');
          }
        }
      })
    }
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
    if (sliderSelector === '.events__slider') {
      let lastActiveDot = '0';
      for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('slick-active')) {
          lastActiveDot = i + 1;
        }
      }
      dotsCount.textContent = `${lastActiveDot}/${slidesCount}`;
    }
    if (sliderSelector === '.popular__slider') {
      let lastActiveDot = '0';
      for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('slick-active')) {
          lastActiveDot = i + 1;
        }
      }
      dotsCount.textContent = `${lastActiveDot}/${slidesCount}`;
    }
    if (sliderSelector === '.speakers__slider') {
      let lastActiveDot = '0';
      for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('slick-active')) {
          lastActiveDot = i + 1;
        }
      }
      dotsCount.textContent = `${lastActiveDot}/${slidesCount}`;

      slides.forEach((slide) => {
        slide.addEventListener('click', () => {
          slide.classList.toggle('opened');
          if (document.documentElement.clientWidth <= 767) {
            if (slide.classList.contains('opened')) {
              sliderWrapper.querySelector('.slider-np').style.zIndex = 998;
            }
            else {
              sliderWrapper.querySelector('.slider-np').style.zIndex = '';
            }
          }
        })
      })

    }
    //on slider change(before)
    $(sliderSelector).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      dotsCount.textContent = `${nextSlide + 1}/${slidesCount}`
      positionSliderControls(sliderSelector, nextSlide);
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
      if (sliderSelector === '.popular__slider') {
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
      if (sliderSelector === '.popular__slider') {
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
    setTimeout(() => {
      positionSliderControls(sliderSelector);
    }, 100);
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
    if (sliderSelector === '.speakers__slider') {
      const arrows = sliderWrapper.querySelector('.slider-np');
      const dots = sliderWrapper.querySelector('.slider-dots');
      const sliderImg = slides[nextSlide].querySelector('.slider-item__img');
      let bottom = sliderWrapper.getBoundingClientRect().bottom - sliderImg.getBoundingClientRect().bottom;

      arrows.style.bottom = bottom + 'px';
      dots.style.bottom = (bottom - 50) + 'px';
    }
    if (sliderSelector === '.reviews__slider') {
      const arrows = sliderWrapper.querySelector('.slider-np');
      const sliderImg = slides[nextSlide].querySelector('.slider-item__img');
      let bottom = sliderWrapper.getBoundingClientRect().bottom - sliderImg.getBoundingClientRect().bottom;

      arrows.style.bottom = bottom + 'px';
    }
  }
  function Fresh() {
    if (document.querySelector('.intro__slider')) {
      positionSliderControls('.intro__slider');
    }
    if (document.querySelector('.speakers__slider')) {
      positionSliderControls('.speakers__slider');
    }
    if (document.querySelector('.reviews__slider')) {
      positionSliderControls('.reviews__slider');
    }
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
    console.log(form);
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

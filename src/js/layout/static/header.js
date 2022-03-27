import refs from '../../refs/refs.js';
import { favoritesRender } from '../../call-list/favorites.js';
import { contactRender } from '../../call-list/contact.js';
import { showroomRender } from '../../call-list/showroom.js';
import { catalogRender } from '../../call-list/catalog.js';
import { brandRender } from '../../call-list/brand.js';
import { reviewsRender } from '../../call-list/reviews.js';
import { fittingRender } from '../../call-list/fitting.js';
import { deliveryRender } from '../../call-list/delivery.js';

const {
  headerEl,
  buttonMobEl,
  svgMobEl,
  svgBinEl,
  socialMobEl,
  logoSvgEl,
  logoTextEl,
  listTextEl,
  svgFavoritesEl,
  navigationEl,
  bodyEl,
  navListEl,
  navSublistEl,
  wrapperEl,
  navLinkEl,
  favoritesEl,
  favQuantityEl,
  binQuantityEl,
} = refs;

//! ---------- MODAL OF THE MOBILE VERSION -----------
buttonMobEl.addEventListener('click', fnMobileMenu);

function fnMobileMenu() {
  headerEl.classList.toggle('mod-background-color');
  headerEl.classList.toggle('mobile-menu');
  svgMobEl.forEach(element => element.classList.toggle('js-mod-hidden'));
  svgBinEl.classList.toggle('mod-stroke');
  svgBinEl.classList.toggle('mod-fill-transp');
  socialMobEl.classList.toggle('js-mod-hidden');
  logoSvgEl.classList.toggle('mod-fill');
  logoTextEl.classList.toggle('mod-color');
  listTextEl.forEach(element => element.classList.toggle('mod-color'));
  svgFavoritesEl.classList.toggle('mod-stroke');
  navigationEl.classList.toggle('js-hidden-mobile');
  wrapperEl.classList.toggle('wrapper');
  bodyEl.classList.toggle('mobile-open');

  if (!buttonMobEl.children[1].classList.contains('js-mod-hidden')) {
    navigationEl.addEventListener('click', fnMobileList);
  }

  if (buttonMobEl.children[1].classList.contains('js-mod-hidden')) {
    navigationEl.removeEventListener('click', fnMobileList);
  }
}

// ! ---------- MOBILE VERSION MENU -----------
let markup;

function fnMobileList(event) {
  if (event.target.parentElement.children.length !== 1) {
    if (navListEl.children.length > 1) {
      markup = navListEl.innerHTML;
      [...navSublistEl].forEach(element => element.classList.toggle('js-hidden-mobile'));
      [...navLinkEl].forEach(element => element.classList.toggle('mod-rotate-navigation'));
      navListEl.innerHTML = event.target.parentNode.outerHTML;
    } else {
      navListEl.innerHTML = '';
      navListEl.insertAdjacentHTML('afterbegin', markup);
    }
  } else {
    fnRender(event);
    fnMobileMenu();
  }
}

//! ----------RECORD IN LOCAL STORAGE -----------
function fnSavelocalStorage(event) {
  if (event.target.dataset.atribute) localStorage.setItem('content', event.target.dataset.atribute);
}

//! ----------CHANGE OF COLOR OF THE TEXT OF QUANTITY IN THE BASKET AND DEFENDED -----------
if (Number(favQuantityEl.textContent) > 0) fnChangeColor(favQuantityEl);
if (Number(binQuantityEl.textContent) > 0) fnChangeColor(binQuantityEl);

function fnChangeColor(element) {
  element.style.color = 'red';
}

//! ---------- PAGE RENDERS -----------
navigationEl.addEventListener('click', fnRender);
function fnRender(event) {
  fnSavelocalStorage(event);

  if (event.target.textContent === 'НОВИНКИ' || event.target.textContent === 'Акции')
    catalogRender();

  if (event.target.className === 'header__nav-sublink') {
    if (
      event.target.parentNode.parentNode.previousElementSibling.textContent === 'КАТЕГОРИИ' ||
      event.target.parentNode.parentNode.previousElementSibling.textContent === 'НАШИ КОЛЛЕКЦИИ'
    ) {
      catalogRender();
    }
  }

  if (event.target.textContent === 'Доставка' || event.target.textContent === 'Возврат')
    deliveryRender();

  if (event.target.textContent === 'Примерка') fittingRender();

  if (event.target.textContent === 'ШОУРУМ' || event.target.textContent === 'Шоурум')
    showroomRender();

  if (event.target.textContent === 'КОНТАКТЫ') contactRender();

  if (
    event.target.textContent === 'О БРЕНДЕ' ||
    event.target.textContent === 'Статьи' ||
    event.target.textContent === 'Блог'
  )
    brandRender();

  if (event.target.textContent === 'Отзывы') reviewsRender();
}

favoritesEl.addEventListener('click', favoritesRender);

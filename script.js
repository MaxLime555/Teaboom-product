'use strict';

// Цены хранятся в копейках, чтобы избежать ошибок дробной арифметики.
const variants = {
  100: { sku: '01306', price: 32640, oldPrice: 34920 },
  500: { sku: '01307', price: 143200, oldPrice: 164600 },
  1000: { sku: '01308', price: 206400, oldPrice: 259200 },
  5000: { sku: '01309', price: 632000, oldPrice: 871000 },
};

const currency = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const formatPrice = (kopecks) => currency.format(kopecks / 100);

const form = document.querySelector('.product__form');
const sku = document.querySelector('#sku');
const price = document.querySelector('#price');
const oldPrice = document.querySelector('#old-price');
const previous = document.querySelector('#previous');
const saving = document.querySelector('#saving');
const feedback = document.querySelector('#cart-feedback');

function updateVariant(weight) {
  const variant = variants[weight];
  if (!variant) return;

  const hasDiscount = variant.oldPrice > variant.price;
  sku.textContent = variant.sku;
  price.textContent = formatPrice(variant.price);
  oldPrice.textContent = hasDiscount ? formatPrice(variant.oldPrice) : '';
  previous.hidden = !hasDiscount;
  saving.hidden = !hasDiscount;
  saving.textContent = hasDiscount
    ? `Выгода ${formatPrice(variant.oldPrice - variant.price)}`
    : '';
  feedback.textContent = '';
}

form.addEventListener('change', (event) => {
  if (event.target.name === 'packing') updateVariant(event.target.value);
});

// Демонстрация реакции кнопки. Запросов и реальной корзины нет.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const selected = form.elements.packing.value;
  feedback.textContent = `Выбрано ${selected} г. Это демонстрация — заказ не оформляется.`;
});

// Учитываем восстановленное браузером состояние радиокнопок.
updateVariant(form.elements.packing.value);
window.addEventListener('pageshow', () => updateVariant(form.elements.packing.value));

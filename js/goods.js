'use strict';

var contentBasket = document.querySelector('.goods__cards');
contentBasket.classList.remove('goods__cards--empty');
var hideBasket = document.querySelector('.goods__card-empty');
hideBasket.classList.add('visually-hidden');

var content = document.querySelector('.catalog__cards');
content.classList.remove('catalog__cards--load');
var hide = document.querySelector('.catalog__load');
hide.classList.add('visually-hidden');

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};
var randomData = function (setting) {
  var data = setting[Math.floor(Math.random() * setting.length)];
  return data;
};
var COMPOSITION = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var AVAILABLE = [true, false];
var GOODS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PICS = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];

var generateArray = function () {
  var arr = [];

  for (var i = 0; i < 26; i++) {
    var obj = {
      name: randomData(GOODS),
      picture: randomData(PICS),
      amount: randomInteger(0, 20),
      price: randomInteger(100, 1500),
      weight: randomInteger(30, 300),
      rating: {
        value: randomInteger(1, 5),
        number: randomInteger(10, 900)
      },
      nutritionFacts: {
        sugar: randomData(AVAILABLE),
        energy: randomInteger(70, 500),
        contents: randomData(COMPOSITION) + ', ' + randomData(COMPOSITION) + ', ' + randomData(COMPOSITION) + ', ' + randomData(COMPOSITION) + ', ' + randomData(COMPOSITION),
      }
    };
    arr.push(obj);
  }
  return arr;
};

var goodsArray = generateArray();
var goodBlock = document.querySelector('.catalog__cards');
var GoodTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

var renderGood = function (good) {
  var goodElement = GoodTemplate.cloneNode(true);
  goodElement.querySelector('.card__img').src = good.picture;
  goodElement.querySelector('.card__title').textContent = good.name;
  goodElement.querySelector('.star__count').textContent = '(' + good.rating.number + ')';
  goodElement.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;
  goodElement.querySelector('.card__price').innerHTML = good.price + '<span class="card__currency"> ₽</span><span class="card__weight">/' + good.weight + ' Г</span>';
  goodElement.classList.remove('card--in-stock');
  if (good.amount > 5) {
    goodElement.classList.add('card--in-stock');
  } else if (good.amount >= 1 && good.amount <= 5) {
    goodElement.classList.add('card--little');
  } else if (good.amount === 0) {
    goodElement.classList.add('card--soon');
  }

  goodElement.classList.remove('stars__rating--five');
  if (good.rating.value === 1) {
    goodElement.classList.add('stars__rating--one');
  } else if (good.rating.value === 2) {
    goodElement.classList.add('stars__rating--two');
  } else if (good.rating.value === 3) {
    goodElement.classList.add('stars__rating--three');
  } else if (good.rating.value === 4) {
    goodElement.classList.add('stars__rating--four');
  } else if (good.rating.value === 5) {
    goodElement.classList.add('stars__rating--five');
  }
	return goodElement;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < goodsArray.length; i++) {
  fragment.appendChild(renderGood(goodsArray[i]));

}
goodBlock.appendChild(fragment);

var goodInBasketBlock = document.querySelector('.goods__cards');
var goodInBasketTemplate = document.querySelector('#card-order')
    .content
    .querySelector('.goods_card');

var generateArrayInBasket = function () {
  var arr = [];

  for (var l = 0; l < 3; l++) {
    var obj = {
      name: randomData(GOODS),
      picture: randomData(PICS),
      amount: randomInteger(0, 20),
      price: randomInteger(100, 1500),
      weight: randomInteger(30, 300),
      rating: {
        value: randomInteger(1, 5),
        number: randomInteger(10, 900)
      },
      nutritionFacts: {
        sugar: randomData(AVAILABLE),
        energy: randomInteger(70, 500),
        contents: randomData(COMPOSITION) + ', ' + randomData(COMPOSITION) + ', ' + randomData(COMPOSITION) + ', ' + randomData(COMPOSITION) + ', ' + randomData(COMPOSITION),
      }
    };
    arr.push(obj);
  }
  return arr;
};
var goodsArrayInBasket = generateArrayInBasket();

var renderGoodInBasket = function (goodIn) {
  var goodElement = goodInBasketTemplate.cloneNode(true);
  goodElement.querySelector('.card-order__img').src = goodIn.picture;
  goodElement.querySelector('.card-order__price').textContent = goodIn.price + '₽';
  goodElement.querySelector('.card-order__title').textContent = goodIn.name;
  return goodElement;
};
var basket = document.createDocumentFragment();
for (var l = 0; l < goodsArrayInBasket.length; l++) {
  basket.appendChild(renderGoodInBasket(goodsArrayInBasket[l]));
}
goodInBasketBlock.appendChild(basket);




const products = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Товар ${i + 1}`,
  image: "/resources/iphone15.png",
  article: `А-${Math.floor(Math.random() * 10) + 1}`,
  stock: Math.floor(Math.random() * 5) + 1,
  price: Math.floor(Math.random() * 5000) + 500
}));

const prices = products.map(p => p.price);

//flip
function generateTable() {
  const table = document.getElementById("productTable");
  const maxStock = 5;

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  headRow.innerHTML = `<th>Артикул \\ Кол-во</th>` +
    Array.from({ length: maxStock }, (_, i) => `<th>${i + 1}</th>`).join('');
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  products.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${product.article}</td>`;

    for (let i = 1; i <= maxStock; i++) {
      const cell = document.createElement("td");

      if (i === product.stock) {
        const flipCard = document.createElement("div");
        flipCard.className = "flip-card";

        const flipInner = document.createElement("div");
        flipInner.className = "flip-inner";

        const front = document.createElement("div");
        front.className = "front";
        const img = document.createElement("img");
        img.src = product.image;
        front.appendChild(img);

        const back = document.createElement("div");
        back.className = "back";
        back.textContent = "Цена:";

        flipInner.appendChild(front);
        flipInner.appendChild(back);
        flipCard.appendChild(flipInner);
        cell.appendChild(flipCard);

        //переворота карточки
        flipCard.onclick = (function (card, price) {
          return function () {
            card.classList.toggle("flipped");
            // Когда карточка повернулась, показать цену
            const back = card.querySelector('.back');
            back.textContent = `Цена: ${price} BYN`;
          };
        })(flipCard, product.price);
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
}

//фильтр
function applyPriceFilter() {
  const filter = document.getElementById("priceFilter").value;
  let result;

  switch (filter) {
    case "min":
      result = Math.min(...prices);
      break;
    case "max":
      result = Math.max(...prices);
      break;
    case "avg":
      const sum = prices.reduce((acc, p) => acc + p, 0);
      result = Math.round(sum / prices.length);
      break;
  }
  let article = '';
  if (filter === 'min' || filter === 'max') {
    const product = products.find(p => p.price === result);
    article = product ? product.article : "Нет товара";

    document.getElementById("price").textContent = `Результат: артикул ${article}, цена ${result} BYN`;
  } else {
    document.getElementById("price").textContent = `Результат: цена ${result} BYN`;
  }

}

generateTable();

// Доп this, bind, call, apply
const dataHandler = {
  data: [10, 20, 30],
  logData: function () {
    console.log("Текущие данные:", this.data);
  },
  processData: function (factor) {
    this.data = this.data.map(n => n * factor);
  },
  loadData: function (callback) {
    setTimeout(() => {
      this.data = [5, 15, 25];
      callback();
    }, 1500);
  }
};

// Потеря контекста
const log = dataHandler.logData;
log(); // undefined

//с bind OK
const boundLog = dataHandler.logData.bind(dataHandler);
boundLog();

// call
dataHandler.processData.call(dataHandler, 2);
dataHandler.logData();

// apply
dataHandler.processData.apply(dataHandler, [3]);
dataHandler.logData();

// Асинхронная цепочка
dataHandler.loadData(function () {
  dataHandler.processData.bind(dataHandler)(4);
  dataHandler.logData();
});



const imageMap = new Map([
    [1, { src: "/sliderPage/images/iphone12.png", name: "iPhone 12", price: "79 999₽" }],
    [2, { src: "/sliderPage/images/iphone14.png", name: "iPhone 14", price: "99 999₽" }],
    [3, { src: "/sliderPage/images/iphone16.png", name: "iPhone 16", price: "119 999₽" }],
    [4, { src: "/sliderPage/images/iphone16Pro.png", name: "iPhone 14 Pro", price: "109 999₽" }],
    [5, { src: "/sliderPage/images/iphoneSE.png", name: "iPhone 12 Mini", price: "69 999₽" }],
    [6, { src: "/sliderPage/images/iphone15Pro.png", name: "iPhone 16 Pro", price: "129 999₽" }]
]);

const discounts = [
    {
        src: "/sliderPage/images/iphone12.png",
        name: "iPhone 12",
        oldPrice: "79 999₽",
        newPrice: "59 999₽"
    },
    {
        src: "/sliderPage/images/iphone14.png",
        name: "iPhone 14",
        oldPrice: "99 999₽",
        newPrice: "74 999₽"
    },
    {
        src: "/sliderPage/images/iphone16.png",
        name: "iPhone 16",
        oldPrice: "119 999₽",
        newPrice: "89 999₽"
    }
];

let currentIndex = 1;
let maxCount = 0; //колво товаров показать
let delay = 1000;
let intervalId = null; //айди таймера для остановки через clearInterval()

// получение эл-в со страницы
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const imageCountInput = document.getElementById("imageCountInput");
const delayInput = document.getElementById("delayInput");
const sliderImage = document.getElementById("sliderImage");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const endMessage = document.getElementById("endMessage");

const discountImage = document.getElementById("discountImage");
const discountName = document.getElementById("discountName");
const oldPrice = document.getElementById("oldPrice");
const newPrice = document.getElementById("newPrice");
const discountTimer = document.getElementById("discountTimer");

let discountIndex = 0; //тек номер в массиве товаров
let discountTime = 15;
let discountInterval = null; //айди таймера скидок

//получ объект по ключу индекс из мэп
function showImage(index) {
    const data = imageMap.get(index);
    if (data) {
        sliderImage.src = data.src;

        productName.textContent = data.name;

        productPrice.textContent = `Цена: ${data.price}`;
    }
}

function startSlider() {
    //введеное п значение
    maxCount = parseInt(imageCountInput.value); 
    delay = parseInt(delayInput.value) || 1000;

    if (isNaN(maxCount) || maxCount < 1 || maxCount > imageMap.size) {
        alert("Введите число от 1 до " + imageMap.size);
        return;
    }

    endMessage.style.display = "none";
    currentIndex = 1;
    showImage(currentIndex);

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        currentIndex++;
        if (currentIndex > maxCount) {
            clearInterval(intervalId);

            endMessage.style.display = "block";
        } else {
            showImage(currentIndex);
        }
    }, delay);
}

function stopSlider() {
    clearInterval(intervalId);
    clearInterval(discountInterval);
}

// товар-скидка
function updateDiscountProduct() {
    const product = discounts[discountIndex];


    discountProduct.classList.add('hidden');

    setTimeout(() => {
        // обновл скидочн товар
        discountImage.src = product.src;
        discountName.textContent = product.name;
        oldPrice.textContent = product.oldPrice;
        newPrice.textContent = product.newPrice;
        discountTimer.textContent = discountTime;

        // показать новый товар
        discountProduct.classList.remove('hidden');
    }, 500);

}

function startDiscountTimer() {
    updateDiscountProduct();
    clearInterval(discountInterval);
//каждую секунду уменьшает discountTime на 1
    discountInterval = setInterval(() => {
        //чтобы было видно сколько времени осталось
        discountTime--;
        discountTimer.textContent = discountTime;

        if (discountTime <= 0) {
            discountIndex = (discountIndex + 1) % discounts.length;
            discountTime = 15;
            updateDiscountProduct();
        }
    }, 1000);
}

startBtn.addEventListener("click", () => {
    startSlider();
    startDiscountTimer();
});

stopBtn.addEventListener("click", stopSlider);


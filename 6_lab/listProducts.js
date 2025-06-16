class TechStore {
    constructor() {
        this.categories = new Map();
        this.titles = new Set();
    }

    addCategory(name) {
        if (!this.categories.has(name)) {
            this.categories.set(name, []);
            this.titles.add(name);
            this.render();
        }
    }

    addModel(category, model, position) {
        if (this.categories.has(category)) {
            const models = this.categories.get(category);

            if (position >= 0 && position <= models.length) {
                models.splice(position, 0, model);
                this.categories.set(category, models);
                this.render();
            }
        }
    }

    changeTitle(oldTitle, newTitle) {
        if (this.categories.has(oldTitle)) {
            const models = this.categories.get(oldTitle);
            this.categories.delete(oldTitle);
            this.categories.set(newTitle, models);
            this.titles.delete(oldTitle);
            this.titles.add(newTitle);
            this.render();
        }
    }

    render() {
        const categoryBlock = document.getElementById('category-block');
        categoryBlock.innerHTML = '';
        const categorySelect = document.getElementById('category-select');
        categorySelect.innerHTML = '';
        const positionSelect = document.getElementById('position-select');
        positionSelect.innerHTML = '';

        this.categories.forEach((models, title) => {
      
            const titleElement = document.createElement('h1');
            titleElement.textContent = title;


            const list = document.createElement('ol');
            models.forEach((model) => {
                const item = document.createElement('li');
                item.textContent = model;
                list.appendChild(item);
            });


            categoryBlock.appendChild(titleElement);
            categoryBlock.appendChild(list);

            const option = document.createElement('option');
            option.value = title;
            option.textContent = title;
            categorySelect.appendChild(option);
        });


        const selectedCategory = categorySelect.value;
        const selectedModels = this.categories.get(selectedCategory) || [];
        for (let i = 1; i <= selectedModels.length + 1; i++) {
            const posOption = document.createElement('option');
            posOption.value = i;
            posOption.textContent = i;
            positionSelect.appendChild(posOption);
        }
    }
}

const store = new TechStore();
store.addCategory('Телевизоры');
store.addCategory('Ноутбуки');
store.addCategory('Смартфоны');

store.addModel('Телевизоры', 'Samsung QLED', 0);
store.addModel('Телевизоры', 'LG OLED', 1);
store.addModel('Ноутбуки', 'Dell XPS', 0);
store.addModel('Ноутбуки', 'MacBook Air', 1);
store.addModel('Смартфоны', 'iPhone 14', 0);
store.addModel('Смартфоны', 'Samsung Galaxy S23', 1);

function addModel() {
    if (validateInput()) {
        const category = document.getElementById('category-select').value;
        const model = document.getElementById('model-input').value;
        const position = parseInt(document.getElementById('position-select').value, 10) - 1;
        if (category && model) {
            store.addModel(category, model, position);
            document.getElementById('model-input').value = '';
        }
    }

}

function changeTitle() {

    if (validateCategoryInput) {
        const category = document.getElementById('category-select').value;
        const newTitle = document.getElementById('title-input').value;
        if (category && newTitle) {
            store.changeTitle(category, newTitle);
            document.getElementById('title-input').value = '';
            const input = document.getElementById("title-input")
            input.classList.remove("error");

        }
    }

}

function validateInput() {
    const input = document.getElementById("model-input");
    if (input.value.trim() === "") {
        input.classList.add("error");
        return false
    } else {
        input.classList.remove("error");
        return true;
    }
}

function validateCategoryInput() {
    const input = document.getElementById("title-input");
    if (input.value.trim() === "") {
        input.classList.add("error");
        return false
    } else {
        input.classList.remove("error");
        return true;
    }
}


/*loader*/

window.onload = function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden'); 
    }, 700); 
};
class PhoneModel {
    constructor(id, name, manager, phone, employeeCount, totalSum) {
        this.id = id;
        this.name = name;
        this.manager = manager;
        this.phone = phone;
        this.employeeCount = employeeCount;
        this.totalSum = totalSum;
        this.additionalProperties = {}; 
    }

    
    display() {
        return `${this.name}, ${this.manager}, ${this.phone}, ${this.employeeCount}, ${this.totalSum}`;
    }

   
    addProperty(key, value) {
        this.additionalProperties[key] = value;
    }

    
    removeProperty(key) {
        delete this.additionalProperties[key];
    }
}


const phoneModels = JSON.parse(localStorage.getItem('phoneModels')) || []; 

//сохр в сторэдж
function updateStorage() {
    localStorage.setItem('phoneModels', JSON.stringify(phoneModels));
} 


function addPhoneModel(model) {
    phoneModels.push(model);
    updateStorage();
    renderTable();
    updateDropdown();
}
//********** */

function deletePhoneModel(id) {
    const index = phoneModels.findIndex(model => model.id == id);
    if (index !== -1) {
        phoneModels.splice(index, 1);
        updateStorage();
        renderTable();
        updateDropdown();
    }
}

// Очистка табл
function clearTable() {
    phoneModels.length = 0; 
    updateStorage(); 
    renderTable(); 
    updateDropdown(); 
}



function renderTable() {
    const tableBody = document.getElementById('department-table-body');
    tableBody.innerHTML = '';
    phoneModels.forEach(model => {
        const additionalProps = Object.entries(model.additionalProperties)
            .map(([key, value]) => `${key}: ${value}`).join(', ');
        const row = `<tr>
            <td>${model.id}</td>
            <td>${model.name}</td>
            <td>${model.manager}</td>
            <td>${model.phone}</td>
            <td>${model.employeeCount}</td>
            <td>${model.totalSum}</td>
            <td>${additionalProps}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}


function updateDropdown() {
    const idDropdown = document.getElementById('id-select');
    const propertyIdDropdown = document.getElementById('property-id-select');

    idDropdown.innerHTML = '';
    propertyIdDropdown.innerHTML = '';

    phoneModels.forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.textContent = model.id;
        idDropdown.appendChild(option);

        const propertyOption = document.createElement('option');
        propertyOption.value = model.id;
        propertyOption.textContent = model.id;
        propertyIdDropdown.appendChild(propertyOption);
    });
}

// Генерация ID 
function generateId() {
    return Math.floor(100 + Math.random() * 90000); 
}


function init() {
    renderTable();
    updateDropdown();

    document.getElementById('add-btn').addEventListener('click', () => {
        const id = generateId();
        const name = document.getElementById('name').value;
        const manager = document.getElementById('manager').value;
        const phone = document.getElementById('phone').value;
        const employeeCount = document.getElementById('employeeCount').value;
        const totalSum = document.getElementById('totalSum').value;

        const newModel = new PhoneModel(id, name, manager, phone, employeeCount, totalSum);
        addPhoneModel(newModel);
    });

    document.getElementById('delete-btn').addEventListener('click', () => {
        const id = document.getElementById('id-select').value;
        deletePhoneModel(id);
    });

    document.getElementById('clear-btn').addEventListener('click', () => {
        document.getElementById('form').reset();
    });

    document.getElementById('clear-table-btn').addEventListener('click', clearTable);


    /********* */
    document.getElementById('add-property-btn').addEventListener('click', () => {
        const id = document.getElementById('property-id-select').value;
        const property = document.getElementById('property-select').value;
        const value = document.getElementById('property-value').value;

        const model = phoneModels.find(m => m.id == id);
        if (model) {
            model.addProperty(property, value);
            updateStorage();
            renderTable();
        }
    });
    /******** */

    document.getElementById('remove-property-btn').addEventListener('click', () => {
        const id = document.getElementById('property-id-select').value;
        const property = document.getElementById('property-select').value;

        const model = phoneModels.find(m => m.id == id);
        if (model) {
            model.removeProperty(property);
            updateStorage();
            renderTable();
        }
    });

    document.getElementById('show-managers-btn').addEventListener('click', () => {
        const maxSalesModel = phoneModels.reduce((max, model) => model.employeeCount > max.employeeCount ? model : max, phoneModels[0]);
        const minSalesModel = phoneModels.reduce((min, model) => model.employeeCount < min.employeeCount ? model : min, phoneModels[0]);

        const managerInfo = document.getElementById('manager-info');
        managerInfo.innerHTML = `
            <p>Менеджер с максимальными продажами: ${maxSalesModel.manager} (${maxSalesModel.employeeCount} проданных)</p>
            <p>Менеджер с минимальными продажами: ${minSalesModel.manager} (${minSalesModel.employeeCount} проданных)</p>
        `;
    });
}

window.onload = init;

document.getElementById('back-btn').addEventListener('click', () => {
    window.history.back(); 
});

document.getElementById("phone").addEventListener("blur", function () {
    const phoneNumber = document.getElementById("phone").value;

    const regex = /^\+\d{13}$/;
    if (!regex.test(phoneNumber)) {
        alert('Введите корректный номер телефона в формате: +375YYXXXXXXX');
    }
});

document.getElementById("totalSum").addEventListener("blur", function () {
    const phoneNumber = document.getElementById("totalSum").value;

    const regex = /^[0-9]+$/;
    if (!regex.test(phoneNumber)) {
        alert('Введите корректный номер телефона в формате: +375YYXXXXXXX');
    }
});
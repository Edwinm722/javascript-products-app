class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
               <div class="card-body">
                    <strong>Nombre del producto</strong>:  ${product.name}
                    <strong>Precio del producto</strong>:  ${product.price}
                    <strong>Año del producto</strong>:  ${product.year}   
                    <a href="#" class="btn btn-danger" name="delete">eliminar</a>                
               </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado Satisfactoriamente', 'danger');
        }

    }

    showMessage(message, cssClass) {
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
    
        // Show in The DOM
        const container = document.querySelector(".container");
        const app = document.querySelector("#App");
    
        // Insert Message in the UI
        container.insertBefore(div, app);
    
        // Remove the Message after 3 seconds
        setTimeout(function () {
          document.querySelector(".alert").remove();
        }, 3000);
        
    }
}

// DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function(Events) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value; 
        const year = document.getElementById('year').value;  

        const product = new Product(name, price, year);

        const ui = new UI();
        if(name === '' || price === '' || year === ''){
            return ui.showMessage('completa los campos porfavor', 'info');
        }
        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage(`Producto Agregado Satisfactoriamente`, `success`);

        Events.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function(element) {
   const ui = new UI();
   ui.deleteProduct(element.target)
});
contentContainer = document.getElementById('content-container')
const homeButton = document.getElementById('show-ducks');
const cartProductsButton = document.getElementById('show-cart-products');
file = 'https://raw.githubusercontent.com/markosAMO/JavaScript-Coder/main/Project/data/ducks.json';
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    width: 300,
    color: 'whitesmoke',
    timer: 2000,
});
//Sessions -> not in use
class User{
    constructor(username){
        this.username = username;
        this.password = password;
    }
}

class DuckService{
    constructor(){
        this.ducks = [];
    }
    addDuck(duck){
        const duck_with_that_race = this.getDuckByRace(duck.race);
        if(duck_with_that_race){
            //actualiza la cantidad de patos que hay con esa raza a la venta
            duck_with_that_race.updateQuantity(duck.quantity);
        }else
            //si es un pato con una raza no registrada, actualiza
            this.ducks.push(duck);
        console.log("actualizado ", this.ducks);
            
    }
    getAllDucks(){
        return this.ducks;
    }
    getDuckById(id){
        return this.ducks.find((aDuck) => aDuck.id===id);
    }
    getDuckByRace(race){
        return this.ducks.find((aDuck) => aDuck.race===race);
    }
    deleteById(id){
        indexToRemove = this.ducks.findIndex(duck => duck.id === id);
        if(indexToRemove != -1){
            this.ducks.splice(indexToRemove, 1);
        }else
            alert('this id does not exist');
    }
    updateQuantity(id, quantity){
        let indexToUpdate = this.ducks.findIndex(duck => duck.id === id);
        console.log(id);
        console.log(indexToUpdate);
        if(indexToUpdate != -1){
            this.ducks[indexToUpdate].quantity += quantity;
        }else
            alert('this id does not exist');
    }
}

class Duck{
    constructor(duck){
        this.id = duck.id;
        this.price = duck.price;
        this.race = duck.race;
        this.quantity = duck.quantity;
        this.image = duck.image
        /* this.image = duck.image; */
    }
    //updates the quantity of this specific duck to sell
    updateQuantity(quantity){
        this.quantity+=quantity;
    }
}

class shoppingCart{
    constructor(){
        this.items = [];
    }
    getTotal(){
        let total = 0;
        this.items.forEach(element => {
            total += element.price;
        });
        return total;
    }
    getItems(){
        return this.items;
    }
    emptyCart(){
        /* for(item of this.items){
            //to empty the cart, we need to full the availible products that you don't end up buying
            
        } */
        this.items = [];
    }
    addItem(item, quantity){
        let element = this.items.find((e)=>e.id===item.id);
        if(element){
            element.quantity++;
        }else{
            this.items.push({
                id: item.id,
                price: item.price*quantity,
                race: item.race,
                quantity: quantity,
                image: item.image
            });
        }
    }
    getDuckById(id){
        return this.items.find((aDuck) => aDuck.id===id);
    }
    removeItem(id){
        let indexToRemove = this.items.findIndex(item => item.id === id);
        if(indexToRemove != -1){
            this.items.splice(indexToRemove, 1);
        }else
            alert('this id does not exist');
    }
}

//cargar datos por prompt - sin uso
function solitudeDuckData(){
    id = parseInt(prompt('Please insert the id of the duck you want to add'));
    if(getDuckById(id)){
        price = parseFloat(prompt('Please insert the price of the duck you want to add'))
        race = prompt('Please insert the race of the duck you want to add');
        quantity = prompt('Please insert the quantity of the duck available');
        let aDuck = {
            id: id,
            price: price,
            race: race,
            quantity: quantity,
        }    
        return new Duck(aDuck);    
    }else
        prompt('id ya existente');
        
}

function showProducts() {
    contentContainer.innerHTML='';
    let rowBreak = 0;
    let column = document.createElement('div');
    column.classList.add('columns');
    console.log(duckService.getAllDucks())
    duckService.getAllDucks().forEach((duck) => {
        rowBreak++;
        if(rowBreak==6){
            column = document.createElement('div');
            column.classList.add('columns');
            rowBreak = 0;
        }
        column.innerHTML += `
        <div class="column is-one-fifth">
            <div class="card">
            <p class="card-header-title">
                Duck ${duck.race}
            </p>
                <div class="card-image">
                <figure class="image is-1by1">
                    <img src=${duck.image} alt="Placeholder image">
                </figure>
                <footer class="card-footer">
                    <a id=${duck.id} class="addToCart card-footer-item" href="#">Add to Cart</a>
                </footer>
            </div>
        </div>`;
        contentContainer.appendChild(column);
    });
}

function showCartPorducts(){
    contentContainer.innerHTML='';
    let rowBreak = 0;
    let column = document.createElement('div');
    column.classList.add('columns');
    cart.getItems().forEach((duck) => {
        rowBreak++;
        if(rowBreak==6){
            column = document.createElement('div');
            column.classList.add('columns');
            rowBreak = 0;
        }
        column.innerHTML += `
        <div class="column is-one-fifth">
            <div class="card">
            <p class="card-header-title">
                Duck ${duck.race} 
                <br> to buy: ${duck.quantity} total: ${duck.quantity*duck.price}</br>
            </p>
                <div class="card-image">
                <figure class="image is-1by1">
                    <img src=${duck.image} alt="Placeholder image">
                </figure>
                <footer class="card-footer">
                    <a id=${duck.id} class="deleteFromCart card-footer-item" href="#">Delete</a>
                </footer>
            </div>
        </div>`;
        contentContainer.appendChild(column);
    });
    price =  document.createElement('div');
    price.classList.add('total');
    price.innerHTML = `<h1 class="title">Total To Pay: ${cart.getTotal()}</h1>`
    contentContainer.appendChild(price);

    emptyButton = document.createElement('div');
    emptyButton.classList.add('empty');
    emptyButton.innerHTML=`<button style="margin: 5px;" class="button is-danger">Empty Cart</button>`;
    emptyButton.addEventListener('click', emptyCartEvent);
    contentContainer.appendChild(emptyButton);

    payButton = document.createElement('div');
    payButton.classList.add('pay');
    payButton.innerHTML=`<button style="margin: 5px;"  class="button is-danger">Pay Products</button>`;
    payButton.addEventListener('click', payment);
    contentContainer.appendChild(payButton);
}

function payment(){
    Swal.fire({
        icon: 'success',
        title: 'Successfull payment',
        text: 'thanks for buying a duck',
        timerProgressBar: true,
        timer: 3000,
    });
    for(item of cart.getItems()){
         console.log("the id is: ", item.id);
        duckService.updateQuantity(item.id, -item.quantity);
    }
    emptyCartEvent();
}

function deleteItemFromCart(e){
    e.preventDefault();
    if (e.target.classList.contains('deleteFromCart')) {
        Toast.fire({
            icon: 'error',
            title: 'duck deleated',
            background: '#8B0000',
        });
        const duckSelected = e.target.parentElement;
        duckId = parseInt(duckSelected.querySelector('a').getAttribute('id'));
        cartDuck = cart.getDuckById(duckId);
        if(cartDuck){
            cart.removeItem(duckId);
            showCartPorducts();
        }
    }
    storeCart();
}

function emptyCartEvent(){
    Swal.fire({
        title: 'Limpiar carrito',
        text: 'This will delete all the ducks in your cart',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
    }).then((btnResponse) => {
        if (btnResponse.isConfirmed) {
            cart.emptyCart();
            localStorage.setItem('cart', JSON.stringify([]));
            storeCart();
            showCartPorducts();
        }
    });
    
}

function addItemToCart(e){
    e.preventDefault(); 
    if (e.target.classList.contains('addToCart')) {
        Toast.fire({
            icon: 'success', // success
            title: 'nice duck selection', // agregado
            background: '#34b555', // #34b555
        });
        const duckSelected = e.target.parentElement;
        duckId = parseInt(duckSelected.querySelector('a').getAttribute('id'));
        duck = duckService.getDuckById(duckId);
        cartDuck = cart.getDuckById(duckId);
        if(cartDuck){ //if the duck is in the cart already chekc if there's stock
            (cartDuck.quantity < duck.quantity) ? cart.addItem(duck, 1) : alert('we dont have stock for this buying, try again later');   
        }else
            cart.addItem(duck, 1);
    }
    storeCart();
}
function storeCart(){
    const objectString = JSON.stringify(cart.items);
    localStorage.setItem('cart', objectString);
}

async function fullDataItems(duckService, ducks){
    ducks.forEach(element => {
        duckService.addDuck(new Duck(duck = {
            id: element.id,
            price: element.price,
            race: element.race,
            quantity: element.quantity,
            image: element.image
        }));
    });
}

async function getDucks(file){
    try{
        //response contiene los datos de la petición (status, headers, data)
        const response = await fetch(file);
        if(!response.ok){
            throw new Error(`error: ${response.status}`)
        }
        data = await response.json();
        return data;
    } catch(error){
        console.log("we have a problem" + `${response.status}`)   
    }
}

async function loadDucks(duckService){
    const ducks = await getDucks(file);
    await fullDataItems(duckService, ducks);
    showProducts();
}

duckService = new DuckService();
let storedObjectString = JSON.parse(localStorage.getItem('cart'));
let cart = new shoppingCart();
if(storedObjectString){
    cart.items = storedObjectString; 
}else
    cart = new shoppingCart();

loadDucks(duckService);



cartProductsButton.addEventListener('click', showCartPorducts);
homeButton.addEventListener('click', showProducts);
contentContainer.addEventListener('click', addItemToCart);
contentContainer.addEventListener('click', deleteItemFromCart);
class User {

    #name
    #lastName
    #books
    #pets

    constructor (name, lastName) {

        this.#name = name
        this.#lastName = lastName
        this.#books = []
        this.#pets = []

    }

    getFullName() {

        return `${this.#name} ${this.#lastName}`;

    }

    addPet(pet) {

        this.#pets.push(pet);

    }

    countPets() {

        return this.#pets.length;

    }

    addBook(titleBook, autorBook) {

        this.#books.push({ title: titleBook, autor: autorBook });

    }

    getBookNames() {

        return this.#books.map(el => el.title);

    }

}

const user1 = new User("Juan", "Pérez");

user1.addPet("Perro");
user1.addPet("Gato");
user1.addBook("El Caballero de la Armadura Oxidada", "Robert Fisher");
user1.addBook("Eloquent Javascript", "Marijin Haverbeke");

console.log("Desafio Coder");
console.log("\n");
console.log(user1.getFullName());
console.log(user1.countPets());
console.log(user1.getBookNames());
console.log("\n");

class Container {

    #element

    constructor() {

        this.#element = []

    }

    save(element) {

        this.#element.push(element);

    }

    getById(number) {

        return this.#element.filter(el => el.id === number);

    }

    getAll() {

        return this.#element;

    }

    deleteById(number) {

        //return this.#element.filter(el => el.id !== number);
        let object = this.#element.map(el => el.id).indexOf(number);
        return this.#element.splice(object, 1);

    }

    deleteAll() {

        return this.#element.splice(0, this.#element.length);

    }

    getLength() {

        return this.#element.length;

    }

}

const element1 = new Container();

element1.save({

    id: 1, 
    product: "Auto", 
    price: 10000

});

element1.save({

    id: 2, 
    product: "Celular", 
    price: 1000

});

element1.save({
    
    id: 3, 
    product: "PC", 
    price: 5000

});

console.log("Desafio Clase");
console.log("\n");
console.log(element1.getById(3));
console.log(element1.getAll());
console.log(element1.deleteById(2));
console.log(element1.deleteAll());
console.log(element1.getLength());
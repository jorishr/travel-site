const $ = require('jquery');
import sayHello from './modules/mobileMenu';
// const sayHello = require('./modules/_module1');
sayHello("Joris");

class Person {
    constructor(fullName, favoriteColor){
        this.name = fullName;
        this.favoriteColor = favoriteColor;
    }
}
console.log(Person);
var sayMe = (x) => {console.log(x);}
sayMe("Joris");

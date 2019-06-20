// Helpful code snippets


// virtual object model
//
var vs1 =  await new ltm.Virtual(vs);
var vs2 = await new ltm.Virtual(vs);
console.log(vs1);
virtualServers.push(vs1);
virtualServers.push(vs2);
console.log(virtualServers);


// ASYNC FUNCTION

async function asyncTask () {
    try {
      const valueA = await functionA()
      const valueB = await functionB(valueA)
      const valueC = await functionC(valueB)
      return await functionD(valueC)
    } catch (err) {
      logger.error(err)
    }
  }

var lunch = {
	sandwich: 'ham',
	snack: 'chips',
	drink: 'soda',
	desert: 'cookie',
	guests: 3,
	alcohol: false,
};

Object.keys(lunch).forEach(function (item) {
	console.log(item); // key
	console.log(lunch[item]); // value
});

// returns "sandwich", "ham", "snack", "chips", "drink", "soda", "desert", "cookie", "guests", 3, "alcohol", false



/**
 * Object.prototype.forEach() polyfill
 * https://gomakethings.com/looping-through-objects-with-es6/
 * @author Chris Ferdinandi
 * @license MIT
 */
// if (!Object.prototype.forEach) {
// 	Object.defineProperty(Object.prototype, 'forEach', {
// 		value: function (callback, thisArg) {
// 			if (this == null) {
// 				throw new TypeError('Not an object');
// 			}
// 			thisArg = thisArg || window;
// 			for (var key in this) {
// 				if (this.hasOwnProperty(key)) {
// 					callback.call(thisArg, this[key], key, this);
// 				}
// 			}
// 		}
// 	});
// }


// object model

// virtuals [
//     {
//     name = virtual_name,
//     address = virtual_address,
//     pool = {
//         name: pool_name,
//         members: [
//             {
//                 name = member_name,   
//                 address = member_address,
//                 port = member_port,
//                 status = member_status
//             }
//         ]
//     }
//     }
// ]

// export object model
// //module.js
// function Person (name) {
//     this.name = name;
//   }
  
//   Person.prototype.sayName = function () {
//     console.log(this.name);
//   }
  
//   module.exports = Person;
  
//   //index.js
//   var Person = require('./module.js');
//   var person = new Person('John');
  
//   person.sayName();

// variable protyping

// function Cat(age, name) {       // Accept name and age in the constructor
//     this.name = name || null;
//     this.age  = age  || null;
// }

// Cat.prototype.getAge = function() {
//     return this.age;
// }

// Cat.prototype.setAge = function(age) {
//     this.age = age;
// }

// Cat.prototype.getName = function() {
//     return this.name;
// }

// Cat.prototype.setName = function(name) {
//     this.name = name;
// }

// Cat.prototype.equals = function(otherCat) {
//     return otherCat.getName() == this.getName()
//         && otherCat.getAge() == this.getAge();
// }

// Cat.prototype.fill = function(newFields) {
//     for (var field in newFields) {
//         if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
//             if (this[field] !== 'undefined') {
//                 this[field] = newFields[field];
//             }
//         }
//     }
// };

// module.exports = Cat;     // Export the Cat function as it is

// promise all
//https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c3225838
async function getUsers (userIds) {
    const pArray = userIds.map(async userId => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json();
    });
    const users = await Promise.all(pArray);
    // ... do some stuff
    return users;
  }

//https://stackoverflow.com/questions/34382710/es7-getting-result-from-an-array-of-promises-using-await-generator
  let [p1, p2] = await Promise.all([
    System.import('./package1.js'), System.import('./package2.js')]);

async function abc() {
    let p1 = getReviews();
    let p2 = getMenu();
    let [reviews, menu] = await results(p1, p2);
}

function results(...rest) {
    return Promise.all(rest).catch(err => console.log(err));
}

https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

//https://javascript.info/async-await
async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
  
    let result = await promise; // wait till the promise resolves (*)
  
    alert(result); // "done!"
  }
  
  f();
//
//
//

  function asyncFunction (item, cb) {
    setTimeout(() => {
      console.log('done with', item);
      cb();
    }, 100);
  }
  
  let requests = [1, 2, 3].reduce((promiseChain, item) => {
      return promiseChain.then(() => new Promise((resolve) => {
        asyncFunction(item, resolve);
      }));
  }, Promise.resolve());
  
  requests.then(() => console.log('done'))
asyncFunction(virtuals,function(item){
    console.log(item);
});



new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000); // (*)
  
  }).then(function(result) { // (**)
  
    alert(result); // 1
    return result * 2;
  
  }).then(function(result) { // (***)
  
    alert(result); // 2
    return result * 2;
  
  }).then(function(result) {
  
    alert(result); // 4
    return result * 2;
  
  });


// more promises
//https://stackoverflow.com/questions/40732541/javascript-promises-iterate-over-all-object-keys-arrays-and-then-resolve

var translateRequests = [];

Object.keys(setOfWords).forEach(function(category){
        setOfWords[category].forEach(function(word){
            translateRequests.push(google.translate(word, 'es', 'en'));
        });
    });
});

Promise.all(translateRequests).then(function(translateResults){
    //do something with all the results
});

// even more promises
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]

//https://codeburst.io/javascript-map-vs-foreach-f38111822c0f
// Note that you would never return from a forEach function as the return values are simply discarded:

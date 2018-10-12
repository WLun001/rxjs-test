import {Observable, of, Subscriber} from 'rxjs';
import {map, switchMap} from "rxjs/operators";

//observer.next will not execute when complete() is called
// var completionTest = Observable.create((observer: any) => {
//     observer.next('Hello World!');
//     observer.next('Hello Again!');
//     observer.complete();
//     //this will not execute
//     observer.next('Bye');
//
//     //teardown logic, to clear resources
//     return () => {
//         logItem('clear resource');
//     }
// });
// completionTest.subscribe(
//     (x: any) => logItem(x),
//     (error: any) => logItem('Error: ' + error),
//     () => logItem('Completed')
// );

// var observableWithSubscribeWithin = new Observable(observer => {
//     observer.next('Hello World!');
//     observer.unsubscribe();
//     observer.next('Hello Again!');
//     observer.complete();
//     observer.next('Bye');
// });
//
// observableWithSubscribeWithin.subscribe(
//     (x: any) => logItem(x),
//     (error: any) => logItem('Error: ' + error),
//     () => logItem('Completed')
// );


function logItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}

function add(param?: (this: number, num2: number) => number | void | Function) {

}

add(num2 => {
    console.log(this);
});

add(() => {

});

add(num1 => {
    return () => {

    }
});


let ob = new Observable(subscriber => {

});

let ob2 = new Observable(subscriber => {
    return () => {

    }
});

let ob3 = new Observable<any>((subscriber: Subscriber<any>) => {
    return () => {
    }

});

let obTest = new Observable(subscriber => {
    var num = 0;
    const timer = setInterval(() => {
        if (num > 5) {
            subscriber.complete();
        }
        subscriber.next(`obervable 1: ${num++}`);
    }, 200);

    return () => {
        logItem('teardown logic from observable 1');
        clearInterval(timer);
        subscriber.unsubscribe();
    }
});

let obTest2 = new Observable(subscriber => {
    subscriber.next('observable 2');
    subscriber.complete();

    return () => {
        logItem('unsubscribe obTest2');
        subscriber.unsubscribe();
    }
});

const obTest3 = new Observable(subscriber => {
    subscriber.next(3);
    subscriber.complete();
    return () => {
        logItem('teardown logic from observable 3');
        subscriber.unsubscribe();
    }
});

obTest3.pipe(
    map(value => value),
    switchMap(value => value > 2 ? obTest2 : of())
).subscribe(value => {
    logItem(value);
});

// function func1(mathFunction: (num1: number, num2: number) => number): number{
//     return mathFunction(1, 2);
// }
//
// //addd number
// let addNum = function (num1: number, num2: number) : number {
//     return num1 + num2;
// };
//
// func1(addNum);
// // or this
// func1((num1, num2) => {
//     return num1 + num2;
// });
//
//
// //subtraction num
// let subNum = function (num1: number, num2: number) : number {
//     return num2 - num1;
// };
//
// func1(subNum);
// // or this
//
// func1((num1, num2) => {
//     return num1 + num2;
// });
//
// func1((num1, num2) => num2 - num2);



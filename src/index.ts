import {from, Observable, of, Subscriber, Unsubscribable} from 'rxjs';
import {map, switchMap} from "rxjs/operators";

let numbers = [1,23,4,5,6,4,5,6,4,5,4,8,9,0,7,6,5,7,8,5,10,87,46,35,38,36,88];
let words = ['hello', 'bye', 'haha', 'hehe', 'keke', 'hoho',];

let ob1 = from(numbers);
let ob2 = from(words);

ob1.subscribe((num ) => {
    if (num % 2 === 0) {
        ob2.subscribe(words => logItem(words));
    }
});

ob1.pipe(
    map(num => num),
    switchMap(num => num % 2 === 0 ? ob2 : of())
).subscribe(words => logItem(words));

function logItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}



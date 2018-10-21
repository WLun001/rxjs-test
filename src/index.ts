import {from, Observable, of, Subject, Subscriber, Subscription, Unsubscribable} from 'rxjs';
import {map, switchMap, takeUntil, takeWhile} from "rxjs/operators";

let numbers = [1,23,4,5,6,4,5,6,4,5,4,8,9,0,7,6,5,7,8,5,10,87,46,35,38,36,88];
let words = ['hello', 'bye', 'haha', 'hehe', 'keke', 'hoho',];

let ob1 = from(numbers);
let unsubscribe = new Subject();
let sub = ob1.pipe(
    takeUntil(unsubscribe)
).subscribe(num => {
     logItem(num);
});

unsubscribe.unsubscribe();
unsubscribe.complete();

function logItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}



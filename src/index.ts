import {Observable, Subscriber, Unsubscribable} from 'rxjs';

function logItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}



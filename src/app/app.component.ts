import { Component } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'FluffSoulClient';
  inputText: string ='';

  wsSubject = webSocket
  ({
    url: "ws://192.168.1.202:5555",
    protocol: 'json',
    deserializer: ({data}) => data.text().then(function (text: string) {
      console.log(text);
    }),
    serializer: msg => String(msg)
  });


  sendText(event) {
    console.log(event.target.value);
    // ws.send(event.target.value + "\n");
    this.wsSubject.next(event.target.value + "\n");
    event.target.value = '';
  }

  ngOnInit() {
    this.wsSubject.subscribe(
      msg => console.log('message received: ' + msg),
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
    );
  }
}

import { Component } from '@angular/core';

// @component is a decorator. The argument passed to it is a metadata object. The metadata object has properties like 'selector', 'templateUrl' and 'styleUrls' which define the behaviour of the component.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieManagement User Interface';
}

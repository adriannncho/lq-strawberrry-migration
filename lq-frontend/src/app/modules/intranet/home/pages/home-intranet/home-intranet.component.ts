import { Component } from '@angular/core';

@Component({
  selector: 'app-home-intranet',
  templateUrl: './home-intranet.component.html',
  styleUrls: ['./home-intranet.component.css']
})
export class HomeIntranetComponent {

  tabsList = [
    {
      name: 'Productos',
      icon: 'coffee'
    },
    {
      name: 'Toppings',
      icon: 'shop'
    }
  ]

}

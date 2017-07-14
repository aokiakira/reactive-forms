import {Component} from '@angular/core';
import {heroes} from './data-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heroes = heroes;
  selectedHero;

  select(hero) {
    this.selectedHero = hero;
  }
}

import {Component, Input, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {states, Address} from './data-model';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero;
  heroForm: FormGroup;
  states = states;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();

    this.loadData();
    this.modifyData();
  }

  createForm() {
    this.heroForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.group(new Address()),
      power: '',
      sidekick: ''
    });
  }

  loadData() {
    // The structure of data object MUST EXACTLY SAME as the structure of the FormGroup, when using setValue(...)
    this.heroForm.setValue({
      name: 'Super man',
      address: new Address(),
      power: 'x-ray vision',
      sidekick: true,
    })
  }

  modifyData() {
    this.heroForm.patchValue({
      name: 'SUPER MAN',
      address: {
        street: 'Redmond'
      }
    })
  }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name,
      address: this.hero.addresses[0] || new Address(),
      power: this.hero.power || '',
      sidekick: this.hero.sidekick || false
    })
  }
}

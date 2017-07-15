import {Component, Input, OnChanges} from '@angular/core';
import {FormArray, FormGroup, FormBuilder, Validators} from '@angular/forms';

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
  }

  createForm() {
    this.heroForm = this.formBuilder.group({
      name: ['', Validators.required],
      secretLairs: this.formBuilder.array([]),
      power: '',
      sidekick: ''
    });
  }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name,
      power: this.hero.power || '',
      sidekick: this.hero.sidekick || false
    });

    this.setAddress(this.hero.addresses);
  }

  get secretLairs1(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  }

  addLair() {
    this.secretLairs1.push(this.formBuilder.group(new Address()));
  }

  private setAddress(addresses: Address[]) {
    const addressFormGroups = addresses.map(address => this.formBuilder.group(address));
    const addressFormArray = this.formBuilder.array(addressFormGroups);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }
}

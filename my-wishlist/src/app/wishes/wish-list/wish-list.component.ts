import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  regiForm: FormGroup;
  ListName = '';
  Passcode = '';
  Description = '';
  Email = '';

  constructor(private fb: FormBuilder) {
    this.regiForm = fb.group({
      'ListName' : [null, Validators.required],
      'Passcode' : [null],
      'Description' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'Email' : [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
  }

}

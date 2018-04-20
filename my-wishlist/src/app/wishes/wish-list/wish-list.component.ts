import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  regiForm: FormGroup;
  listName = '';
  passcode = '';
  description = '';
  email = '';

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.regiForm = fb.group({
      'listName' : [null, Validators.required],
      'passcode' : [null],
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'email' : [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.addList(form);
  }

  addList(formDet) {
    this.afs.collection('wishlist').add({
      'listname': formDet.listName,
      'passcode': formDet.passcode,
      'description': formDet.description,
      'email' : formDet.email
    });
  }

}

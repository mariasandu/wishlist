import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { FirestoreDataService } from '../shared/firestore-data.service';
import { Wish } from '../shared/wish.model';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
  providers: [FirestoreDataService]
})
export class WishListComponent implements OnInit {

  needs: Wish[];
  selectedItemId: string;
  displayNeeds = false;
  id: any;

  regiForm: FormGroup;
  listName = this.id;
  passcode = '';
  description = '';
  email = '';
  need = '';

  constructor(private fb: FormBuilder,
    public _fsd: FirestoreDataService,
    private _route: ActivatedRoute,
    private _router: Router,
    public dialogRef: MatDialogRef<WishListComponent>)
    {
    this.regiForm = fb.group({
      'listName' : [null, Validators.required],
      'passcode' : [null],
      'description' : [null],  // [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'email' : [null], // Validators.compose([Validators.required, Validators.email])],
      'need' : [null]
    });
  }

  ngOnInit() {
    // this._fsd.getNeeds(this.selectedItemId).subscribe(needs => {
    // this.needs = needs;
    // });
    this.id = +this._route.snapshot.paramMap.get('id');

  }

  onFormSubmit(form: NgForm) {

    this.dialogRef.close();
  }

  onCreateList(form: NgForm) {
    this.addList(form);
  }

  addList(formDet) {
    this._fsd.addWishListID(formDet.listName, formDet.passcode, formDet.description, formDet.email);
    this.displayNeeds = true;
    this.selectedItemId = formDet.listName;
  }


  addNewNeed(formDet) {
    this._fsd.addNeed(this.selectedItemId, formDet.need, 'Maria');
    this.need = ' ';
    this._fsd.getNeeds(this.selectedItemId).subscribe(needs => {
      this.needs = needs;
    });


  }

  close(): void {
    // this.dialogRef.close();
    this._router.navigate(['/wishlist']);
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { WishListComponent } from './wishes/wish-list/wish-list.component';

interface Need {
  item: string;
  donator: string;
}

interface NeedId extends Need {
  id: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  needsCol: AngularFirestoreCollection<Need>;
  wishlistCol: AngularFirestoreCollection<any>;
  needs: any;
  wishlists: any;

  item: string;
  donator: string;
  needDetail: string; // ------
  listname: string;
  passcode: string;

  selectedItemId: string; // to be deleted :)

  needDoc: AngularFirestoreDocument<Need>;
  singleNeed: Observable<Need>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.needsCol = this.afs.collection('needs');
    // snapshotChanges is used to retreive the document data and other metadata, which includes the ID
    // we need ID to show edir or delete a record
    this.needs = this.needsCol.snapshotChanges()
      .map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data() as Need;
         const id = a.payload.doc.id;
         return { id, data };
       });
      });

      this.wishlistCol = this.afs.collection('wishlist');
      this.wishlists = this.wishlistCol.snapshotChanges()
      .map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data() as any;
         const id = a.payload.doc.id;
         return { id, data };
       });
      });
  }

  addNeed() {
    this.afs.collection('needs').add({
      'item': this.item,
      'donator': this.donator
    });
  }

  addNeedDetails(needId) {
    this.afs.collection('needs/' + needId + '/needsdetcol').add({
      'needDetail': this.needDetail
    });
  }

  addList() {
    this.afs.collection('wishlist').add({
      'listname': this.listname,
      'passcode': this.passcode,
    });
  }

  addItemList(listId) {
    this.afs.collection('wishlist/' + listId + '/needs').add({
      'item': 'testitem',
      'donator': 'test donator',
    });
  }

  getNeed(needId) {
    this.needDoc = this.afs.doc('needs/' + needId);
    this.singleNeed = this.needDoc.valueChanges();
    this.selectedItemId = needId;
  }

  deleteNeed(needId) {
    this.afs.doc('needs/' + needId).delete();
  }
}

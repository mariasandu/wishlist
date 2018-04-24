// This service is for defining CRUD opperations Add, Edit, Delete

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { Wish } from './wish.model';
import { Wishlist } from './wishlist.model';


@Injectable()
export class FirestoreDataService {

  wishlistCol: AngularFirestoreCollection<any>;
  wishlists: any;

  wishlistDoc: AngularFirestoreDocument<Wishlist>;
  singleWishlist: Observable<Wishlist>;

  selectedWishlistId: string; // to be deleted :)

  constructor(private afs: AngularFirestore) {
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

  getWishlists() {
    return this.wishlists;
  }

  addWishlist() {
    this.afs.collection('wishlist').add({
      'listname': 'testlistname',
      'passcode': 'testpasscode',
      'description': 'testdescription',
      'email': 'testemail'
    });
  }

  addNeed(wishlistId) {
    this.afs.collection('wishlist/' + wishlistId + '/needs').add({
      'item': 'testitem',
      'donator': 'test donator',
    });
  }
  deleteWishlists(wishlistId) {
    this.afs.doc('wishlist/' + wishlistId).delete();
  }

  deleteNeed(wishlistId, needId) {
    this.afs.doc('wishlist/' + wishlistId + '/needs' + needId).delete();
  }

  updateWishlist(wishlistId, needId) {
    this.afs.doc('wishlist/' + wishlistId + '/needs' + needId).update({
      'item': 'testitem',
      'donator': 'test donator',
    });
  }

  getWishlist(wishlistId) {
    this.wishlistDoc = this.afs.doc('needs/' + wishlistId);
    this.singleWishlist = this.wishlistDoc.valueChanges();
    this.selectedWishlistId = wishlistId;
  }


}

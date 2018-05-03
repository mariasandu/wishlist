// This service is for defining CRUD opperations Add, Edit, Delete

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { Wish } from './wish.model';
import { Wishlist } from './wishlist.model';


@Injectable()
export class FirestoreDataService {

  wishlistCol: AngularFirestoreCollection<any>;
  needsCol: AngularFirestoreCollection<any>;
  wishlists: any;
  needs: any;

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

    this.needsCol = this.afs.collection('wishlist/' + this.selectedWishlistId + '/needs');
      this.needs = this.needsCol.snapshotChanges()
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

  getNeeds(selectedWishlistId) {
    this.needsCol = this.afs.collection('wishlist').doc(selectedWishlistId).collection('needs');
      this.needs = this.needsCol.snapshotChanges()
      .map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data() as any;
         const id = a.payload.doc.id;
         return { id, data };
       });
      });
      return this.needs;

  }

  addWishListID(listname, passcode, description, email) {
    this.afs.collection("wishlist").doc(listname).set({
      'listname': listname,
      'passcode': passcode,
      'description': description,
      'email': email
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  addNeed(wishlistId: string, need, guest) {
    this.afs.collection('wishlist').doc(wishlistId).collection('needs').doc(need).set({
      'item': need,
      'donator': guest
    })
    .then(function() {
      console.log("Need successfully added!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
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

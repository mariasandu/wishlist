import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WishListComponent } from './wish-list/wish-list.component';
import { FirestoreDataService } from './shared/firestore-data.service';

import { Wishlist } from './shared/wishlist.model';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss'],
  providers: [FirestoreDataService]
})
export class WishesComponent implements OnInit {

  @Input() wishlistCompRef = '';
  @Output() clicked=new EventEmitter();

  wishlists: Wishlist[];

  constructor(public dialog: MatDialog, public _fsd: FirestoreDataService) { }

  ngOnInit() {
    this._fsd.getWishlists().subscribe(wishlists => {
      this.wishlists = wishlists;
      // console.log(this.wishlists);
    });
  }

  showAddOrEditListDialog(): void {
    const dialogRef = this.dialog.open(WishListComponent, {
      panelClass: [ 'wd-dialog' ]
    });
  }

  editWishlist(selectedList) {
    this.wishlistCompRef = selectedList;
    this.clicked.emit(selectedList);
    const dialogRef = this.dialog.open(WishListComponent, {
      panelClass: [ 'wd-dialog' ]
    });
  }

}

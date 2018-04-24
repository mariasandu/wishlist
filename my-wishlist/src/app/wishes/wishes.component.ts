import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WishListComponent } from './wish-list/wish-list.component';
import { FirestoreDataService } from './shared/firestore-data.service';

import { Wishlist } from './shared/wishlist.model';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss'],
  providers: [FirestoreDataService]
})
export class WishesComponent implements OnInit {

  wishlists: Wishlist[];

  constructor(public dialog: MatDialog, public _fsd: FirestoreDataService) { }

  ngOnInit() {
    this._fsd.getWishlists().subscribe(wishlists => {
      // console.log(tasks);
      this.wishlists = wishlists;
      console.log(this.wishlists);
    });
  }

  showAddOrEditListDialog(): void {
    const dialogRef = this.dialog.open(WishListComponent, {
      panelClass: [ 'wd-dialog' ]
    });
  }

}

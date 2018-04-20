import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WishListComponent } from './wish-list/wish-list.component';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss']
})
export class WishesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  showAddOrEditListDialog(): void {
    const dialogRef = this.dialog.open(WishListComponent, {
      panelClass: [ 'wd-dialog' ]
    });
  }

}

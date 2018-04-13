import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Need {
  item: string;
  donator: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  needsCol: AngularFirestoreCollection<Need>;
  needs: Observable<Need[]>;


  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.needsCol = this.afs.collection('needs');
    this.needs = this.needsCol.valueChanges();
  }
}

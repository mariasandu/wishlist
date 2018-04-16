import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
export class AppComponent {

  needsCol: AngularFirestoreCollection<Need>;
  needs: any;

  item:string;
  donator:string;

  needDoc: AngularFirestoreDocument<Need>;
  singleNeed: Observable<Need>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.needsCol = this.afs.collection('needs');
    //snapshotChanges is used to retreive the document data and other metadata, which includes the ID
    //we need ID to show edir or delete a record
    this.needs = this.needsCol.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Need;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
  }

  addNeed() {
    this.afs.collection('needs').add({'item': this.item, 'donator': this.donator});
  }

  getNeed(needId) {
    this.needDoc = this.afs.doc('needs/'+needId);
    this.singleNeed = this.needDoc.valueChanges();
    console.log("click");
  }

  deleteNeed(needId) {
    this.afs.doc('needs/'+needId).delete();
  }
}

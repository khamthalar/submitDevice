import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Person } from './person';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'submitDevice';

  private dbPath = '/person';
  personRef:AngularFireList<Person>=null;

  constructor(private db:AngularFireDatabase) { 
    this.personRef = db.list(this.dbPath);
  }
  person_list:any;
  ngOnInit(){
    this.getdata();
  }
  getdata(){
    this.getPersonList().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key:c.payload.key,...c.payload.val()

        })
        )
        )
        
    ).subscribe(persons => {this.person_list = persons});
  }
  getPersonList():AngularFireList<Person>{
    return this.personRef;
  }
}

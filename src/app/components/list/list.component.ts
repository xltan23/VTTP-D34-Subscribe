import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendsService } from 'src/app/friends.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges, OnDestroy {

  // Input pulled from app.component
  @Input()
  friends:User[] = []

  @Input()
  name = "not set"

  count = 0
  // $ denotes subscription
  friend$!:Subscription

  // CONSTRUCTOR
  constructor(private friendsSvc:FriendsService) {}

  // Upon creation
  ngOnInit(): void {
    // Subscribe to the Service (Acts as a data storage)
    // Show all data in storage
    console.info('>>> FriendsService subscribed')
    // After ngAfterViewInit, data is received and processed
    // Subscribe to event
    this.friend$ = this.friendsSvc.friends.subscribe(
      (data:User) => {console.info('>>> From FriendsService: ', data)
    })
  }

  // Upon termination
  ngOnDestroy(): void {
      console.info('>>> ngOnDestroy activated')
      this.friend$.unsubscribe()
  }

  // Upon changes in Input (Friends array)
  ngOnChanges(changes: SimpleChanges): void {
      console.info('>>> Change: ', changes)
      // Update count value (To be displayed in html)
      this.count = changes['friends'].currentValue.length
  }
}

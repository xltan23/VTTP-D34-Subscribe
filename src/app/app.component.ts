import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormComponent } from './components/form/form.component';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'D34W';

  @ViewChild(FormComponent)
  formComponent!:FormComponent

  // friends and name are pushed to list.component
  friends:User[] = []
  name = ""
  sub$!:Subscription

  ngAfterViewInit() {
      console.info('>>> ngAfterViewInit active')
      // Data pulled from Child (Subscribe to event)
      this.sub$ = this.formComponent.onNewUser.subscribe(
        (data:User) => {
          // Process data using method in Parent
          this.onNewUser(data)
        })
  }

  // Upon termination
  ngOnDestroy(): void {
      console.info('>>> ngOnDestroy activated')
      this.sub$.unsubscribe()
  }

  // User object pulled from form.component
  onNewUser(data:User) {
    console.info('>>> In app.component: Appending friends array and changing name')
    // Add User object to friends array
    this.friends = [...this.friends, data]
    // The latest User's name is pushed to list.component
    this.name = data.name
  }
}

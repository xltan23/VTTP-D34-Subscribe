import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { FriendsService } from 'src/app/friends.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output()
  onNewUser = new Subject<User>()

  form!:FormGroup

  // CONSTRUCTOR
  constructor(private fb:FormBuilder, private friendsSvc:FriendsService) {}

  // METHODS
  // Upon creation, create empty form field
  ngOnInit(): void {
      console.info('Form created')
      this.form = this.fb.group({
        name:this.fb.control('')
      })
  }

  // Triggered on 'Add'
  processForm() {
    const data:User = this.form.value
    console.info('>>> In form.component')
    // Push data to app.component
    this.onNewUser.next(data)
    // friendsSvc.friends is an event pushes data
    this.friendsSvc.friends.next(data)
    // Reset form
    this.ngOnInit()
  }
}

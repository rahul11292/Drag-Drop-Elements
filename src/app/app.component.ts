import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
//  Variable Declaration
  title = 'DragDrop';
  moveElement: FormGroup;

// Array containing the elements
  Available = [
    "1-50",
    "51-100",
    "101-150",
    "151-200",
    "201-250"
  ];
  Selected = ["251-300"];


  allAvailableSelected: boolean = false;
  transferActiveFromAvailable: boolean;
  allSelected: boolean = false;
  tranferActiveFromSelected: boolean;
  tempArray: any = [];
  Currentselection: boolean = false;
  selectionFromSelected: boolean = false;
  selectionFromAvailable: boolean = false;


// contructor function
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.DeclarationForm();

  }

// form group declaration assigning the form array 
  DeclarationForm() {
    this.moveElement = this.fb.group({
      Available: this.fb.array(this.Available),
      Selected: this.fb.array(this.Selected),
    });

  }



  // angular material drag and drop event
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }



// select all and clear all button fucntionality for Available tab
  selectClearAllFromAvaliable(mode) {
    this.allSelected = false;
    this.tranferActiveFromSelected = false;
    if (mode == "select") {
      this.allAvailableSelected = true;
      this.transferActiveFromAvailable = true;
    }
    else {
      this.allAvailableSelected = false;
      this.transferActiveFromAvailable = false;

    }

  }



// select all and clear all button fucntionality for Selection tab
  selectClearFromSelected(mode) {
    this.allAvailableSelected = false;
    this.transferActiveFromAvailable = false;
    if (mode == "select") {
      this.allSelected = true;
      this.tranferActiveFromSelected = true;
    }
    else {
      this.allSelected = false;
      this.tranferActiveFromSelected = false;

    }
  }


  // transfer selected elements 
  transferSelected() {
    if (this.allAvailableSelected) {
      this.Selected = [...this.Selected, ...this.Available]
      this.Available = [];
      this.DeclarationForm();
    }
    if (this.allSelected) {
      this.Available = [...this.Selected, ...this.Available];
      this.Selected = [];
      this.DeclarationForm();
    }
    if (this.selectionFromSelected) {

      this.Available = [...this.tempArray, ...this.Available];
      this.Selected = this.Selected.filter((el) => !this.tempArray.includes(el));
      this.DeclarationForm();
    }
    if (this.selectionFromAvailable) {
      this.Selected = [...this.tempArray, ...this.Selected];
      this.Available = this.Available.filter((el) => !this.tempArray.includes(el));
      this.DeclarationForm();
    }
  }



  // Select individual items from selected 
  selectedItemSelected(item) {
    this.tempArray = []
    this.selectionFromSelected = true;
    this.selectionFromAvailable = false;
    this.tranferActiveFromSelected = true;
    this.transferActiveFromAvailable = false;
    if (this.tempArray.indexOf(item) != -1) {
      this.tempArray.splice(this.tempArray.indexOf(item), 1)

    }
    else {
      this.tempArray.push(item)
    }

  }



  // Select individual items from available
  selectedItemAvialable(item) {
    this.tempArray = []
    this.selectionFromSelected = false;
    this.selectionFromAvailable = true;
    this.transferActiveFromAvailable = true;
    this.tranferActiveFromSelected = false;
    if (this.tempArray.indexOf(item) != -1) {
      this.tempArray.splice(this.tempArray.indexOf(item), 1)

    }
    else {
      this.tempArray.push(item)
    }
  }

}



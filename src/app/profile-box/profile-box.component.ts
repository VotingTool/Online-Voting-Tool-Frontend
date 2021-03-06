import { Component, OnInit, Input } from '@angular/core';
import {barColors} from "../barColors";

/**
* Component for displaying and editing a preference relation using drag and drop.
*/
@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.css']
})
export class ProfileBoxComponent implements OnInit {
  @Input() model;
  @Input() index:number;
  sortableOptions:any;

  constructor() {
    this.sortableOptions = {
      onUpdate: () => {this.model.allowStringUpdate = true; this.model.updateModel();},
      draggable: '.draggable',
      animation: 100
    };
  }

  ngOnInit() {
  }

  /**
  * The number of voters has changed. -> Update the matrix
  */
  onVoterNumberUpdate() {
    if(this.model.profiles[this.index].numberOfVoters === null ||
    this.model.profiles[this.index].numberOfVoters < 1) {
      this.model.profiles[this.index].numberOfVoters = 1;
    }
    this.model.allowStringUpdate = true;
    this.model.updateModel();
  }

  getColor(index, voter) {
    try {
      let voterIndex = 0;
      let counter = 0;
      while (counter < voter) {
        voterIndex += this.model.profiles[voterIndex].numberOfVoters;
        counter++;
      }
      return barColors.getHTMLColor(index, voterIndex);
    }
    catch (e) {
      return barColors.getHTMLColor(index, voter);
    }

  }

  /*
  * Selects all text in the currently focused element.
  * Source: https://stackoverflow.com/a/34849300/4050546
  */
  selectEverything() {
    document.execCommand("selectall",null,false);
  }
}

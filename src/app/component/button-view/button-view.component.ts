import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEyeSlash, faFilm , faEye, faBullseye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.css']
})
export class ButtonViewComponent implements OnInit {
  renderValue: string;
  eyeIcon = faEye;
  @Input() value: string | number;
  @Input() rowData: any;
  
  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.save.emit(this.rowData);
  }
}

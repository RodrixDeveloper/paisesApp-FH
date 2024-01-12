import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  @Input() placeholder: string = '';
  @Output() onValue = new EventEmitter<string>();

  emitValue(value: string): void {
    this.onValue.emit(value)
    console.log(value);
    
  }

}

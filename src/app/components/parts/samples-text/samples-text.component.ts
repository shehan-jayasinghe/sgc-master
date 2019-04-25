import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-samples-text',
  templateUrl: './samples-text.component.html',
  styleUrls: ['./samples-text.component.css']
})
export class SamplesTextComponent implements OnInit {
  @Input() samples: string[] = [];
  @Output() filterSamples = new EventEmitter<string[]>();
  txtSamplesChanged: Subject<string[]> = new Subject<string[]>();
  loadingSamplesFilter = false;

  constructor() { 
    this.txtSamplesChanged.debounceTime(2000)
    .distinctUntilChanged()
    .subscribe(samples => {
      this.filterSamples.emit(samples);
      this.loadingSamplesFilter = false;
    })
   }

  ngOnInit() {
  }

  onFilter(samples) {
    this.loadingSamplesFilter=true;
    if(samples.length >= 1 && samples[0] !== ""){
      this.txtSamplesChanged.next(samples.split(','));
    }else{
      this.txtSamplesChanged.next([]);
    }
    
  } 

}

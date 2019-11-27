import { Component, Input, OnInit } from '@angular/core';
import { DataReaderService } from '../../data-reader.service';

@Component({
  selector: 'app-boilerplate',
  templateUrl: './boilerplate.component.html',
  styleUrls: ['./boilerplate.component.scss']
})
export class BoilerplateComponent implements OnInit {
  @Input() version: string;

  constructor(private dataReaderService: DataReaderService) { }

  boilerplate: any;

  ngOnInit() {
    this.dataReaderService.getBoilerplateFile(this.version).subscribe(data => {
      this.boilerplate = data;
      console.log(data);
    });
  }

}

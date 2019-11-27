import { Component, OnInit } from '@angular/core';
import { DataReaderService } from './data-reader.service';
import { Version } from './models/versions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'opendap-angular';

  versions: Version[];

  constructor(private dataReaderService: DataReaderService) { }

  ngOnInit() {
    this.dataReaderService.getReleaseData().subscribe(data => {
      this.versions = data.versions;
    });
  }
}

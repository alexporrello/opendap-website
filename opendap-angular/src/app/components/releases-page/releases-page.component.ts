import { Component, OnInit } from '@angular/core';

import { DataReaderService } from '../../data-reader.service';
import { VersionData } from '../../models/versionData';

@Component({
  selector: 'app-releases-page',
  templateUrl: './releases-page.component.html',
  styleUrls: ['./releases-page.component.scss']
})
export class ReleasesPageComponent implements OnInit {

  allVersionData: VersionData[] = [];

  constructor(private dataReaderService: DataReaderService) { }

  ngOnInit() {
    this.dataReaderService.getReleaseData().subscribe(data => {
      for (let version of data.versions) {
        this.dataReaderService.getReleaseFile(version.version).subscribe(data => {
          this.allVersionData.push(data);
          console.log(data);
        });
      }
    });
  }
}

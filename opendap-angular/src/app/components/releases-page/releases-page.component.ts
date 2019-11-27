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

  boilerplate: any;

  version: String;

  constructor(private dataReaderService: DataReaderService) { }

  ngOnInit() {
    this.dataReaderService.getReleaseData().subscribe(data => {
      for (let version of data.versions) {
        this.version = version.version;

        for (let i = 0; i < version.numReleases; i++) {
          this.dataReaderService.getReleaseFile(version.version + "." + i).subscribe(data => {
            this.allVersionData.push(data);
          });
        }
      }
    });
  }
}

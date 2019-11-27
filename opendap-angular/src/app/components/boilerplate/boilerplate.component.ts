import { Component, Input, OnInit } from '@angular/core';
import { DataReaderService } from '../../data-reader.service';

import * as showdown from 'showdown';

@Component({
  selector: 'app-boilerplate',
  templateUrl: './boilerplate.component.html',
  styleUrls: ['./boilerplate.component.scss']
})
export class BoilerplateComponent implements OnInit {
  @Input() version: string;

  constructor(private dataReaderService: DataReaderService) { }

  boilerplate: any;

  installation: any;

  async ngOnInit() {
    this.dataReaderService.getBoilerplateFile(this.version).subscribe(data => {
      this.boilerplate = data;
    });

    let markdown = await this.dataReaderService.getMarkdown(this.version + "_install-boiler.md");
    this.installation = new showdown.Converter().makeHtml(markdown);

    console.log(this.installation);
  }

}

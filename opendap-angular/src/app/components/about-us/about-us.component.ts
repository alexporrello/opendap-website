import { Component, OnInit } from '@angular/core';
import { DataReaderService } from 'src/app/data-reader.service';

import * as showdown from 'showdown';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private dataReaderService: DataReaderService) { }

  html:string;

  async ngOnInit() {
    let markdown = await this.dataReaderService.getMarkdown("about-us.md");
    this.html = new showdown.Converter().makeHtml(markdown);
  }

}

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

    let converter = new showdown.Converter();

    let markdown = await this.dataReaderService.getMarkdown();
    this.html = converter.makeHtml(markdown);
  }

}

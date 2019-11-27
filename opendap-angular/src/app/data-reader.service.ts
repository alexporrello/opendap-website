import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Versions } from './models/versions';
import { Version } from './models/versions';
import { VersionData } from './models/versionData';


@Injectable({
  providedIn: 'root'
})
export class DataReaderService {

  constructor(private http: HttpClient) { }

  getBoilerplateFile(version: String):Observable<any> {
    return this.http.get("../assets/json/" + version + "_boilerplate.json");
  }

  getReleaseFile(filename: String): Observable<VersionData> {
    return this.http.get<VersionData>("../assets/json/" + filename + ".json");
  }

  getReleaseData(): Observable<Versions> {
    return this.http.get<Versions>("../assets/json/versions.json");
  }

  getAboutUsPage() {
    return this.http.get("../assets/json/about-us.md");
  }

  async getMarkdown(filename:String):Promise<string> {
    return new Promise(resolve => {
      fetch(`../../assets/md/${filename}`).then(res => res.text()).then(text => {
        resolve(text);
      })
    })
  }
}

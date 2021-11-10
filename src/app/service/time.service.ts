import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

const headerDict = {
  'Content-type': 'application/json; charset=UTF-8'
}

const requestOptions = {
  headers: new HttpHeaders(headerDict),
};

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get("http://localhost:3000/projects", requestOptions).pipe(map(
      (projects: any) => {
        return projects
      }
    ))
  }

  updateProject(project: any) {
    return this.http.put("http://localhost:3000/projects/" + project.id, project).pipe(map(
      (projects: any) => {
        return projects
      }
    ))
  }

  addTime(project: any) {
    return this.http.post("http://localhost:3000/projects/", project).pipe(map(
      (res: any) => {
        return res
      }
    ))
  }
}

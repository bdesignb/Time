import { TimeLog } from './../model/project';
import { TimeService } from './../service/time.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  projects: any[] = [];
  projectNames: any[] = [];
  model: any;

  time: any;
  showTime = false;
  selectedProject = "Project Name...";
  interval: any;

  newTimeLog: TimeLog = {};


  constructor(private timeService: TimeService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getProjects();

  }

  getProjects() {
    this.timeService.getProjects().subscribe(
      projects => {
        this.projects = projects;
        this.projects.forEach((project: any) => this.projectNames.push(project.name));
      }
    )
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.projectNames
        : this.projectNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }


  onSelectProject(name: string) {
    this.model = name;
  }


  sumTime(time1: any, time2: any) {
    let sum = moment(time1, 'HH:mm:ss').add(time2).format('HH:mm:ss');
    return sum;
  }

  startTimer(item: any) {
    this.time = new Date(new Date().setHours(0, 0, 0, 0));
    this.showTime = true;
    this.selectedProject = item.name;

    //Set START time
    this.newTimeLog.startDateTime = new Date().getTime();
    console.log("START date: ", this.newTimeLog.startDateTime)
    console.log(this.newTimeLog)


    // if (this.projects.find((x: any) => x.timerStarted))
    //   item.timerStarted = true;
    // else {
    //   item.timerStarted = true;
    //   this.timer()
    // }

    item.timerStarted = true;
    this.timer()
  }


  timer() {
    this.interval = setInterval(() => {
      this.addSeconds();
    }, 1000);
  }

  addSeconds() {
    this.projects.forEach((item: any) => {
      if (item.timerStarted)
      {
        this.time = new Date(this.time.getTime() + 1000);
      }
    })
  }

  endTimer(item: any) {
    item.timerStarted = false;
    this.selectedProject = "";


    if (!this.projects.find((x: any) => x.timerStarted))
      clearTimeout(this.interval);
      this.showTime = false;
      this.selectedProject = "";


    // Set END DATE
    this.newTimeLog.endDateTime = new Date().getTime();
    console.log("new time ", this.newTimeLog)



    let duration = this.datePipe.transform(this.time, 'HH:mm:ss')

    this.newTimeLog.day = new Date().toLocaleDateString();
    this.newTimeLog.duration = duration;


    item.totalTime = this.sumTime(item.totalTime, duration);


    item.dailyLogs.push(this.newTimeLog)

    this.timeService.updateProject(item).subscribe(() => {
      this.getProjects()
    })

  }


  getDateDiff(startDate: any, endDate: any) {
    var diff = endDate - startDate;
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    // return days + "d " + hours + "h " + minutes + "m " + seconds + "s"
    return hours + ":" + minutes + ":" + seconds
  }


}

import { TimeService } from './../service/time.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute, private timeService: TimeService) { }

  date: Date = new Date();
  allTime!: any;

  startDateTime!: any;
  endDateTime!: any;
  showTimer: any;
  result: any;

  projects = [
    {
      name: "Project Trix",
      description: "Lorem ipsum dolar sign",
      isRunning: false,
      billable: false,
      totalTime: '01:20:00',
      time: '00:00:00',
      timePerDay: [

        {
          day: '04/11/2021',
          endDateTime: '',
          startDateTime: '',
          totalTime: '00:00:00'
        },
        {
          day: '04/11/2021',
          endDateTime: '',
          startDateTime: '',
          totalTime: '00:00:00'
        },
        {
          day: '06/11/2021',
          endDateTime: '',
          startDateTime: '',
          totalTime: '00:00:00'
        }
      ]
    },
    {
      name: "Project Random",
      description: "Lorem ipsum dolar sign",
      isRunning: false,
      billable: true,
      totalTime: '00:00:00',
      time: '00:00:00',
      days: [
        {
          day: '15/11/2021',
          timePerDay: '00:00:00'
        },
        {
          day: '14/11/2021',
          timePerDay: '00:00:00'
        }
      ]

    },
    {
      name: "Pro Line",
      description: "Lorem ipsum dolar sign",
      isRunning: false,
      billable: true,
      totalTime: '00:00:02',
      time: '00:00:00',
      days: [
        {
          day: '15/11/2021',
          timePerDay: '00:00:00'
        },
        {
          day: '14/11/2021',
          timePerDay: '00:00:00'
        }
      ]
    },
    {
      name: "StartJ Co",
      description: "Lorem ipsum dolar sign",
      isRunning: false,
      billable: false,
      totalTime: '00:00:00',
      time: '00:00:00',
      days: [
        {
          day: '15/11/2021',
          timePerDay: '00:00:00'
        },
        {
          day: '14/11/2021',
          timePerDay: '00:00:00'
        }
      ]

    }
  ]
















  ngOnInit() {

  }















  public seconds = 0; minutes = 0; hours = 0; t: any; h1 = "00:00:00";




  time!: any;

  addTime(item: any) {

  }



  startTimer(item: any) {

    //item.time=new Date(0,0,0,0);  //initiazlize the date
    //item.time = new Date(new Date().setHours(0, 0, 0, 0));
    //this.time = new Date(new Date().setHours(0, 0, 0, 0));

    this.time = new Date(new Date().setHours(0, 0, 0, 0)); // Setuje redovno date u formatu Sun Nov 07 2021 00:00:00 GMT+0100 (Central European Standard Time)
    
    //Set START time
    this.startDateTime = this.time;
    console.log("START date: ", this.startDateTime)


    if (this.projects.find((x: any) => x.isRunning)) //if some is running - NE RAZUMEM
      item.isRunning = true; //Simply push item.running=true
    else {
      item.isRunning = true;
      this.timer()   //begin the timer too
    }


  }


  timer() {
    this.t = setInterval(() => {
      this.addSeconds() // Add 1 second to time which is CURRENT DATE TIME
    }, 1000);
  }

  addSeconds() {
    this.projects.forEach((item: any) => {  //for each item
      if (item.isRunning)   //if is running
      {


        this.time = new Date(this.time.getTime() + 1000); // Pretvara gore setovano current date time u milliseconds i dodaje 1sec
        // i opet vraca u formatu redovnog Date

        //item.time = this.time // ako hocu da dodam u json isto

        //item.time=new Date(item.time.getTime()+1000);

        // this.time = new Date(this.time.getTime() + 1000);
        // item.time = this.time
      }
    })
  }

  endTimer(item: any) {
    item.isRunning = false;
    if (!this.projects.find((x: any) => x.isRunning)) //if nobody is running
      clearTimeout(this.t);


    // Set END DATE
    this.endDateTime = this.time
    console.log("END date : ", this.endDateTime)



    // PROVERA STA MI VRACA OVA FUNKCIJA

    let duration = this.getDateDiff(this.startDateTime, this.endDateTime);
    console.log("Duration: ", duration)

    item.time = this.sumTime(item.time, duration)
    item.totalTime = this.sumTime(item.totalTime, duration)

    //VRATI TIME NA null
    //this.time = null;


  }

  sumTime(time1: any, time2: any) {
    let sum = moment(time1, 'HH:mm:ss').add(time2).format('HH:mm:ss');
    return sum;
  }



  getDateDiff(startDate: any, endDate: any) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    // return days + "d " + hours + "h " + minutes + "m " + seconds + "s"
    return hours + ":" + minutes + ":" + seconds

  }


  calculateDateDiff(startDate: any, endDate: any): number {
    let millisInDay = 24 * 60 * 60 * 1000;

    // let fromDate = new Date(this.from.year, this.from.month, this.from.day);
    // let toDate = new Date(this.to.year, this.to.month, this.to.day);

    let diffDays = Math.round((endDate.getTime() - startDate.getTime()) / millisInDay)

    return diffDays
  }


  onEdit(index: number) {
    this.router.navigate([index], { relativeTo: this.route })
  }




}

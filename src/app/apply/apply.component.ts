import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment'
import { ApplyService } from '../apply.service';
import { AppliedLeaves } from '../Models/AppliedLeaves.Model';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  @Input() startDateLabel: string;
  @Input() endDateLabel: string;
  @Input() endDateInput;

  // @ViewChild('startDateToggle', { static: false }) startDate;
  // @ViewChild('endDateToggle', { static: false }) endDate;

  step = 1;

  @Output() StartEndDatesOutput = new EventEmitter();
  startEndDatesForm: FormGroup;

  AppliedDate = new FormControl(new Date());

  private _snackBar: any;
  constructor(private fb: FormBuilder, private applyService:ApplyService) { }


  applyForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.startEndDatesForm = this.fb.group({
      LeaveType: new FormControl('',[Validators.required]),
      AppliedDate: new FormControl(new Date()),
      startDate: new FormControl('',[Validators.required]),
      endDate: ['',[Validators.required]],
      days: [0],
      availableleaves: new FormControl('',[Validators.required]),
      reason: new FormControl('',[Validators.required]),
      NoOfDays: new FormControl(0),
    });

    this.startEndDatesForm.controls['startDate'].setValue(this.startDateInput);
    this.startEndDatesForm.controls['days'].setValue(0);
    if (this.startEndDatesForm.controls['startDate'].value) {
      if (this.endDateInput) {
        this.startEndDatesForm.controls['endDate'].setValue(this.endDateInput);
        this.endDateClicked();
      }
    }
    this.getAllAppliedLeaves();
  }
  startDateInput(startDateInput: any) {
    throw new Error('Method not implemented.');
  }

  startDateClicked() {
    this.StartEndDatesOutput.emit(this.getDates());
  }
  getDate(): any {
    throw new Error('Method not implemented.');
  }

  endDateClicked() {
    if (this.startEndDatesForm.controls['startDate'].value) {
      let eventStartTime = new Date(this.startEndDatesForm.controls['startDate'].value);
      let eventEndTime = new Date(this.startEndDatesForm.controls['endDate'].value);

      let m = moment(eventEndTime);
      let days = m.diff(eventStartTime, 'days');
      days = days +1;
      this.startEndDatesForm.controls['days'].setValue(days);
      this.StartEndDatesOutput.emit(this.getDates());
    } else {
      console.log('Please select the start date');
      this.startEndDatesForm.controls['endDate'].setValue('');
    }
  }

  setEndDate() {
    this.startEndDatesForm.controls['endDate'].setValue(moment(new Date(this.startEndDatesForm.controls['startDate'].value))
      .add(this.startEndDatesForm.controls['days'].value, 'days')
      .local().format());

    this.StartEndDatesOutput.emit(this.getDates());
  }

  getDates() {
    let startEndDates = {
      'startDate': this.startEndDatesForm.controls['startDate'].value,
      'endDate': this.startEndDatesForm.controls['endDate'].value,
      'AppliedDate': this.startEndDatesForm.controls['AppliedDate'].value,
    };
    return startEndDates;
  }

  convert(str) {
    let date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }



  appliedLeaves: AppliedLeaves[] = [];

  appliedLeave: AppliedLeaves = {
    id: '',
    LeaveType: '',
    AppliedDate: '',
    startDate: '',
    endDate: '',
    days:'',
    availableleaves:'',
    reason:'',
  }

  getAllAppliedLeaves() {
    this.applyService.getAllAppliedLeaves()
    .subscribe(
      response => {
        this.appliedLeaves = response;
        this.appliedLeave = {
          id: '',
          LeaveType: '',
          AppliedDate: '',
          startDate: '',
          endDate: '',
          days:'',
          availableleaves:'',
          reason:'',
        }
      }
    );
  }
  onSubmit() {

    if (this.appliedLeave.id == ''){
      this.applyService.addAppliedLeaves(this.appliedLeave)
      .subscribe(
        response => {
          this.getAllAppliedLeaves();
          this.appliedLeave = {
            id: '',
            LeaveType: '',
            AppliedDate: '',
            startDate: '',
            endDate: '',
            days:'',
            availableleaves:'',
            reason:'',
          };
        }
      );
    } else {
      this.updateAppliedLeaves(this.appliedLeave);
    }
  }
  deleteAppliedLeaves(id: string) {
    this.applyService.deleteAppliedLeaves(id)
    .subscribe(
      response => {
        this.getAllAppliedLeaves();
      }
    );
  }

  populateForm(appliedLeave: AppliedLeaves) {
    this.appliedLeave = appliedLeave;
  }
  updateAppliedLeaves(appliedLeave: AppliedLeaves) {
    this.applyService.updateAppliedLeaves(appliedLeave)
    .subscribe(
      response => {
        this.getAllAppliedLeaves();
      }
    );
  }
  //   console.warn('Successfully Updated', this.startEndDatesForm.value);
  //   this.startEndDatesForm.reset();
  // }
  // onClear(){
  //   this.startEndDatesForm.reset();
  //   //this.editmode = false;
  // }
}


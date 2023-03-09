import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApplyService } from '../apply.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

interface Country {
  shortName: string;
  name: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  countries: Country[];
  states: string[];
  cities: string[];

  country = new FormControl('', [Validators.required]);
  state = new FormControl({ value: '', disabled: true }, [
    Validators.required,
  ]);
  city = new FormControl({ value: '', disabled: true }, [
    Validators.required,
  ]);
  private fb: FormBuilder;

  firstFormGroup: FormGroup;

  // secondFormGroup: FormGroup;

  ngOnInit() {
  this.firstFormGroup = this._fb.group({
    Firstname: ['',Validators.required],
    Lastname: ['',Validators.required],
    DateofBirth:['',Validators.required],
    Gender:['',Validators.required],
    PhoneNumber: ['',Validators.required],
    ParentMobileNumber: ['',Validators.required],
    country:['',Validators.required],
    state:['',Validators.required],
    city: ['',Validators.required],
    AddressLine1:['',Validators.required],
    AddressLine2: ['',Validators.required],
    PinCode: ['',Validators.required],
    SSCPercentage:['',Validators.required],
    InterPercentage: ['',Validators.required],
    Degree:['',Validators.required],
    DegreePercentage: ['',Validators.required],
  });
  this.firstFormGroup.controls["country"].valueChanges.subscribe((country) => {
    this.state.reset();
    this.state.disable();
    if (country) {
      this.states = this.service.getStatesByCountry(country);
      this.state.enable();
    }
  });

  this.firstFormGroup.controls["state"].valueChanges.subscribe((state) => {
    this.city.reset();
    this.city.disable();
    if (state) {
      this.cities = this.service.getCitiesByState(this.firstFormGroup.controls["country"].value ,state);
      this.city.enable();
    }
  });
}
  isLinear = false;

  // constructor(private _formBuilder: FormBuilder) {}
  constructor(private service: ApplyService,private _fb: FormBuilder) {
    this.countries = this.service.getCountries();
    this.firstFormGroup = new FormGroup({
      country: this.country,
      state: this.state,
      city: this.city,
    });
  }

  onSubmit() {
    console.warn('Successfully Updated', this.firstFormGroup.value);
    this.firstFormGroup.reset();
  }
}

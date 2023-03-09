import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as countrycitystatejson from 'countrycitystatejson';
import { AppliedLeaves } from './Models/AppliedLeaves.Model';
@Injectable({
  providedIn: 'root'
})
export class ApplyService {

  baseUrl = 'https://localhost:44349/api/LeaveApplication';
  // baseUrl: string = 'https://jsonplaceholder.cypress.io/';
  constructor(private http: HttpClient) { }

  // Apply(applyObj: any){
  //   return this.http.post(this.baseUrl + 'apply', applyObj);
  // }

  private countryData = countrycitystatejson;

  getCountries() {
    return this.countryData.getCountries();
  }

  getStatesByCountry(countryShotName: string) {
    return this.countryData.getStatesByShort(countryShotName);
  }

  getCitiesByState(country: string, state: string) {
    return this.countryData.getCities(country, state);
  }
  // GetAllAppliedLeavse(){
  //   return this.http.get('http://localhost:52044/api/member');
  // }

  getAllAppliedLeaves(): Observable<AppliedLeaves[]> {
    return this.http.get<AppliedLeaves[]>(this.baseUrl);
  }
  addAppliedLeaves(appliedLeaves: AppliedLeaves): Observable<AppliedLeaves> {
    appliedLeaves.id = '0';
    return this.http.post<AppliedLeaves>(this.baseUrl, appliedLeaves);
  }

  deleteAppliedLeaves(id: string): Observable<AppliedLeaves> {
    return this.http.delete<AppliedLeaves>(this.baseUrl + '/' + id);
  }

  updateAppliedLeaves(appliedLeaves: AppliedLeaves): Observable<AppliedLeaves> {
    return this.http.put<AppliedLeaves>(this.baseUrl + '/' + appliedLeaves.id, appliedLeaves);
  }
}

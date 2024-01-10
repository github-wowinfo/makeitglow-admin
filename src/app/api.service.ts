import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  // Brand Api
  getPosts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllBrands`);
  }
  createBrand(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/AddBrand`, postData, { headers });
  }
  updateBrandById(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/UpdateBrand`, postData, { headers });
  }
  deleteBrand(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/DeleteBrand/` + id, {}, { headers });
  }
  getBrandById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetBrand/` + id);
  }

  // Countries Api
  getCountry(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllCountries`);
  }
  // City Api
  getCity(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllCities`);
  }
  // Location Api
  getLocation(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllLocations`);
  }
  // Location Api
  getReference(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllReferences`);
  }
  // Tax Api
  getTax(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllTaxRates`);
  }
  // Category Api
  getCategory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllCategories`);
  }
  // Sub Category Api
  getsubCategory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllSubCategories`);
  }


  // Login Api
  createPost(postData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Auth/Login`, postData);
  }



  private createHeaders(): HttpHeaders {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Set the token in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

}

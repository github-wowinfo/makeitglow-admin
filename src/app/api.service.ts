import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }
  // Customer
  // Sub Category Api
  getCustomers(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Auth/GetAllCustomerUsers`, { headers });
  }
  getNewOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Admin/Actions/AllOrdersByStatus/1`, { headers });
  }
  getprocessOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Admin/Actions/AllOrdersByStatus/2`, { headers });
  }
  getConfirmedOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Admin/Actions/AllOrdersByStatus/3`, { headers });
  }
  getshippedOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Admin/Actions/AllOrdersByStatus/4`, { headers });
  }
  getdeliveredOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Admin/Actions/AllOrdersByStatus/5`, { headers });
  }
  getcancelledOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Admin/Actions/AllOrdersByStatus/6`, { headers });
  }
  getrefundedOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Admin/Actions/AllOrdersByStatus/7`, { headers });
  }
  getdeletedOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Admin/Actions/AllOrdersByStatus/0`, { headers });
  }


  updateorderStatus(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Admin/Actions/UpdateOrderStatus`, postData, { headers, responseType: 'text' });
  }

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
  deleteCountry(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/DeleteCountry/` + id, {}, { headers });
  }
  createCountry(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/AddCountry`, postData, { headers });
  }
  updateCountryById(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/UpdateCountry`, postData, { headers });
  }
  getCountryById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetCountry/` + id);
  }
  // City Api
  getCity(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllCities`);
  }

  deleteCity(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/DeleteCity/` + id, {}, { headers });
  }
  createCity(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/AddCity`, postData, { headers });
  }
  updateCityById(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/UpdateCity`, postData, { headers });
  }
  getCityById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetCity/` + id);
  }

  // Location Api
  getLocation(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllLocations`);
  }

  deleteLocation(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/DeleteLocation/` + id, {}, { headers });
  }
  createLocation(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/AddLocation`, postData, { headers });
  }
  updateLocationById(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/UpdateLocation`, postData, { headers });
  }
  getLocationById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetLocation/` + id);
  }
  // Reference Api
  getReference(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllReferences`);
  }
  deleteReference(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/DeleteReference/` + id, {}, { headers });
  }
  createReference(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/AddReference`, postData, { headers });
  }
  updateReferenceById(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/UpdateReference`, postData, { headers });
  }
  getReferenceById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetReference/` + id);
  }


  // Tax Api
  getTax(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllTaxRates`);
  }

  deleteTax(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/DeleteTaxRate/` + id, {}, { headers });
  }
  createTax(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/AddTaxRate`, postData, { headers });
  }
  updateTaxById(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/UpdateTaxRate`, postData, { headers });
  }
  getTaxById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetTaxRate/` + id);
  }

  // Category Api
  getCategory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllCategories`);
  }

  deleteCategory(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/DeleteCategory/` + id, {}, { headers });
  }
  createCategory(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/AddCategory`, postData, { headers });
  }
  updateCategoryById(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/UpdateCategory`, postData, { headers });
  }
  getCategoryById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetCategory/` + id);
  }

  // Sub Category Api
  getsubCategory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetAllSubCategories`);
  }
  deleteSubCategory(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/DeleteSubCategory/` + id, {}, { headers });
  }
  createSubCategory(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/AddSubCategory`, postData, { headers });
  }
  updateSubCategoryById(postData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Masters/UpdateSubCategory`, postData, { headers });
  }
  getSubCategoryById(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Masters/GetSubCategory/` + id);
  }

  // Login Api
  createPost(postData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Auth/Login`, postData);
  }

  // Product APIs
  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/Items/GetAllItems`);
  }

  EnableDisableHasVariant(id: any, variant: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Items/EnableDisableHasVariant?id=${id}&hasVariant=${variant}`, {}, { headers });
  }
  deleteProduct(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Items/DeleteItem?id=${id}`, {}, { headers });
  }
  deleteProductVariant(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${environment.apiUrl}/api/Items/DeleteVariantItem?id=${id}`, {}, { headers });
  }
  getProductById(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Items/GetItemById?id=${id}`);
  }
  getorderById(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${environment.apiUrl}/api/Order/GetOrderDetailsByOrderId?OrderId=${id}`, { headers });
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

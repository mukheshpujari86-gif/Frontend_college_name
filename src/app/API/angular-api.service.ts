import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularAPIService {

   private apiUrl='https://localhost:7064/api/College';

    private apiUrl2='https://localhost:7064/api/College/login';
    
  constructor(private http:HttpClient) { }

 

  getServiceStudent():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  postServiceStudent(data:any){
    return this.http.post(this.apiUrl, data);
  }

  deleteServiceStudent(id:number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateStudent(id: number, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, data);
}

login(data: any) {
    return this.http.post(this.apiUrl2, data);
  }

getStudentsByAdmin(admin: string) {
 return this.http.get<any[]>(`${this.apiUrl}/admin/${admin}`);
}

getCollegeAdmin(id: string) {
 return this.http.get<any[]>(`${this.apiUrl}/${id}`);
}

}

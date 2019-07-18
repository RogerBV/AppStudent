import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisteredStudent } from '../models/response/RegisteredStudent';
import { NewStudent } from '../models/request/NewStudent';
import { UpdateStudent } from '../models/request/UpdateStudent';
import { DeletedStudent } from '../models/request/DeletedStudent';
@Injectable({
  providedIn: 'root'
})
export class StudentServicesService {
  static readonly apiRouteStudent:string = environment.apiEndPoint+'student/';
  constructor(private http:HttpClient) { }

  public ListAllStudents():Observable<RegisteredStudent[]>{
    return this.http.get<RegisteredStudent[]>(StudentServicesService.apiRouteStudent+"list");
  }
  public RegisterOnServer(newStudent:NewStudent):Observable<RegisteredStudent>{
    return this.http.post<RegisteredStudent>(StudentServicesService.apiRouteStudent+'Create',newStudent);
  }
  public UpdateOnServer(updateStudent:UpdateStudent):Observable<RegisteredStudent>{
    return this.http.put<RegisteredStudent>(StudentServicesService.apiRouteStudent+'Update',updateStudent);
  }
  public DeleteOnServer(deletedStudent:DeletedStudent):Observable<RegisteredStudent>{
    return this.http.patch<RegisteredStudent>(StudentServicesService.apiRouteStudent+'Delete',deletedStudent);
  }
}

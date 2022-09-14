import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class QuesServService {

  constructor(private http: HttpClient) { }
  getQuestion(){
    return this.http.get<any>("assets/questions.json");
    
  }
}

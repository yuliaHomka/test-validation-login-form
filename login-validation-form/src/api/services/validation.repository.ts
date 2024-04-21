import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ValidationAnswer } from '../model/validation-answer.interface';

@Injectable({
  providedIn: 'root'
})
export class VaidationRepositoryService {
  public constructor(private http: HttpClient) {}
  public validateLogin(login: string, forceLocalValidation = false): Observable<ValidationAnswer> {
    if (forceLocalValidation) {
      return of({ valid: Math.random() > 0.5 }).pipe(
        delay(Math.random() * 3000),
      )
    }
    return this.http.get<ValidationAnswer>(`http://localhost:3000/validate?login=${login}`);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, of, switchMap, takeWhile, timer } from 'rxjs';
import { ValidationAnswer } from '../../api/model/validation-answer.interface';
import { VaidationRepositoryService } from '../../api/services/validation.repository';

const WAITING_TIME = 60;

const INCORRECT_LOGIN_TEXT = 'Неправильный логин. Повторите попытку позже.';

const SERVER_ERROR_TEXT = 'Проблемы с соединением. Повторите попытку позже.';

@Injectable()
export class FormService {
  public inputValue = '';

  public hint: string = '';

  public hasErrorOrIncorrectLogin$ = new BehaviorSubject(false);

  public isButtonDisabled = false;

  public timerValue$ = new BehaviorSubject<number>(0);

  public forceLocalValidation = false;

  private hasServerError = false;

  public constructor(private vaidationRepository: VaidationRepositoryService) {}

  public onSendButtonClick(): void {
    const login = this.inputValue;
    if(!login) {
      return;
    }

    this.isButtonDisabled = true;
    this.vaidationRepository.validateLogin(login, this.forceLocalValidation).pipe(
      catchError(() => {
        this.hasServerError = true;
        return of(null);
      }),
      switchMap((result: ValidationAnswer | null) => {
        if (result?.valid) {
          this.hint = `Текущий логин: ${login}`;
        }
        else {
          this.hint = this.hasServerError ?  SERVER_ERROR_TEXT : INCORRECT_LOGIN_TEXT;
          this.hasErrorOrIncorrectLogin$.next(true);
        }
        return timer(0, 1000);
      }),
      map((time) => WAITING_TIME - time),
      takeWhile((restTime) => {
        this.timerValue$.next(restTime);
        return !!restTime;
      }),
      finalize(() => this.lastTimerStep())
    ).subscribe();
  }

  private lastTimerStep(): void {
    this.isButtonDisabled = false;
    if (this.hasErrorOrIncorrectLogin$.getValue()) {
      this.hint = '';
    }
    this.hasErrorOrIncorrectLogin$.next(false);
  }
}

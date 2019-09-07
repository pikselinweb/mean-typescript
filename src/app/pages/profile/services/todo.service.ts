import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from '@app/shared';
import { TODO } from '@server/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  $todoList = new BehaviorSubject<TODO[]>([]);
  rootApiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private snackService: SnackbarService) {
    this.listTask.subscribe((todoListArray: TODO[]) =>
      this.$todoList.next(todoListArray)
    );
  }
  get listTask(): Observable<TODO[]> {
    return this.http.get<TODO[]>(`${this.rootApiUrl}/todo/list`);
  }

  crudTask(task: TODO, opetation: string) {
    const apiUrl = `${this.rootApiUrl}/todo/${opetation}`;
    this.http.post(apiUrl, task).subscribe(
      (todo: TODO[]) => {
        this.$todoList.next(todo);
      },
      response => {
        this.snackService.snackMessage(response.message);
      },
      () => {
        this.snackService.snackMessage(`NOTIFICATIONS.todo.${opetation}`, {
          translate: true
        });
      }
    );
  }
}

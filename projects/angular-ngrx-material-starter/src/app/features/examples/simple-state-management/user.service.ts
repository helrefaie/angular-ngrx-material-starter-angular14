import { LocalStorageService } from './../../../core/local-storage/local-storage.service';
import { v4 as uuid } from 'uuid';
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const INITIAL_DATA: User[] = [
  { id: uuid(), username: 'rockets', name: 'Elon', surname: 'Musk' },
  { id: uuid(), username: 'investing', name: 'Nassim', surname: 'Taleb' },
  { id: uuid(), username: 'philosophy', name: 'Yuval', surname: 'Harari' }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.subject.asObservable();
  key = 'usersList3';
  constructor(private localStorageService: LocalStorageService) { }
  init() {
    
    if(JSON.stringify(this.localStorageService.getItem(this.key)) != "{}") // check if not initial loading 
    {
      this.subject.next(this.localStorageService.getItem(this.key));
    }
    else{
      this.subject.next(INITIAL_DATA);
      this.updateLocalStorage();
    }
  }
  private updateLocalStorage() {
    this.localStorageService.setItem(this.key, this.subject.value)
  }
  clear() {
    this.localStorageService.setItem(this.key,'');
    this.subject.next([]);
  }
  reset() {
    this.subject.next(INITIAL_DATA);
    this.updateLocalStorage();
  }

  addUser(user: Partial<User>) {
    const users = this.subject.getValue();
    const newUsers = users.slice(0);
    newUsers.push({ ...user, id: uuid() } as User);
    this.subject.next(newUsers);
    this.updateLocalStorage();
  }

  updateUser(user: User) {
    const users = this.subject.getValue();
    const indexToUpdate = users.findIndex((u) => u.id === user.id);
    const newUsers = users.slice(0);
    newUsers[indexToUpdate] = {
      ...users[indexToUpdate],
      ...user
    };
    this.subject.next(newUsers);
    this.updateLocalStorage();
  }

  removeUser(id: string) {
    const users = this.subject.getValue();
    const indexToRemove = users.findIndex((u) => u.id === id);
    const newUsers = users.slice(0);
    newUsers.splice(indexToRemove, 1);
    this.subject.next(newUsers);
    this.updateLocalStorage();
  }
}

export interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
}

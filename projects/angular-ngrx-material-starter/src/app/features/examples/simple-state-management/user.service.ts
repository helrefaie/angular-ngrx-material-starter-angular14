import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const INITIAL_DATA: User[] = [
  { id: uuid(), username: 'rockets', name: 'Elon', surname: 'Musk' },
  { id: uuid(), username: 'investing', name: 'Nassim', surname: 'Taleb' },
  { id: uuid(), username: 'philosophy', name: 'Yuval', surname: 'Harari' }
];

@Injectable()
export class UserService {
  users$: Observable<User[]>;
  private subject :  BehaviorSubject<User[]>;  
    constructor() {
    this.subject = new BehaviorSubject<User[]>(INITIAL_DATA);
    this.users$ = this.subject.asObservable();
  }

  addUser(user: Partial<User>) {
    const users = this.subject.getValue();
    const newUsers = users.slice(0);
    newUsers.push({ ...user, id: uuid() } as User);
    this.subject.next(newUsers);
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
  }

  removeUser(id: string) {
    const users = this.subject.getValue();
    const indexToRemove = users.findIndex((u) => u.id === id);
    const newUsers = users.slice(0);
    newUsers.splice(indexToRemove, 1);
    this.subject.next(newUsers);
  }

}

export interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
}

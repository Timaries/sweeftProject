import { formatCurrency } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Pagination, User, UsersData } from '../shared/models/user.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'sweeft-app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  constructor(private userServ: UsersService) {}

  // Getting Last Element From Array
  @ViewChildren('lastElement', { read: ElementRef })
  lastElement!: QueryList<ElementRef>;

  usersList: User[] = [];
  totalPage!: number;
  currentPage: number = 0;

  observer: any;
  // subUser: Subscription = new Subscription();

  ngOnInit() {
    this.intersectionObserver();
    this.userCounter();
  }

  ngAfterViewInit() {
    this.lastElement.changes.subscribe((continu) => {
      if (continu.last) this.observer.observe(continu.last.nativeElement);
    });
  }

  // Getting single user Data for feed
  userCounter() {
    this.userServ.getUsers(this.currentPage, 10).subscribe((singleUser) => {
      singleUser.list.forEach((elementor) => {
        this.usersList.push(elementor);
      });
      this.totalPage = singleUser.pagination.total;
    });
  }

  // Infinite Scroll Logic 
  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
          this.userCounter();
        }
      }
    }, options);
  }
}

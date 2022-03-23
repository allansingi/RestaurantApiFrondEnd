import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Menu } from './services/menu';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public menus: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenus();
  }

  public getMenus(): void {
    this.menuService.getMenus().subscribe(
      (response: Menu[]) => {
        this.menus = response;
        console.log(this.menus);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(menu: Menu, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMenuModal');
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateMenuModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteMenuModal');
    }
    container?.appendChild(button);
    button.click();
  }

}

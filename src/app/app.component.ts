import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Menu } from './services/menu';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public menus: Menu[] = [];
  public editMenu: Menu | undefined;
  public deleteMenu: Menu | undefined;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenus();
  }

  public getMenus(): void {
    //console.log(key);
    this.menuService.getMenus().subscribe({
      next: (response: Menu[]) => {
        this.menus = response;
        console.log(this.menus);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onAddMenu(addMenuForm: NgForm): void {
    document.getElementById('add-menu-form')?.click();
    this.menuService.addMenu(addMenuForm.value).subscribe({
      next: (response: Menu) => {
        console.log(response);
        this.getMenus();
        addMenuForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addMenuForm.reset();
      }
    });
  }

  public onUpdateMenu(menu: Menu): void {
    this.menuService.updateMenu(menu).subscribe({
      next: (response: Menu) => {
        console.log(response);
        this.getMenus();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteMenu(menuId: number): void {
    this.menuService.deleteMenu(menuId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getMenus(); 
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchMenus(key: string): void {
    const menuResults: Menu[] = [];
    for (const menu of this.menus) {
      if (menu.menuName.toLowerCase().indexOf(key) !== -1) {
        menuResults.push(menu);
      }
    }
    this.menus = menuResults;
    if (menuResults.length === 0 || !key) {
      this.getMenus();
    }
  }

  public onOpenModal(menu: Menu, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMenuModal');
    } else if (mode === 'edit') {
      this.editMenu = menu;
      button.setAttribute('data-target', '#updateMenuModal');
    } else if (mode === 'delete') {
      this.deleteMenu = menu;
      button.setAttribute('data-target', '#deleteMenuModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
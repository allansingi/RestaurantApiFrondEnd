import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Menu } from './menu';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiServerUrl}/api/v1/getAllMenus/`);
  }

  public getMenuActiveByDate(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiServerUrl}/api/v1/activeMenuByDate/`);
  }

  public getMenuById(menuId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiServerUrl}/api/v1/menu/${menuId}`);
  }

  public addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiServerUrl}/api/v1/addMenu/`, menu);
  }

  public updateMenu(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiServerUrl}/api/v1/updateMenu/`, menu);
  }
  
  public deleteMenu(menuId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/deleteMenu/${menuId}`);
  } 
}

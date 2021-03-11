import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../components/models/item';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Este lo agrego ya cuando conecto al servidor

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url: string = 'http://localhost:3000/items';  // creo la propiedad/variable url donde asigno la ruta

  httpOptions = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  items:Item[] = [
    {
      id: 0,
      titulo: 'Asado',
      precio: 450.5,
      cantidad: 1,
      completado: false
    },
    {
      id: 1,
      titulo: 'Vino',
      precio: 210,
      cantidad: 2,
      completado: false
    },
    {
      id: 2,
      titulo: 'Tomate',
      precio: 5,
      cantidad: 4,
      completado: true
    }
  ];

  /*En el constructor inyecto el HttpClientModule */
  constructor(private http:HttpClient) { }

  //Estas funciones debemos convertirlas en Observables y es cuando entra en accion en Rjxs para el manejo de flujo y el modulo HttpClient
  getItems():Observable<Item[]>{
    //return this.items;  // esto es para local, no se utiliza cuando se llama de servidor
    return this.http.get<Item[]>(this.url);  // traigo el flujo de datos
  }

  //Tambien agregamos el :Observable<> a la funcion para usarla con el servidor
  addItem(item:Item):Observable<Item>{
    //this.items.unshift(item); // esto es para local, no se utiliza cuando se llama de servidor
    return this.http.post<Item>(this.url, item, this.httpOptions);
  }

  toggleItem(item:Item):Observable<Item>{
    return this.http.put<Item>(this.url + item.id, item, this.httpOptions);
  }

  deleteItem(item: Item):Observable<Item>{
    return this.http.delete<Item>(this.url + item.id);
  }
}

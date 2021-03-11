import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item'; // importo el modelo de datos del arreglo items
import { ItemService } from '../../services/item.service'; // importo el servicio para que pueda ser accedido desde todos lados

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items:Item[] = []; //Creo un arreglo y el modelo de datos del objeto lo traigo de items.ts // inicializo la variable con un arreglo vacio = []
  total:number = 0;

  //En el constructor meto la variable itemService para inyectar el servicio ItemService
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
    //this.items = this.itemService.getItems(); //y aca llamo al servicio inyectado en el constructor cuando trabajo en local sin HttpClient
    /*
    // Esto lo comento porque ahora lo lleve al servicio creado que almacena el arreglo de objetos item.service.ts
    this.items = [
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
    ];*/

    this.itemService.getItems().subscribe(data => {
      this.items = data;
      this.getTotal();
    })
  }

  // me traigo el output @borrarItem de item.component.ts (herencias padre e hijo que manejamos con el EventEmmiter)
  deleteItem(item: Item){
    this.items = this.items.filter( x => x.id !== item.id ); // filtro el item seleccionado

    this.itemService.deleteItem(item).subscribe();  //se lo agregamos cuando trabajamos con servidor
    this.getTotal(); // actualizo el total cuando elimino el item
  }

  toggleItem(item: Item){
    this.itemService.toggleItem(item).subscribe();  //se lo agregamos cuando trabajamos con servidor
    this.getTotal();
  }

  getTotal(){
    // filtro y traigo aquellos donde completado es false, luego mapeo los datos para sumarlos y por ultimo la funcion reduce inicializada en 0 con el acumulador
    this.total = this.items
                .filter( item => !item.completado )
                .map( item => item.cantidad * item.precio)
                .reduce( (acc, item) => acc += item, 0 ); 
  }

}

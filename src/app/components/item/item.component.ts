import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core'; // recordar que este import lo tuve que cambiar por el actual porque el que me hacia VS estaba mal

import { Item } from '../models/item'; // importa el modelo

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  // configuramos la entrada para hacerle saber a este componente que va a recibir el Objeto Item de su correspondiente modelo
  @Input() item: Item = new Item(); // como siempre hay que inicializarlo? = new Item()
  
 //configuramos la salida del item cuando lo borramos con el metodo o funcion eliminarItem 
 //EventEmitter es un Evento personalizado para enviar los datos entre componentesm padres e hijos como pasa aca con items.component y item.component
  @Output() deleteItem: EventEmitter<Item> = new EventEmitter();
// como decia, mando la informacion del evento a items.component
  @Output() toggleItem: EventEmitter<Item> = new EventEmitter();



  constructor() { }

  ngOnInit(): void {
  }

  onDelete(item: Item) {
    this.deleteItem.emit(item); 
  }

  onToggle(item: Item) {
    item.completado = !item.completado;
    this.toggleItem.emit(item); 
  }

}

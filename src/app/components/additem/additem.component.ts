import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // el router lo necesito para poder injectar la variable router y retornar al index
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})


export class AdditemComponent implements OnInit {

  id:number = 0;
  titulo:string = '';
  precio:number = 0;
  cantidad:number = 0;

  //Al igual que en items.component aca tambien consumo el item.servicio por eso lo inyecto del mismo modo
  //En el constructor meto la variable itemService para inyectar el servicio ItemService y router para el retorno al index
  constructor(private itemService:ItemService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const item = new Item(); // creo una nueva constancia de item
    item.id = this.id;
    item.titulo = this.titulo;
    item.precio = this.precio;
    item.cantidad = this.cantidad; 
    item.completado = false;

    //this.itemService.addItem(item); // Esto es cuando carga local // Agrego el nuevo item, el metodo addItem esta en item.service 
    this.itemService.addItem(item).subscribe( i => {
        this.router.navigate(['/']); // Hago que una vez cargado vuelva al index, como la variable router no existe tambien la meto en el constructor de arriba
    });

    
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NominaService,Nomina, } from '../servicesERP/nomina.service';
import { PdfService } from '../servicesERP/pdf.service';
import {RegistroService} from '../servicesERP/empleado.service';



@Component({
  selector: 'app-exportar-nomina',
  templateUrl: './exportar-nomina.component.html',
  styleUrls: ['./exportar-nomina.component.css']
})
export class ExportarNominaComponent   {
  
}
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Comportamiento, Comportamientos } from 'src/app/Model/comportamiento';
import { ComportamientoService } from './service/comportamiento.service';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/service/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormComportamientoComponent } from './component/form-comportamiento/form-comportamiento.component';

@Component({
    selector: 'app-modulo-comportamiento',
    templateUrl: './modulo-comportamiento.component.html',
    styleUrls: ['./modulo-comportamiento.component.css']
})
export class ModuloComportamientoComponent {
    comportamientoList!: Comportamiento[];
    listaComportamientos!: Comportamientos[];
    dataSource: any;

    displayedColumns: string[] = [
        'id',
        'nombre',
        'descripcion',
        'idcompetencia',
        'estado',
        'action'
    ];
    @ViewChild(MatPaginator) paginatior!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private service: ComportamientoService, private dialog: MatDialog, private titleService: Title, private _toastServices: ToastService) {
        this.loadComportamiento();
        titleService.setTitle("Modulo de Comportamiento")
    }

    loadComportamiento() {
        this.service.GetComportamiento().subscribe((res => {
            this.listaComportamientos = res;
            this.dataSource = new MatTableDataSource<Comportamientos>(this.listaComportamientos);
            this.dataSource.paginator = this.paginatior;
            this.dataSource.sort = this.sort;
        }));
    }

    Filterchange(data: Event) {
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    agregarComportamiento() {
        this.Openpopup(0, 'Agregar un Comportamiento nuevo', FormComportamientoComponent)
    }

    Openpopup(code: any, title: any, component: any) {
        var _popup = this.dialog.open(component, {
            width: '40%',
            enterAnimationDuration: '1000ms',
            exitAnimationDuration: '1000ms',
            data: {
                title: title,
                code: code,
            },
        });
        _popup.afterClosed().subscribe((item) => {
            this.loadComportamiento();
        });
    }

    async editComportamiento(code: any) {
        const confirmacion = await this._toastServices.mostrarConfirmacion(
            '¿Estás seguro que deseas editar este registro?',
            7000
        );

        if (confirmacion) {
            this.Openpopup(code, 'Editar Comportamiento', FormComportamientoComponent);
        } else {
            this._toastServices.mostrarInfo('Accion editar cancelada', 'Información', 3000);
        }
    }

    async deshabilitarComportamiento(id: any) {
        const confirmacion = await this._toastServices.mostrarConfirmacion(
            '¿Estás seguro que deseas deshabilitar este comportamiento?',
            7000
        );
        if (confirmacion) {
            this.service.deshabilitarComportamiento(id).subscribe((res) => {
                this._toastServices.mostrarExito(
                    'Comportamiento deshabilitado correctamente.',
                    'Aprobado',
                    2000
                );
                this.loadComportamiento();
            }
            );
        } else {
            this._toastServices.mostrarInfo('Accion deshabilitar cancelada', 'Información', 3000);
        }
    }

    async activarComportamiento(id: any) {
        const confirmacion = await this._toastServices.mostrarConfirmacion(
            '¿Estás seguro que deseas activar este Comportamiento?',
            7000
        );
        if (confirmacion) {
            this.service.activarComportamiento(id).subscribe((res) => {
                this._toastServices.mostrarExito(
                    'Comportamiento activado correctamente.',
                    'Aprobado',
                    2000
                );
                this.loadComportamiento();
            }
            );
        } else {
            this._toastServices.mostrarInfo('Accion activar cancelada', 'Información', 3000);
        }
    }

}
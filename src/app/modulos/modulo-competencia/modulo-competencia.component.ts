import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Competencia } from 'src/app/Model/competencia';
import { ToastService } from 'src/app/service/toast.service';
import { CompetenciaService } from './services/competencia.service';
import { FormCompetenciaComponent } from './component/form-competencia/form-competencia.component';

@Component({
    selector: 'app-modulo-competencia',
    templateUrl: './modulo-competencia.component.html',
    styleUrls: ['./modulo-competencia.component.css']
})

export class ModuloCompetenciaComponent {
    competenciaList!: Competencia[];
    dataSource: any;

    displayedColumns: string[] = [
        'id',
        'nombre',
        'descripcion',
        'estado',
        'action'
    ];
    @ViewChild(MatPaginator) paginatior!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private service: CompetenciaService, private dialog: MatDialog, private titleService: Title, private _toastServices: ToastService) {
        this.loadCompetencia();
        titleService.setTitle("Modulo de Competencia")
    }

    loadCompetencia() {
        this.service.GetCompetencia().subscribe((res => {
            this.competenciaList = res;
            this.dataSource = new MatTableDataSource<Competencia>(this.competenciaList);
            this.dataSource.paginator = this.paginatior;
            this.dataSource.sort = this.sort;
        }));
    }

    Filterchange(data: Event) {
        const value = (data.target as HTMLInputElement).value;
        this.dataSource.filter = value;
    }

    agregarusuario() {
        this.Openpopup(0, 'Agregar una competencia nueva', FormCompetenciaComponent)
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
            this.loadCompetencia();
        });
    }

    async editCompetencia(code: any) {
        const confirmacion = await this._toastServices.mostrarConfirmacion(
            '¿Estás seguro que deseas editar este registro?',
            7000
        );

        if (confirmacion) {
            this.Openpopup(code, 'Editar Competencia', FormCompetenciaComponent);
        } else {
            this._toastServices.mostrarInfo('Accion editar cancelada', 'Información', 3000);
        }
    }

    async deshabilitarCompetencia(id: any) {
        const confirmacion = await this._toastServices.mostrarConfirmacion(
            '¿Estás seguro que deseas deshabilitar esta competencia?',
            7000
        );
        if (confirmacion) {
            this.service.deshabilitarCompetencia(id).subscribe((res) => {
                this._toastServices.mostrarExito(
                    'Competencia deshabilitada correctamente.',
                    'Aprobado',
                    2000
                );
                this.loadCompetencia();
            }
            );
        } else {
            this._toastServices.mostrarInfo('Accion deshabilitar cancelada', 'Información', 3000);
        }
    }

    async activarCompetencia(id: any) {
        const confirmacion = await this._toastServices.mostrarConfirmacion(
            '¿Estás seguro que deseas activar esta competencia?',
            7000
        );
        if (confirmacion) {
            this.service.activarCompetencia(id).subscribe((res) => {
                this._toastServices.mostrarExito(
                    'Competencia activada correctamente.',
                    'Aprobado',
                    2000
                );
                this.loadCompetencia();
            }
            );
        } else {
            this._toastServices.mostrarInfo('Accion activar cancelada', 'Información', 3000);
        }

    }

}
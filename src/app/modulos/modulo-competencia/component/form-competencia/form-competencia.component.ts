import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Competencia } from 'src/app/Model/competencia';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CompetenciaService } from '../../services/competencia.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
    selector: 'app-form-competencia',
    templateUrl: './form-competencia.component.html',
    styleUrls: ['./form-competencia.component.css']
})
export class FormCompetenciaComponent implements OnInit {
    submit = false;
    hide = true;
    inputdata: any;
    idcompetencia: any = null;
    dataCompetencia!: Competencia;
    editdata: any = null;
    closemessage = 'closed using directive';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ref: MatDialogRef<FormCompetenciaComponent>,
        private formBuilder: FormBuilder,
        private service: CompetenciaService,
        private _servicioToast: ToastService) { }

    ngOnInit(): void {
        this.inputdata = this.data;
        if (this.inputdata.code > 0) {
            this.setpopupdata(this.inputdata.code);
        }
    }

    setpopupdata(code: any) {
        this.service.GetCompetenciabycode(code).subscribe((item) => {
            this.idcompetencia = code;
            console.log(code)
            this.editdata = item;
            this.myform.setValue({
                nombre: this.editdata.nombre,
                descripcion: this.editdata.descripcion
            });
        });
    }

    closepopup() {
        this.ref.close('Closed using function');
    }

    myform = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required])
    });

    get f(): { [key: string]: AbstractControl } {
        return this.myform.controls;
    }

    saveCompetencia() {
        this.submit = true;
        if (this.editdata != null) {
            this.dataCompetencia = {
                id: this.idcompetencia,
                nombre: this.myform.value.nombre!,
                descripcion: this.myform.value.descripcion!
            }
            this.service.actualizarCompetencia(this.dataCompetencia).subscribe({
                next: (response) => {
                    this._servicioToast.mostrarExito(
                        'Actualizado correctamente.',
                        'Aprobado',
                        1000
                    );
                    this.resertForm();

                },
                error: (response) => {
                    //TODO implementar Toast
                    console.log('Error al actualizar.');
                    this._servicioToast.mostrarError('Error al actualizar.', 'Error', 1000);
                },
            });
        } else {

            this.service.SaveCompetencia(this.myform.value).subscribe({
                next: (response) => {
                    this._servicioToast.mostrarExito(
                        'Registrado correctamente.',
                        'Aprobado',
                        1000
                    );
                    this.resertForm();
                },
                error: (response) => {
                    console.log('Error al registrar.');
                    this._servicioToast.mostrarError('Error al registrar.', 'Error', 1000);
                },
            });
        }
    }

    resertForm() {
        this.submit = false;
        this.myform.reset();
        this.editdata = null;
        this.idcompetencia = null;
        this.dataCompetencia = {
            id: "0",
            nombre: "",
            descripcion: ""
        };
    }

}
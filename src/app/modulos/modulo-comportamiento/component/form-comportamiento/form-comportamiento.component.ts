import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comportamiento } from 'src/app/Model/comportamiento';
import { ComportamientoService } from '../../service/comportamiento.service';
import { ToastService } from 'src/app/service/toast.service';
import { Competencia } from 'src/app/Model/competencia';
import { CompetenciaService } from 'src/app/modulos/modulo-competencia/services/competencia.service';

@Component({
    selector: 'app-form-comportameinto',
    templateUrl: './form-comportamiento.component.html',
    styleUrls: ['./form-comportamiento.component.css']
})
export class FormComportamientoComponent implements OnInit {

    submit = false;
    hide = true;
    lista_competencias!: Competencia[];
    inputdata: any;
    idComportamiento: any = null;
    dataComportamiento!: Comportamiento;
    editdata: any = null;
    closemessage = 'closed using directive';

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private ref: MatDialogRef<FormComportamientoComponent>,
        private formBuilder: FormBuilder,
        private service: ComportamientoService,
        private _servicioToast: ToastService,
        private _servicioCompetencia: CompetenciaService
    ) {
        this.cargar_competencias();
    }

    ngOnInit(): void {
        this.inputdata = this.data;
        if (this.inputdata.code > 0) {
            this.setpopupdata(this.inputdata.code);
        }
    }

    cargar_competencias() {
        this._servicioCompetencia.GetCompetenciaActivo().subscribe((res) => {
            this.lista_competencias = res;
        });
    }

    setpopupdata(code: any) {
        this.service.GetComportamientobycode(code).subscribe((item) => {
            this.idComportamiento = code;
            // console.log(item)
            this.editdata = item;
            this.myform.setValue({
                nombre: this.editdata.nombre,
                descripcion: this.editdata.descripcion,
                idcompetencia: this.editdata.idcompetencia,
            });
        });
    }

    closepopup() {
        this.ref.close('Closed using function');
    }

    myform = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        idcompetencia: new FormControl('', [Validators.required])
    });

    get f(): { [key: string]: AbstractControl } {
        return this.myform.controls;
    }

    saveComportamiento() {
        this.submit = true;
        if (this.myform.valid) {
            if (this.editdata != null) {
                this.dataComportamiento = {
                    id: this.idComportamiento,
                    nombre: this.myform.value.nombre!,
                    descripcion: this.myform.value.descripcion!,
                    idcompetencia: Number(this.myform.value.idcompetencia!)
                }
                this.service.actualizarComportamiento(this.dataComportamiento).subscribe({
                    next: (response) => {
                        this._servicioToast.mostrarExito(
                            'Actualizado correctamente.',
                            'Aprobado',
                            1000
                        );
                        this.resertForm();
                    },
                    error: (response) => {
                        console.log('Error al actualizar.');
                        this._servicioToast.mostrarError('Error al actualizar.', 'Error', 1000);
                    },
                });
            } else {
                this.service.SaveComportamiento(this.myform.value).subscribe({
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
    }

    resertForm() {
        this.submit = false;
        this.myform.reset();
        this.editdata = null;
        this.idComportamiento = null;
        this.dataComportamiento = {
            id: "0",
            nombre: "",
            descripcion: "",
            idcompetencia: 0,
        };
    }


}
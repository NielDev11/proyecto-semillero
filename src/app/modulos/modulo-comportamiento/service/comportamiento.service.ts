import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comportamiento, Comportamientos } from 'src/app/Model/comportamiento';
import { LoginService } from 'src/app/service/auth/login.service';

@Injectable({
    providedIn: 'root'
})
export class ComportamientoService {
    private _baseURL = "http://localhost:8000";
    constructor(private http: HttpClient, private _loginService: LoginService) { }

    GetComportamiento(): Observable<Comportamientos[]> {
        let headers = this.header_format();
        return this.http.get<Comportamientos[]>(`${this._baseURL}/obtener_comportamientos`, { headers });
    }

    SaveComportamiento(data: any) {
        let headers = this.header_format();
        return this.http.post(`${this._baseURL}/crear_comportamiento`, data, { headers });
    }

    GetComportamientobycode(code: any) {
        let headers = this.header_format();
        return this.http.get(`${this._baseURL}/obtener_comportamiento/` + code, { headers });
    }

    actualizarComportamiento(Comportamiento: Comportamiento) {
        let headers = this.header_format();
        return this.http.put(`${this._baseURL}/actualizar_comportamiento`, Comportamiento, { headers });
    }

    deshabilitarComportamiento(id: any) {
        let headers = this.header_format();
        return this.http.put(`${this._baseURL}/deshabilitar_comportamiento/` + id, { "comportamiento_id": id }, { headers });
    }

    activarComportamiento(id: any) {
        let headers = this.header_format();
        return this.http.put(`${this._baseURL}/activar_comportamiento/` + id, { "comportamiento_id": id }, { headers });
    }

    header_format() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT()['access_token']);
    }
}
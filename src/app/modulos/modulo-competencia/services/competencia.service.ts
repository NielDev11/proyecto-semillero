import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Competencia } from 'src/app/Model/competencia';
import { LoginService } from 'src/app/service/auth/login.service';

@Injectable({
    providedIn: 'root'
})

export class CompetenciaService {
    private _baseURL = "http://localhost:8000";
    constructor(private http: HttpClient, private _loginService: LoginService) { }

    GetCompetencia(): Observable<Competencia[]> {
        let headers = this.header_format();
        return this.http.get<Competencia[]>(`${this._baseURL}/obtener_competencias`, { headers });
    }

    GetCompetenciaActivo(): Observable<Competencia[]> {
        let headers = this.header_format();
        return this.http.get<Competencia[]>(`${this._baseURL}/obtener_competencias_activos`, { headers });
    }

    SaveCompetencia(data: any) {
        let headers = this.header_format();
        return this.http.post(`${this._baseURL}/crear_competencia`, data, { headers });
    }

    GetCompetenciabycode(code: any) {
        let headers = this.header_format();
        return this.http.get(`${this._baseURL}/obtener_competencia/` + code, { headers });
    }

    actualizarCompetencia(competencia: Competencia) {
        let headers = this.header_format();
        return this.http.put(`${this._baseURL}/actualizar_competencia`, competencia, { headers });
    }

    deshabilitarCompetencia(id: any) {
        let headers = this.header_format();
        return this.http.put(`${this._baseURL}/deshabilitar_competencia/` + id, { "competencia_id": id }, { headers });
    }

    activarCompetencia(id: any) {
        let headers = this.header_format();
        return this.http.put(`${this._baseURL}/activar_competencia/` + id, { "competencia_id": id }, { headers });
    }

    header_format() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + this._loginService.getJWT()['access_token']);
    }

}
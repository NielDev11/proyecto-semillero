import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloCompetenciaComponent } from './modulo-competencia.component';

describe('ModuloCompetenciaComponent', () => {
    let component: ModuloCompetenciaComponent;
    let fixture: ComponentFixture<ModuloCompetenciaComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ModuloCompetenciaComponent]
        });
        fixture = TestBed.createComponent(ModuloCompetenciaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
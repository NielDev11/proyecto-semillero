import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompetenciaComponent } from './form-competencia.component';

describe('FormCompetenciaComponent', () => {
    let component: FormCompetenciaComponent;
    let fixture: ComponentFixture<FormCompetenciaComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FormCompetenciaComponent]
        });
        fixture = TestBed.createComponent(FormCompetenciaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
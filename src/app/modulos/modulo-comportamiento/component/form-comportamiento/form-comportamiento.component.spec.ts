import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComportamientoComponent } from './form-comportamiento.component';

describe('FormComportamientoComponent', () => {
    let component: FormComportamientoComponent;
    let fixture: ComponentFixture<FormComportamientoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FormComportamientoComponent]
        });
        fixture = TestBed.createComponent(FormComportamientoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
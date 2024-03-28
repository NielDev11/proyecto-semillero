import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloComportamientoComponent } from './modulo-comportamiento.component';

describe('ModuloComportamientoComponent', () => {
    let component: ModuloComportamientoComponent;
    let fixture: ComponentFixture<ModuloComportamientoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ModuloComportamientoComponent]
        });
        fixture = TestBed.createComponent(ModuloComportamientoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialModule } from 'src/app/material/material.module';
import { of } from 'rxjs';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Crea un servicio AuthService simulado
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    // Define un valor de retorno para el método login
    authServiceSpy.register.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [MaterialModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('se debe llamar al AuthService Register cuando el formulario es valido', () => {
    // Establece el valor del formulario para que sea válido
    component.registerForm.setValue({ userImg: 'testImg', company: 'testCompany', email: 'Test@test.com', password: 'testPassword', companyDescription: 'TESTESTET', ubication:'' });

    // Llama a la función login en la instancia del componente
    component.register();

    // Verifica que se llamó al método login en el servicio AuthService
    expect(authServiceSpy.register).toHaveBeenCalled();
  });
});

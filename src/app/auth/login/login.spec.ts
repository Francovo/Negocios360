import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialModule } from 'src/app/material/material.module';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Crea un servicio AuthService simulado
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    // Define un valor de retorno para el método login
    authServiceSpy.login.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MaterialModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('se debe llamar al AuthService login cuando el formulario es valido', () => {
    // Establece el valor del formulario para que sea válido
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });

    // Llama a la función login en la instancia del componente
    component.login();

    // Verifica que se llamó al método login en el servicio AuthService
    expect(authServiceSpy.login).toHaveBeenCalled();
  });
});
``

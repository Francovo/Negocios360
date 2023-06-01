import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environments';
import { StoreModule } from '@ngrx/store';
import { getUser } from 'src/app/pages/NGRX/pages.actions';
import { Router } from '@angular/router';


describe('Login Service', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let store: any;
  let router: any;

  beforeEach(() => {
    store = jasmine.createSpyObj('Store', ['USER']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({}, {})],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe retornar un mensaje de error si el email no es correcto', () => {
    const formData = { email: 'test@test.com', password: 'password' };
    const mockResponse: any = [];

    service.login(formData).subscribe((response) => {
      expect(response).toEqual(undefined);
    });

    const req = httpMock.expectOne(
      `${environment.base_url}/usuarios?email=${formData.email}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe retornar un mensaje de error si el password no es correcto', () => {
    const formData = { email: 'test@test.com', password: 'wrongpassword' };
    const mockResponse = [{ email: 'test@test.com', password: 'password' }];

    service.login(formData).subscribe((response) => {
      expect(response).toEqual(undefined);
    });

    const req = httpMock.expectOne(
      `${environment.base_url}/usuarios?email=${formData.email}`
    );
    expect(req.request.method).toBe('GET');
    //req.flush hace que lo que se ponga dentro sea la respuesta simulada, en este caso es la respuesta simulada del GET
    req.flush(mockResponse);
  });

  it('debe almacenar los datos del usuario y navegar al tablero si el inicio de sesión es exitoso', () => {
    const formData = { email: 'test@test.com', password: 'password' };
    const mockResponse = [
      {
        id: 1,
        email: 'test@test.com',
        password: 'password',
        company: 'testCompany',
      },
    ];

    const setItemSpy = spyOn(localStorage, 'setItem');

    service.login(formData).subscribe(() => {
      expect(setItemSpy.calls.argsFor(0) as any).toEqual([
        'token',
        mockResponse[0].id,
      ]);
      expect(setItemSpy.calls.argsFor(1) as any).toEqual([
        'company',
        mockResponse[0].company,
      ]);
      expect(store.dispatch).toHaveBeenCalledWith(getUser());
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        'negocios360/dashboard'
      );
    });

    const req = httpMock.expectOne(
      `${environment.base_url}/usuarios?email=${formData.email}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse[0]);
  });
});

describe('Register Service', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: any;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({}, {})],
      providers: [AuthService, { provide: Router, useValue: router }],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Se debe registrar el usuario', () => {
    const formData = {
      userImg: 'testImg',
      company: 'testCompany',
      email: 'testEmail',
      password: 'testPassword',
      companyDescription: 'testDescription',
      ubication: 'testUbication',
    };

    const setItemSpy = spyOn(localStorage, 'setItem');

    service.register(formData).subscribe((response) => {
      expect(setItemSpy.calls.argsFor(0) as any).toEqual(['token', undefined]);
      expect(setItemSpy.calls.argsFor(1) as any).toEqual([
        'company',
        formData.company,
      ]);
      expect(router.navigateByUrl).toHaveBeenCalledWith('');
    });

    const req = httpMock.expectOne(`${environment.base_url}/usuarios`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });
});

describe('isAuth Service', () => {
  let service: AuthService;
  let router: any;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({}, {})],
      providers: [AuthService, { provide: Router, useValue: router }],
    });
    service = TestBed.inject(AuthService);
  });

  it('debe redireccionar a /login si el user no esta autenticado', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.isAuth();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });


});

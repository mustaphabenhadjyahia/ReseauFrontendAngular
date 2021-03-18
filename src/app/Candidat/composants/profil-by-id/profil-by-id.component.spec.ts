import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilByIdComponent } from './profil-by-id.component';

describe('ProfilByIdComponent', () => {
  let component: ProfilByIdComponent;
  let fixture: ComponentFixture<ProfilByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

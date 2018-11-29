import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NullhotelsComponent } from './nullhotels.component';

describe('NullhotelsComponent', () => {
  let component: NullhotelsComponent;
  let fixture: ComponentFixture<NullhotelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NullhotelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NullhotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

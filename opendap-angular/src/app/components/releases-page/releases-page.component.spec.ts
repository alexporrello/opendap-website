import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesPageComponent } from './releases-page.component';

describe('ReleasesPageComponent', () => {
  let component: ReleasesPageComponent;
  let fixture: ComponentFixture<ReleasesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

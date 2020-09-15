import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Mock, MockFactory } from 'jasmine-mock-factory';
import { of } from 'rxjs';
import { ClinicService } from 'src/app/clinic/clinic.service';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { MaterialAppModule } from 'src/app/shared/material.app.module';
import { ClinicDatabase } from 'src/app/shared/testing/databases/clinic.database';
import { TransactionTypeDatabase } from 'src/app/shared/testing/databases/transaction-type.database';

import { TransactionTypeService } from '../shared/services/transaction-type.service';
import { TransactionTypeEffects } from '../store/effects/transaction-type.effects';
import { transactionTypeReducer } from '../store/reducers/transaction-type.reducer';
import { TransactionTypeListComponent } from './transaction-type-list/transaction-type-list.component';
import { TransactionTypeComponent } from './transaction-type.component';

function provide<T extends object>(c: T) {
    return { provide: c, useFactory: () => MockFactory.create(c) };
}

describe('TransactionTypeComponent', () => {
    let component: TransactionTypeComponent;
    let fixture: ComponentFixture<TransactionTypeComponent>;
    let clinicService: Mock<ClinicService>;
    let transactionTypeService: Mock<TransactionTypeService>;

    const cdb = new ClinicDatabase();
    const ttdb = new TransactionTypeDatabase();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule,
                SharedComponentsModule,
                StoreModule.forFeature('finance', { transactionTypes: transactionTypeReducer }),
                StoreModule.forRoot({}, {}),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([TransactionTypeEffects]),
                NoopAnimationsModule,
                RouterTestingModule,
            ],
            declarations: [TransactionTypeComponent, TransactionTypeListComponent],
            providers: [
                provide(ClinicService), provide(TransactionTypeService),
            ],
        });

        clinicService = TestBed.get(ClinicService);
        transactionTypeService = TestBed.get(TransactionTypeService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionTypeComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display all transaction types for the selected clinic', () => {
        // Arrange
        const transactionTypes = ttdb.getAsResponse(5);
        clinicService._spy.getAll._func.and.returnValue(of(cdb.getAsResponse(2)));
        transactionTypeService._spy.getAll._func.and.returnValue(of(transactionTypes));

        // Act
        fixture.detectChanges();

        // Assert
        const rows = fixture.debugElement.queryAll(By.css('mat-row'));

        const rowsContent = rows.map(e => e.nativeElement.textContent);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows.length).toEqual(transactionTypes.count);

        rowsContent.forEach((row: string, idx) => {
            const [code, label] = row.trim().split(' ');
            expect(code).toEqual(transactionTypes.results[idx].code.toString());
            expect(label).toEqual(transactionTypes.results[idx].label);
        });
    });
});

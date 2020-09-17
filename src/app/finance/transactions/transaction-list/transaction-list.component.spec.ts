import { registerLocaleData } from '@angular/common';
import localePtExtras from '@angular/common/locales/extra/pt';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { format } from 'date-fns';
import { Mock } from 'jasmine-mock-factory';
import { of, throwError } from 'rxjs';
import { ClinicService } from 'src/app/clinic/clinic.service';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { MaterialAppModule } from 'src/app/shared/material.app.module';
import { ClinicDatabase } from 'src/app/shared/testing/databases/clinic.database';

import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { TransactionDatabase } from '../../../shared/testing/databases/transaction.database';
import { provideMock } from '../../../shared/testing/provide-mock';
import { TransactionService } from '../../shared/services/transaction.service';
import { ClinicEffects } from '../../store/effects/clinic.effect';
import { TransactionEffects } from '../../store/effects/transaction.effects';
import { clinicReducer } from '../../store/reducers/clinic.reducer';
import { transactionReducer } from '../../store/reducers/transaction.reducer';
import { TransactionListComponent } from './transaction-list.component';

registerLocaleData(localePt, localePtExtras);

describe('TransactionListComponent', () => {
    let component: TransactionListComponent;
    let fixture: ComponentFixture<TransactionListComponent>;
    let clinicService: Mock<ClinicService>;
    let transactionService: Mock<TransactionService>;

    const cdb = new ClinicDatabase();
    const tdb = new TransactionDatabase();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule,
                SharedComponentsModule,
                StoreModule.forFeature('finance', { clinic: clinicReducer, transactions: transactionReducer }),
                StoreModule.forRoot({}, {}),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([ClinicEffects, TransactionEffects]),
                NoopAnimationsModule,
                RouterTestingModule,
            ],
            declarations: [TransactionListComponent],
            providers: [
                { provide: LOCALE_ID, useValue: 'pt-BR' },
                provideMock(ClinicService), provideMock(TransactionService),
            ],
        });

        clinicService = TestBed.get(ClinicService);
        transactionService = TestBed.get(TransactionService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render transactions', () => {
        // Arrange
        const transactions = tdb.getAsResponse(10);
        clinicService._spy.getAll._func.and.returnValue(of(cdb.getAsResponse(2)));
        transactionService._spy.getAll._func.and.returnValue(of(transactions));

        // Act
        fixture.detectChanges();

        // Assert
        const rows = fixture.debugElement.queryAll(By.css('mat-row'));

        const rowsContent = rows.map(e => e.nativeElement.innerText);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows.length).toEqual(transactions.count);

        rowsContent.forEach((row: string, idx) => {
            const expectedResult = transactions.results[idx];
            const expectedAmount = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expectedResult.amount);

            const [date, type, payer, serviceBeneficiary, description, value] = row.trim().split('\n');
            expect(date).toEqual(format(expectedResult.date, 'DD/MM/YYYY'));
            expect(type).toEqual(expectedResult.type.label);
            expect(payer).toEqual(expectedResult.payer);
            expect(serviceBeneficiary).toEqual(expectedResult.serviceBeneficiary);
            expect(description).toEqual(expectedResult.description);
            expect(value).toEqual(expectedAmount);
        });
    });

    it('should paginate transactions', () => {
        // Arrange
        const firstPageTransactions = tdb.getAsResponse(15);
        const secondPageTransactions = tdb.getAsResponse(5);
        clinicService._spy.getAll._func.and.returnValue(of(cdb.getAsResponse(2)));
        transactionService._spy.getAll._func.and.returnValues(of(firstPageTransactions), of(secondPageTransactions));
        fixture.detectChanges();

        // Act
        const nextPageButton = fixture.debugElement.query(By.css('mat-paginator .mat-paginator-navigation-next'));
        nextPageButton.triggerEventHandler('click', {});
        fixture.detectChanges();

        // Assert
        const rows = fixture.debugElement.queryAll(By.css('mat-row'));

        const rowsContent = rows.map(e => e.nativeElement.innerText);

        expect(rows.length).toBeGreaterThan(0);
        expect(rows.length).toEqual(secondPageTransactions.count);

        rowsContent.forEach((row: string, idx) => {
            const expectedResult = secondPageTransactions.results[idx];
            const expectedAmount = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expectedResult.amount);

            const [date, type, payer, serviceBeneficiary, description, value] = row.trim().split('\n');
            expect(date).toEqual(format(expectedResult.date, 'DD/MM/YYYY'));
            expect(type).toEqual(expectedResult.type.label);
            expect(payer).toEqual(expectedResult.payer);
            expect(serviceBeneficiary).toEqual(expectedResult.serviceBeneficiary);
            expect(description).toEqual(expectedResult.description);
            expect(value).toEqual(expectedAmount);
        });
    });

    it('should show error state', () => {
        // Arrange
        clinicService._spy.getAll._func.and.returnValue(of(cdb.getAsResponse(2)));
        transactionService._spy.getAll._func.and.returnValue(throwError(new Error('failed')));

        // Act
        fixture.detectChanges();

        // Assert
        const rows = fixture.debugElement.queryAll(By.css('mat-row'));
        expect(rows.length).toEqual(0);

        const emptyState = fixture.debugElement.query(By.directive(EmptyStateComponent));
        expect(emptyState).toBeTruthy();
        expect(emptyState.nativeElement.textContent).toContain('Ocorreu um erro ao recuperar os dados');
    });

    it('should show empty state when no clinics are found', () => {
        // Arrange
        clinicService._spy.getAll._func.and.returnValue(of(cdb.getAsResponse(0)));

        // Act
        fixture.detectChanges();

        // Assert
        const rows = fixture.debugElement.queryAll(By.css('mat-row'));
        expect(rows.length).toEqual(0);

        const emptyState = fixture.debugElement.query(By.directive(EmptyStateComponent));
        expect(emptyState).toBeTruthy();
        expect(emptyState.nativeElement.textContent).toContain('Cadastre uma clinica para começar a gestão financeira');
    });

    it('should show empty state when no transactions are found', () => {
        // Arrange
        clinicService._spy.getAll._func.and.returnValue(of(cdb.getAsResponse(2)));
        transactionService._spy.getAll._func.and.returnValue(of(tdb.getAsResponse(0)));

        // Act
        fixture.detectChanges();

        // Assert
        const rows = fixture.debugElement.queryAll(By.css('mat-row'));
        expect(rows.length).toEqual(0);

        const emptyState = fixture.debugElement.query(By.directive(EmptyStateComponent));

        expect(emptyState).toBeTruthy();
        expect(emptyState.nativeElement.textContent).toContain('Comece o cadastro de transações através do botão "novo" dessa tela');
    });

});

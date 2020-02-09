import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: 'form[appAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
    constructor(private _eRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

    private getInputElement(nativeElement: any): any {
        if (!nativeElement || !nativeElement.children) {
            return undefined;
        }
        if (!nativeElement.children.length && nativeElement.localName === 'input' && nativeElement.type !== 'hidden') {
            return nativeElement;
        }

        let input;

        [].slice.call(nativeElement.children).every(c => {
            input = this.getInputElement(c);
            if (input) {
                return false;
            }
            return true;
        });

        return input;
    }

    ngAfterViewInit() {
        this.autoFocus();
        this.cdr.detectChanges();
    }

    autoFocus() {
        const formChildren = [].slice.call(this._eRef.nativeElement.children);

        formChildren.every(child => {
            const input = this.getInputElement(child);
            if (input) {
                input.focus();
                return false;
            }
            return true;
        });
    }

    @HostListener('submit', [])
    onSubmit() {
        this.autoFocus();
    }
}

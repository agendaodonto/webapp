import { ComponentFactoryResolver, ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import { LoadingOverlayComponent } from '../components/loading-overlay/loading-overlay.component';

@Directive({
    selector: '[appLoadingOverlay]',
})
export class LoadingOverlayDirective implements OnChanges {
    @Input('appLoadingOverlay') trigger: any;
    overlayComponentRef: ComponentRef<LoadingOverlayComponent>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnChanges() {
        if (this.trigger === 'true' || this.trigger === true) {
            this.destroy();
            const factory = this.componentFactoryResolver.resolveComponentFactory(LoadingOverlayComponent);
            this.overlayComponentRef = this.viewContainerRef.createComponent(factory);
        } else {
            this.destroy();
        }
    }

    destroy() {
        if (this.overlayComponentRef) {
            this.overlayComponentRef.destroy();
        }
    }
}

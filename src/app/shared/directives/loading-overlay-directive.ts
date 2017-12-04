import { LoadingOverlayComponent } from '../components/loading-overlay/loading-overlay.component';
import { Directive, Input, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
    selector: '[appLoadingOverlay]'
})
export class LoadingOverlayDirective implements OnChanges {
    @Input('appLoadingOverlay') trigger: boolean;
    overlayComponentRef: ComponentRef<LoadingOverlayComponent>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnChanges() {
        if (this.trigger) {
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
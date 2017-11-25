import { LoadingOverlayComponent } from '../components/loading-overlay/loading-overlay.component';
import { Directive, Input, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Renderer2 } from '@angular/core';
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
        private renderer: Renderer2
    ) {
    }

    ngOnChanges() {
        if (this.trigger) {
            console.log('creating')
            this.destroy();
            const factory = this.componentFactoryResolver.resolveComponentFactory(LoadingOverlayComponent);
            this.overlayComponentRef = this.viewContainerRef.createComponent(factory);
        } else {
            console.log('destroying')
            this.destroy();
        }
    }

    destroy() {
        if (this.overlayComponentRef) {
            this.overlayComponentRef.destroy();
        }
    }
}

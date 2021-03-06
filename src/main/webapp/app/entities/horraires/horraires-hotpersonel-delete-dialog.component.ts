import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HorrairesHotpersonel } from './horraires-hotpersonel.model';
import { HorrairesHotpersonelPopupService } from './horraires-hotpersonel-popup.service';
import { HorrairesHotpersonelService } from './horraires-hotpersonel.service';

@Component({
    selector: 'jhi-horraires-hotpersonel-delete-dialog',
    templateUrl: './horraires-hotpersonel-delete-dialog.component.html'
})
export class HorrairesHotpersonelDeleteDialogComponent {

    horraires: HorrairesHotpersonel;

    constructor(
        private horrairesService: HorrairesHotpersonelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.horrairesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'horrairesListModification',
                content: 'Deleted an horraires'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-horraires-hotpersonel-delete-popup',
    template: ''
})
export class HorrairesHotpersonelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private horrairesPopupService: HorrairesHotpersonelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.horrairesPopupService
                .open(HorrairesHotpersonelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

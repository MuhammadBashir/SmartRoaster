var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef } from "@angular/core";
var ScrollbarDirective = /** @class */ (function () {
    function ScrollbarDirective(el) {
        this.el = el;
    }
    ScrollbarDirective.prototype.ngOnInit = function () {
        $(function () {
            console.log("Hello");
        }); //<--TEST JQUERY
        //check if your plugins are loading
        $.mousewheel
            ? console.log("mousewheel loaded")
            : console.log("mousewheel not loaded");
        $.mCustomScrollbar
            ? console.log("mCustomScrollbar loaded")
            : console.log("mCustomScrollbar not loaded");
        $(this.el.nativeElement).mCustomScrollbar({
            autoHideScrollbar: false,
            theme: "light",
            advanced: {
                updateOnContentResize: true
            }
        });
    };
    ScrollbarDirective = __decorate([
        Directive({
            selector: "scrollbar",
            host: { class: "mCustomScrollbar" } //<-- Make sure you add the class
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ScrollbarDirective);
    return ScrollbarDirective;
}());
export { ScrollbarDirective };
//# sourceMappingURL=scrollbar.directive.js.map
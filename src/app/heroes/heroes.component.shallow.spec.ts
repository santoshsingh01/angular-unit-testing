import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('HeoresComponent (shallow tests',()=>{
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    //Mocking child
    //creating fake child component - to resolve console error- "'app-hero' is not a known element:"
    @Component({
        selector:'app-hero',
        template: '<div></div>',
    })
    class FakeHeroComponent{
        @Input() hero: Hero;
    }


    beforeEach(()=>{
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Women', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]
        //creating mock object of heroService
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        
        //Configuring the module, to test one or more components
        TestBed.configureTestingModule({
            declarations:[HeroesComponent, FakeHeroComponent],
            providers:[
                //this is basically "long hand provider" syntax to inject heroService, which is required in the HeroesComponent
                {provide: HeroService, useValue: mockHeroService}
            ],
            //schemas:[NO_ERRORS_SCHEMA]  //it will not give any warning/error if made any error in component view.
        });
        fixture = TestBed.createComponent(HeroesComponent)
    })

    it('should set heroes correctly from the service',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    //Test case to check for each Heros, there is only one li element is going to be rendered.
    it('should create one li for each hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})
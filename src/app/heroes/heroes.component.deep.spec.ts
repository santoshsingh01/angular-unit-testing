import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";
//purpose: To check the interaction bw the heroes component and the child hero component and make sure that they're setup correctly.
//EX: we can check that the heroesComponent is correctly inputting the child heroComponent, and we cna check that the HeroesComponent is correctly listening to the delete event on the child heroComponent.
//In the deep test, we test more than one component. 
describe('HeoresComponent (shallow tests',()=>{
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

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
            declarations:[
                HeroesComponent, 
                HeroComponent
            ],
            providers:[
                //this is basically "long hand provider" syntax to inject heroService, which is required in the HeroesComponent
                {provide: HeroService, useValue: mockHeroService}
            ],
            schemas:[NO_ERRORS_SCHEMA]  
        });
        fixture = TestBed.createComponent(HeroesComponent);
        
    })

    it('should render each hero as a HeroComponent', ()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));    //it will return list of hero once init method call the getHeroes service. 

        //run ngOnInit()
        fixture.detectChanges(); //since we have called change detection on parent (heroes) component, it will run on all child components. This basically called the init() of component.
        
        //It will fetch all the rendered Hero elements. Since we have only 3 Heroes in HEROES array so the count will be 3.
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponentDEs.length).toEqual(3);

        //checking each hero name in hero component
        //So using this test case, we are verifying that the heroesComponent template and how it passes the hero object, we're checking that the piece o data is set correctly and passed into the HeroComponent(child) corrctly.
        for(let i=0; i<heroComponentDEs.length; i++){
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    })
})


import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HerosComponent', ()=>{
    let component: HeroesComponent
    let HEROES;
    let mockHeroService;

    beforeEach(()=>{
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Women', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        component = new HeroesComponent(mockHeroService);

    })

    describe('delete', ()=>{
        it('should delete hero from the hero list',()=>{
            //Arrange
            mockHeroService.deleteHero.and.returnValue(of(true));  //used to return observables.(since subscribe is used in the component)
            component.heroes = HEROES;
            
            //Act
            component.delete(HEROES[2]);

            //Assert
            expect(component.heroes.length).toBe(2);
        })

        it('should call deleteHero',()=>{
            //Arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            
            //Act
            component.delete(HEROES[2]);

            //Assert
            expect(mockHeroService.deleteHero).toHaveBeenCalled();
        })

        it('should call deleteHero with correct hero object',()=>{
            //Arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            
            //Act
            component.delete(HEROES[2]);

            //Assert
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        })
    })
})


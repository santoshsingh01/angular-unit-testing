import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe',()=>{
    it('should display weak if strength is 5',()=>{
        //Arrange
        let pipe = new StrengthPipe();
    
        //Act
        let val = pipe.transform(5);

        //Assert
        expect(val).toEqual('5 (weak)');

        
        //expect(pipe.transform(5)).toEqual('5 (weak)');
    })

    it('should display strong if strength is 10',()=>{
        let pipe = new StrengthPipe();

        //we can use act and assert together becuse act is small
        expect(pipe.transform(10)).toEqual('10 (strong)');
    })
})
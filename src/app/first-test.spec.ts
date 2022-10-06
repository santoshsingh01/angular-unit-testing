
describe('my first test', () => {
    let sut;        //sort for system under test

    //Now we need some common setup that's going to run before every test. 
    //This will reset the state so that I know that wih every test we don't have any effects from a previous test that's holding over and perhaps polluting the state of future tests.
    //That is done in the beforeEach function.
    beforeEach(() => {
        sut = {}
    })

    //Actual test
    it('should be true if true',()=>{
        //arrange
        sut.a = false;

        //act
        sut.a = true;

        //assert
        expect(sut.a).toBe(true);
    })

})


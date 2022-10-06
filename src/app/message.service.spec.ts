import { MessageService } from "./message.service"

describe('MessageService', ()=>{
    let service: MessageService

    beforeEach(()=>{
        service = new MessageService();
    })

    it('should have no message to start',()=>{
        expect(service.messages.length).toBe(0);
    })

    it('should add a message when add is called',()=>{
        service.add('message1');

        expect(service.messages.length).toBe(1);
    })

    it('should remove all messages when clear is called',()=>{
        //Arrange
        //service = new MessageService();    //we can also use new service instance in each test cases rather than initializing in beforeEach method.
        service.add('message1');

        //Act
        service.clear();

        //Assert
        expect(service.messages.length).toBe(0);
    })
})
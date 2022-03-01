export default class Event{
    constructor (eventName, eventDescription, eventPicture, eventPrice, eventDate, eventPresenters){
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventPicture = eventPicture;
        this.eventPrice = eventPrice;
        this.eventDate = eventDate;
        this.eventPresenters = eventPresenters;
    }
}
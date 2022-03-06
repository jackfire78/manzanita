export default class Event{
    constructor (id, eventName, eventDescription, eventPicture, eventPrice, eventDate, eventPresenters){
        this.id = id;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventPicture = eventPicture;
        this.eventPrice = eventPrice;
        this.eventDate = eventDate;
        this.eventPresenters = eventPresenters;
    }
}
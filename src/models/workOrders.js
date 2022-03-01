export default class workOrder{
    constructor (residentName, residentUnit, residentPhoneNum, issue, severity, homeEntrance, status){
        this.residentName = residentName;
        this.residentUnit = residentUnit;
        this.residentPhoneNum = residentPhoneNum;
        this.issue = issue;
        this.severity = severity;
        this.homeEntrance = homeEntrance;
        this.status = status;
    }
}
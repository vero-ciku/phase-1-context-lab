/* Your Code Here */
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(array){
    let newArr = []
    array.forEach(element =>{
        newArr.push(createEmployeeRecord(element))
    })
    return newArr
}

function createTimeInEvent(timeIn){
    let hour = parseInt(timeIn.split(" ")[1])
    let date = timeIn.split(" ")[0]
    this["timeInEvents"].push({
        type: "TimeIn",
        hour: hour,
        date: date
    })
    return this;
}
function createTimeOutEvent(timeOut){
    let hour = parseInt(timeOut.split(" ")[1])
    let date = timeOut.split(" ")[0]
    this["timeOutEvents"].push({
        type: "TimeOut",
        hour: hour,
        date: date
    })
    return this;
}
function hoursWorkedOnDate( date){
    let inEvent = this.timeInEvents.find(event => event.date === date)
    let outEvent = this.timeOutEvents.find(event => event.date === date)
    return (outEvent.hour - inEvent.hour) / 100
}
function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    const rate = this["payPerHour"]
    return hoursWorked * rate
}
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function calculatePayroll(employeearr) {
    return employeearr.reduce((memo, rec)=>
        memo + allWagesFor.call(rec), 0)
}

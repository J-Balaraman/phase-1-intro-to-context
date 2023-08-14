function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(data) {
    return data.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(employee, dateTime) {
    const [date, time] = dateTime.split(' ');
    const [hour, minutes] = time.split(':');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

function createTimeOutEvent(employee, dateTime) {
    const [date, time] = dateTime.split(' ');
    const [hour, minutes] = time.split(':');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payPerHour = employee.payPerHour;
    return hoursWorked * payPerHour;
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((total, employee) => total + allWagesFor(employee), 0);
    return totalPayroll;
}
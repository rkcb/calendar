(function () {
    /*jshint esversion: 6 */
    "use strict"

    let currentDate = new Date(); // now date
    let currentMonth = currentDate.getMonth();
    let selectedMonth = null;

    function getFirstCalendarDate(date = false) {
        if (!date)
            date = new Date();

        date.setDate(1);
        date.setHours(-24 * ((date.getDay() + 6 ) % 7) );
        return date;
    }

    /**
     * adds the date numbers to table cells
     */
    function setMonthDates(){
        let now = getFirstCalendarDate(new Date());
        let days = document.getElementsByClassName("day");
        for (let i = 0; i < days.length; i++){
            days[i].innerHTML = now.getDate().toString();
            now.setHours(24); // increases current date by 24h
        }
    }

    function grayOutIrrelevantDays(){

        let now = new Date();
        now.setDate(1);
        let days = document.getElementsByClassName("day");

        // number of days before the day one
        let prefix = (6 + now.getDay()) % 7;

        for (let j = 0; j < prefix; j++) {
            days[j].style.color = "lightgray";
        }

        now.setMonth(now.getMonth() + 1);
        now.setDate(0); // now points the last day of the month

        // number of days after this month
        let suffix = prefix + now.getDate();

        for (let j = suffix; j < days.length; j++) {
            days[j].style.color = "lightgray";
        }

    }

    function daysBeforeFirst(date = false) {

        let now = date === false ? new Date() : date;
        now.setDate(1);

        // number of days before the day one
        return (6 + now.getDay()) % 7;
    }

    function getDaysInMonth(date){
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date.getDate();
    }

    function properCalendarElements(date = false) {

        let prefix = daysBeforeFirst();
        let days = document.getElementsByClassName("day");
        if (!date) {
            date = new Date();
        }
        let daysInMonth = getDaysInMonth(date);

        return days.splice(prefix, prefix + daysInMonth);
    }

    /**
     * get the element array indexed with the month dates
     * @param date
     * @returns {Element[]}
     */
    function getMonthDateElements(date = false) {
        if (date === false) {
            date = new Date();
        }
        let days = Array.from( document.getElementsByClassName("day") );
        let prefix = daysBeforeFirst();
        let daysInMonth = getDaysInMonth(date);
        return days.slice(prefix, prefix + daysInMonth);
    }

    /**
     * add an event decoration
     * @param date
     */
    function addEvent(date) {
        let days = getMonthDateElements();
        let day = days[days.length-1];
        day.closest("td").style.borderBottom = "solid 3px red";
    }

    function decorateToday(){
        let days = getMonthDateElements();
        let today = days[currentDate.getDate() - 1];
        today.closest("td").style.backgroundColor = "lightgoldenrodyellow";
    }

    setMonthDates();
    grayOutIrrelevantDays();
    addEvent(new Date());
    decorateToday();

})()
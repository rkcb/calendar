(function () {
    "use strict"

    let today = new Date();
    let currentDate = new Date(); // this date will change with navigation

    /**
     * return a Date which points to the day 1--
     * @param date
     * @returns {*}
     */
    function getFirstCalendarDate(date) {
        let date2 = copy(date);
        date2.setDate(1);
        date2.setHours(-24 * ((date.getDay() + 6 ) % 7) );
        return date2;
    }

    function copy(date) {
        return new Date(date.getTime());
    }

    /**
     * adds the date numbers to table cells
     */
    function setMonthDates(date){
        let now = getFirstCalendarDate(date);
        let days = document.getElementsByClassName("day");
        for (let i = 0; i < days.length; i++){
            days[i].innerHTML = now.getDate().toString();
            now.setHours(24); // increases current date by 24h
        }
    }

    function grayOutIrrelevantDays(date){

        let now = copy(date);
        now.setDate(1);
        let days = document.getElementsByClassName("day");

        // restore possibly lightgray days back to black
        for (let i = 0; i < days; i++) {
            days[i].style.color = "black";
        }

        // number of days before the day one
        let prefix = daysBeforeFirst(now);

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

    /**
     * number of the previous month days
     * @param date
     * @returns {number}
     */
    function daysBeforeFirst(date) {
        let date2 = copy(date);
        date2.setDate(1);
        // number of days before the day one
        return (6 + date2.getDay()) % 7;
    }

    /**
     * the number of days in a month
     * @param date
     * @returns {number}
     */
    function getDaysInMonth(date){
        let date2 = copy(date);
        date2.setMonth(date2.getMonth() + 1);
        date2.setDate(0);
        return date.getDate();
    }

    function properCalendarElements(date) {
        let prefix = daysBeforeFirst(date);
        let days = document.getElementsByClassName("day");
        let daysInMonth = getDaysInMonth(date);
        return days.splice(prefix, prefix + daysInMonth);
    }

    /**
     * get the element array indexed with the month dates
     * @param date
     * @returns {Element[]}
     */
    function getMonthDateElements(date) {
        let days = Array.from( document.getElementsByClassName("day") );
        let prefix = daysBeforeFirst(date);
        let daysInMonth = getDaysInMonth(date);
        return days.slice(prefix, prefix + daysInMonth);
    }

    /**
     * add an event decoration
     * @param date
     */
    function addEvent(date) {
        let days = getMonthDateElements(date);
        let day = days[days.length-1];
        day.closest("td").style.borderBottom = "solid 3px red";
    }

    /**
     * @param Date currentDate chosen date by the user
     */
    function decorateToday(currentDate){
        // show today only if in correct month
        let today = new Date();
        if (today.getMonth() === currentDate.getMonth()) {
            let days = getMonthDateElements(currentDate);
            let day = days[today.getDate() - 1];
            day.closest("td").style.backgroundColor = "#f8e5ab";
        }
    }

    function monthName(date) {
        let names = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"];
        return names[date.getMonth()];
    }

    /**
     * updates the month
     * @param int offset
     */
    function updateMonth(offset = 0) {
        let newMonth = currentDate.getMonth() + offset;
        currentDate.setMonth(newMonth);
        setMonthDates(currentDate);
        grayOutIrrelevantDays(currentDate);
        // addEvent(new Date());
        decorateToday(currentDate);
        document.getElementById("month").innerText = monthName(currentDate);
    }

    function addCalendarEventListeners() {
        document.getElementById("month-prev").addEventListener("click", function (event) {
            event.preventDefault();
            console.log("clicked prev");
        });
        document.getElementById("month-next").addEventListener("click", updateMonth(1));
    }

    document.getElementById("month-prev").addEventListener("click", function () {
        updateMonth(-1);
    });
    document.getElementById("month-next").addEventListener("click", function () {
        updateMonth(1);
    });

    // addCalendarEventListeners();
    updateMonth();



})()
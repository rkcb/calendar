(function () {

    function getFirstCalendarDate(date = false) {
        if (!date)
            date = new Date();

        date.setDate(1);
        date.setHours(-24 * ((date.getDay() + 6 ) % 7) );
        return date;
    }

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

    setMonthDates();
    grayOutIrrelevantDays();

})()
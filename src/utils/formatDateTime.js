export default function formatDateTime(dateInput) {
    const date = new Date(dateInput);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayName = days[date.getDay()];
    const dayNumber = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    // Add ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (n) => {
        if (n > 3 && n < 21) return "th"; // covers 11th-13th
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const dayWithSuffix = dayNumber + getOrdinalSuffix(dayNumber);

    // Time in 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'

    return `${dayName}, ${dayWithSuffix} ${monthName} ${year}, ${hours}:${minutes} ${ampm}`;
}
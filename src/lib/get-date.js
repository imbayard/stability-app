export default function getCurrentDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const date = new Date();
    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const monthNum = date.getMonth()
  
    return {dayName, month, dayOfMonth, year, monthNum};
}

export function getPrettyDate() {
    const {dayName, month, dayOfMonth, year} = getCurrentDate()
    return `${dayName} ${month} ${dayOfMonth}, ${year}`
}

export function getFunctionalDate() {
    const {dayName, month, dayOfMonth, year, monthNum} = getCurrentDate()
    console.log(`Hope you're having a nice ${month} :)`)
    return `${year}-${monthNum}-${dayOfMonth}`
}
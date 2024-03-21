export default function getTimeOfDay() {
    const currentHour = new Date().getHours();
  
    if (currentHour >= 6 && currentHour < 18) {
      return 'morning';
    } else {
      return 'evening';
    }
}
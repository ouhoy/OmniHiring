export default function getDateString(postedDate: string) {
    const dateParts = postedDate.split('/');
    const posted = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

    // Get the current date
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - posted.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 0) return 'today';

    return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;

}
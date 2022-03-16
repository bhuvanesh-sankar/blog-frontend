import { helper } from '@ember/component/helper';

function getFormattedDate(dateString) {
    return new Date(dateString).toDateString();
} 

export default helper(getFormattedDate);

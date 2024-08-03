export default function extractDate(earlyLate = true, dataarr) {
    // columns we want to check:
    // outbreak_date,date_detected,date_collected,date_confirmed,date_occurred_low_end,date_occurred_high_end
    // 5,6,7,8,13,14
    // data is either mm/dd/yyyy or yyyy-mm-dd

    let alldates = [];
    for (let i = 5; i < 9; i++) {
        
        if (dataarr[i].includes('/')) {
            var date = dataarr[i].split('/');
        } else if (dataarr[i].includes('-')) {
            var date = dataarr[i].split('-');
        }

        if (!date) {
            continue;
        }

        if (date[0].length == 2) {
            // mm/dd/yyyy
            var month = parseInt(date[0]) - 1;
            var day = parseInt(date[1]);
            var year = parseInt(date[2]);
        } else {
            // yyyy-mm-dd
            var year = parseInt(date[0]);
            var month = parseInt(date[1]) - 1;
            var day = parseInt(date[2]);
        }
        
        alldates.push(new Date(year, month, day));            
    }

    if (alldates.length == 0) {
        return null;
    }

    alldates.sort((a, b) => a - b);
    if (earlyLate) {
        return alldates[0];
    } else {
        return alldates[alldates.length - 1];
    }
}
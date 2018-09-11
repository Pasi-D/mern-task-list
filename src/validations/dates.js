/*
    validates dates : start_date does not exceed end_date
*/

module.exports = function dateValidator(start_date, end_date){
    
    if (new Date(start_date).getTime() < new Date(end_date).getTime()) {
        return true;
    }else{
        return false;
    }
}
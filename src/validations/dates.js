/*
    validates dates : start_date does not exceed end_date
*/

module.exports = function dateValidator(start_date, end_date){
    
    if ((new Date(start_date).getTime() < new Date(end_date).getTime()) || 
        (new Date(start_date).getTime() === new Date(end_date).getTime())) {
        console.log('exec date valid');        
        return true;
    }else{
        console.log('exec date invalid');
        return false;
    }
}
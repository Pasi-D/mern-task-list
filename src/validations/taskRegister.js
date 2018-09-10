const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function taskRegisterValidatorInput(data){
    let errors = {};

    if (Validator.isEmpty(data.title)) {
        console.log('data.title is empty');        
        errors.title = 'task Title cannot be empty';
    }

    if (Validator.isEmpty(data.description)) {
        console.log('data.description is empty');        
        errors.description = 'task description cannot be null';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}
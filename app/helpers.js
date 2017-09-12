/**
 * return error use the obj err of the mongoose
 * @param err
 * @param nobr
 * @returns {string}
 */
exports.getErrorMessage = function(err, noTags)
{
    var message = '';
    if( err == null || err == 'undefined')
        return "erro inesperado aconteceu!";
    
    if('code' in err)
    {
        switch (err.code)
        {
            case 11000:
            case 11001:
                message = 'User already exists';
                break;
            default:                
                message = 'Erro desconhecido!';
        }
    }
    else
    {
        if ('errors' in err)
        {
            for(var errName in err.errors)
            {
                if(err.errors[errName].message)
                {
                    let msgs = [err.errors[errName].message]; 
                    if(noTags != true) msgs.push("\n");
                    message += msgs.join('');
                }
            }
        }
        else
        {
            message = 'server error internal!';
        }
    }
    return message;
};
const { TWILIO_ACCOUNT, TWILIO_API_KEY, SEND_FROM } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT, TWILIO_API_KEY);

exports.handler = async (event) => {
    const Jeton = event['Jeton'];
    const Numero = event['Numero'];
    
    let myTwiML = '<Response>' +
        '<Say voice="alice" language="fr-FR">Bonjour, je suis le Serveur de jetons sÃ©curisÃ© du crÃ©dit agricole.</Say>'+
        '<Say voice="alice" language="fr-FR">Votre jeton est le</Say>' +
        '<Say voice="alice" language="fr-FR">'+Jeton.charAt(0)+'</Say>'+
        '<Say voice="alice" language="fr-FR">'+Jeton.charAt(1)+'</Say>'+
        '<Say voice="alice" language="fr-FR">'+Jeton.charAt(2)+'</Say>'+
        '<Say voice="alice" language="fr-FR">'+Jeton.charAt(3)+'</Say>'+
        '<Say voice="alice" language="fr-FR">'+Jeton.charAt(4)+'</Say>'+
        '<Say voice="alice" language="fr-FR">'+Jeton.charAt(5)+'</Say>'+
        '<Say voice="alice" language="fr-FR">Merci de votre confiance.</Say>'+
        '</Response>';

    await client.calls
        .create({
            url: "http://twimlets.com/echo?"+'Twiml='+encodeURIComponent(myTwiML),
            to: Numero,
            from: SEND_FROM
            })
        .then(call => console.log('OK : CallID = '+call.sid))
        .catch(error => console.log('KO : Erreur = '+error.message));

    return 'OK';
};
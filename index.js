const {google} = require('googleapis');
const keys = require('./keys.json');
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
);

client.authorize((error, tokens) => {

    if (error) {
        console.log(error);
        return;
    }
    console.log('Connected.');
    // const sheet = createBasicKubisFitnessSpreadsheet(client);
    transferOwnership("akubis18@gmail.com", "1uX6FIqoy03iwba2Xs5bbl9fQIeSowFjmecmj3Nk9JW0", client);
    // gsRun(client);
});

function transferOwnership(emailString, spreadsheetId, client) {
    const driveApi = google.drive({version: "v3", auth: client});

    const permission = {
        type: 'user',
        role: 'owner',
        emailAddress: emailString
    };
    driveApi.permissions.create({
        resource: permission,
        fileId: spreadsheetId,
        fields: 'id',
        transferOwnership: true
    })
}

function createBasicKubisFitnessSpreadsheet(client) {
    const gsapi = google.sheets({version: 'v4', auth: client})

    const creationProperties = {
        resource: {
            properties: {
                title: 'Kubis Fitness Spreadsheet [' + new Date().toLocaleString() + ']'
            }
        },
        auth: client.auth
    }

    const data = gsapi.spreadsheets.create(creationProperties)
        .then((response) => console.log(response))
        .catch(error => console.log(error));


    // gsapi.create(creationProperties).then((response) => {
    //     console.log(response);
    // });

}

async function gsRun(client) {

    const gsapi = google.sheets({version: 'v4', auth: client})

    const fitnessSheet = {
        spreadsheetId: '1-8Pn3RysJRxDPzqMSiHd6aRQXJyPrkjbBzBOD-29vyY',
        range: 'BB Bench!A1:B5'
        // fields: 'sheets.properties'
    };

    let data = await gsapi.spreadsheets.values.get(fitnessSheet);
    console.log(data);
};
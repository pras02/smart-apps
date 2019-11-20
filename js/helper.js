
// Our app is written in ES3 so that it works in older browsers!

function createRenderer(id) {
    const output = id ? document.getElementById(id) : document.body;
    return function (data) {
        output.innerText = data && typeof data === "object"
            ? JSON.stringify(data, null, 4)
            : String(data);
    };
}

function getMedicationName(medCodings) {
    var coding = medCodings.find(function (c) {
        return c.system == "http://www.nlm.nih.gov/research/umls/rxnorm";
    });
    return coding && coding.display || "Unnamed Medication(TM)";
}

function App(client) {
    this.client = client;
}

function fetchCurrentPatient() {
    var render = createRenderer("patient");
    render("Loading...");
    return this.client.patient.read().then(render, render);
};

function fetchCurrentEncounter() {
    var render = createRenderer("encounter");
    render("Loading...");
    return this.client.encounter.read().then(render, render);
};

function fetchCurrentUser() {
    var render = createRenderer("user");
    render("Loading...");
    return this.client.user.read().then(render, render);
};

function request(requestOptions, fhirOptions) {
    var render = createRenderer("output");
    render("Loading...");
    return this.client.request(requestOptions, fhirOptions).then(render, render);
};

function renderContext() {
    return Promise.all([
        this.fetchCurrentPatient(),
        this.fetchCurrentUser(),
        this.fetchCurrentEncounter()
    ]);
};

function setLabel(containerId, label) {
    document.getElementById(containerId).previousElementSibling.innerText = label;
};


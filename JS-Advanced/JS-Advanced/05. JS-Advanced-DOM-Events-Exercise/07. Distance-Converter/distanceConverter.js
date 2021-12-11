function attachEventsListeners() {
    const m = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254

    }

    const inputDistance = document.getElementById('inputDistance');
    const inputUnit = document.getElementById('inputUnits');
    const outputDistance = document.getElementById('outputDistance');
    const outputUnits = document.getElementById('outputUnits');
    document.getElementById('convert').addEventListener("click", convert)

    function convert() {
        const meters = inputDistance.value * m[inputUnit.value];
        const converted = {
            km: meters / m.km,
            m: meters / m.m,
            cm: meters / m.cm,
            mm: meters / m.mm,
            mi: meters / m.mi,
            yrd: meters / m.yrd,
            ft: meters / m.ft,
            in: meters / m.in
        }
        outputDistance.value = converted[outputUnits.value];
    }
}
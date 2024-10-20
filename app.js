function attachEvents() {
    const baseUrl = 'https://fisher-game.firebaseio.com/catches';

    document.querySelector('.load').addEventListener('click', loadCatches);
    document.querySelector('.add').addEventListener('click', addCatch);

    async function loadCatches() {
        const response = await fetch(`${baseUrl}.json`);
        const data = await response.json();
        const catchesDiv = document.getElementById('catches');
        catchesDiv.innerHTML = '';

        Object.entries(data).forEach(([id, catchInfo]) => {
            const catchDiv = createCatchDiv(id, catchInfo);
            catchesDiv.appendChild(catchDiv);
        });
    }

    async function addCatch() {
        const catchInfo = getCatchInfoFromForm();
        await fetch(`${baseUrl}.json`, {
            method: 'POST',
            body: JSON.stringify(catchInfo)
        });
        loadCatches();
    }

    async function updateCatch(id) {
        const catchInfo = getCatchInfoFromDiv(id);
        await fetch(`${baseUrl}/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify(catchInfo)
        });
        loadCatches();
    }

    async function deleteCatch(id) {
        await fetch(`${baseUrl}/${id}.json`, {
            method: 'DELETE'
        });
        loadCatches();
    }

    function createCatchDiv(id, catchInfo) {
        const catchDiv = document.createElement('div');
        catchDiv.className = 'catch';
        catchDiv.setAttribute('data-id', id);

        catchDiv.innerHTML = `
            <label>Angler</label>
            <input type="text" class="angler" value="${catchInfo.angler}" />
            <hr>
            <label>Weight</label>
            <input type="number" class="weight" value="${catchInfo.weight}" />
            <hr>
            <label>Species</label>
            <input type="text" class="species" value="${catchInfo.species}" />
            <hr>
            <label>Location</label>
            <input type="text" class="location" value="${catchInfo.location}" />
            <hr>
            <label>Bait</label>
            <input type="text" class="bait" value="${catchInfo.bait}" />
            <hr>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${catchInfo.captureTime}" />
            <hr>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
        `;

        catchDiv.querySelector('.update').addEventListener('click', () => updateCatch(id));
        catchDiv.querySelector('.delete').addEventListener('click', () => deleteCatch(id));

        return catchDiv;
    }

    function getCatchInfoFromForm() {
        return {
            angler: document.querySelector('#addForm .angler').value,
            weight: document.querySelector('#addForm .weight').value,
            species: document.querySelector('#addForm .species').value,
            location: document.querySelector('#addForm .location').value,
            bait: document.querySelector('#addForm .bait').value,
            captureTime: document.querySelector('#addForm .captureTime').value
        };
    }

    function getCatchInfoFromDiv(id) {
        const catchDiv = document.querySelector(`.catch[data-id="${id}"]`);
        return {
            angler: catchDiv.querySelector('.angler').value,
            weight: catchDiv.querySelector('.weight').value,
            species: catchDiv.querySelector('.species').value,
            location: catchDiv.querySelector('.location').value,
            bait: catchDiv.querySelector('.bait').value,
            captureTime: catchDiv.querySelector('.captureTime').value
        };
    }
}

attachEvents();



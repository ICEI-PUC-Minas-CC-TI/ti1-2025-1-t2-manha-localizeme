const eventList = document.getElementById('event-list');
const addEventBtn = document.getElementById('add-event');

let events = [];

// Carregar eventos do arquivo json
async function loadEvents() {
    const response = await fetch('eventos.json');
    events = await response.json();
    renderEvents();
}

function renderEvents() {
    eventList.innerHTML = '';
    events.forEach((evento, index) => {
        eventList.innerHTML += `
            <div>
                <h3>${evento.titulo}</h3>
                <p>Descrição: ${evento.descricao}</p>
                <p>Data: ${evento.data}</p>
                <button onclick="deleteEvent(${index})">Excluir</button>
            </div>
        `;
    });
}

// Adicionar novo evento
addEventBtn.onclick = async () => {
    const name = document.getElementById('evento-titulo').value;
    const description = document.getElementById('evento-descricao').value;
    const date = document.getElementById('evento-data').value;

    const newEvent = { name, description, date };
    events.push(newEvent);
    await saveEvents();
    renderEvents();
};

// Deletar evento
async function deleteEvent(index) {
    events.splice(index, 1);
    await saveEvents();
    renderEvents();
}

// Salvar eventos no json
async function saveEvents() {
    await fetch('save-events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(events)
    });
}


loadEvents();

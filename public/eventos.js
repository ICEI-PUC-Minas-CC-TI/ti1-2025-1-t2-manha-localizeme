document.addEventListener('DOMContentLoaded', function() {
    const API_URL = '/api/eventos';
    const form = document.getElementById('event-form');
    const eventsList = document.getElementById('events-list');
    const loadingElement = document.getElementById('loading-events');
    const noEventsElement = document.getElementById('no-events');
    const statusMessage = document.getElementById('form-status');
    const cancelBtn = document.getElementById('cancel-btn');

    let editingEventId = null;

    // Carregar eventos ao iniciar
    loadEvents();

    // Manipulador do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const eventData = {
            nome: document.getElementById('event-name').value,
            descricao: document.getElementById('event-description').value,
            data: document.getElementById('event-date').value
        };

        if (editingEventId) {
            updateEvent(editingEventId, eventData);
        } else {
            createEvent(eventData);
        }
    });

    // Botão de cancelar edição
    cancelBtn.addEventListener('click', function() {
        form.reset();
        editingEventId = null;
        cancelBtn.classList.add('hidden');
        document.getElementById('submit-btn').textContent = 'Salvar Evento';
        showStatus('Edição cancelada', 'success');
    });

    // Função para carregar eventos
    function loadEvents() {
        loadingElement.style.display = 'block';
        eventsList.innerHTML = '';
        noEventsElement.classList.add('hidden');

        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar eventos');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    noEventsElement.classList.remove('hidden');
                } else {
                    renderEvents(data);
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                showStatus(`Erro ao carregar eventos: ${error.message}`, 'error', 5000);
            })
            .finally(() => {
                loadingElement.style.display = 'none';
            });
    }

    // Função para renderizar a lista de eventos
    function renderEvents(events) {
        eventsList.innerHTML = '';

        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-card';
            eventElement.innerHTML = `
                <h3>${event.nome}</h3>
                <div class="event-date">Data: ${new Date(event.data).toLocaleDateString('pt-BR')}</div>
                <p>${event.descricao}</p>
                <div class="actions">
                    <button onclick="editEvent(${event.id})">Editar</button>
                    <button onclick="deleteEvent(${event.id})" class="btn-danger">Excluir</button>
                </div>
            `;
            eventsList.appendChild(eventElement);
        });
    }

    // Função para criar um novo evento
    function createEvent(eventData) {
        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Salvando... <span class="loading"></span>';
        submitBtn.disabled = true;

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao criar evento');
            }
            return response.json();
        })
        .then(() => {
            form.reset();
            showStatus('Evento criado com sucesso!', 'success');
            loadEvents();
        })
        .catch(error => {
            console.error('Erro:', error);
            showStatus(`Erro ao criar evento: ${error.message}`, 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }

    // Função para atualizar um evento
    function updateEvent(eventId, eventData) {
        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Atualizando... <span class="loading"></span>';
        submitBtn.disabled = true;

        fetch(`${API_URL}/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar evento');
            }
            return response.json();
        })
        .then(() => {
            form.reset();
            showStatus('Evento atualizado com sucesso!', 'success');
            loadEvents();
            cancelEdit();
        })
        .catch(error => {
            console.error('Erro:', error);
            showStatus(`Erro ao atualizar evento: ${error.message}`, 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }

    // Função para cancelar edição
    function cancelEdit() {
        form.reset();
        editingEventId = null;
        cancelBtn.classList.add('hidden');
        document.getElementById('submit-btn').textContent = 'Salvar Evento';
    }

    // Função para exibir mensagens de status
    function showStatus(message, type, duration = 3000) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
        statusMessage.classList.remove('hidden');

        setTimeout(() => {
            statusMessage.classList.add('hidden');
        }, duration);
    }

    // Funções globais para serem chamadas dos botões nos cards de evento
    window.editEvent = function(eventId) {
        fetch(`${API_URL}/${eventId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar evento');
                }
                return response.json();
            })
            .then(event => {
                document.getElementById('event-id').value = event.id;
                document.getElementById('event-name').value = event.nome;
                document.getElementById('event-description').value = event.descricao;
                document.getElementById('event-date').value = event.data;

                editingEventId = event.id;
                document.getElementById('submit-btn').textContent = 'Atualizar Evento';
                cancelBtn.classList.remove('hidden');

                // Scroll para o formulário
                form.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Erro:', error);
                showStatus(`Erro ao carregar evento: ${error.message}`, 'error');
            });
    };

    window.deleteEvent = function(eventId) {
        if (!confirm('Tem certeza que deseja excluir este evento?')) return;

        fetch(`${API_URL}/${eventId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir evento');
            }
            showStatus('Evento excluído com sucesso!', 'success');
            loadEvents();
        })
        .catch(error => {
            console.error('Erro:', error);
            showStatus(`Erro ao excluir evento: ${error.message}`, 'error');
        });
    };
});

import TicketService from './TicketService';
import TicketForm from './TicketForm';
import TicketView from './TicketView';
import Ticket from './Ticket';
import API_URL from './const';

export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = new TicketService(API_URL);
    this.form = new TicketForm(this.container);
  }

  init() {
    this.renderDesk();
    this.viewList();
    this.create();
    this.edit();
    this.delete();
  }

  renderDesk() {
    const desk = document.createElement('div');
    desk.classList.add('content');
    desk.innerHTML = `
      <button class="btn btn-add" type="button" name="button" aria-label="Click to add new ticket">
        Добавить тикет
      </button>
      <ul class="list">
      </ul>
    `;
    this.container.append(desk);
    this.addBtn = this.container.querySelector('.btn-add');
    this.list = this.container.querySelector('.list');
  }

  viewList() {
    this.ticketService.list()
      .then((value) => {
        if (!value || !value.length) {
          this.list.innerHTML = `
            <li class="list__item">Не добавлено ни одного тикета</li>
          `;
          return;
        }
        value.map((item) => {
          const ticket = new Ticket(item);
          const ticketView = new TicketView(this.list, ticket);
          return ticketView.init();
        });
      });
  }

  create() {
    this.addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.form.addTicket();
      this.formListener(null, 'create');
    });
  }

  edit() {
    const data = {};
    this.list.addEventListener('click', (e) => {
      e.preventDefault();
      if (!e.target.closest('.item__btn-edit')) return;
      data.id = e.target.closest('.item').dataset.id;
      this.ticketService.get(data.id)
        .then((value) => {
          this.form.editTicket(value.name, value.description);
          this.formListener(data.id, 'update');
        });
    });
  }

  delete() {
    this.list.addEventListener('click', (e) => {
      e.preventDefault();
      if (!e.target.closest('.item__btn-delete')) return;
      const ticketId = e.target.closest('.item').dataset.id;
      this.form.deleteTicket();

      this.form.popup.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.closest('.btn-submit')) {
          this.ticketService.delete(ticketId);
          this.closeForm();
        }
      });
    });
  }

  formListener(id, action) {
    this.form.popup.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.closest('.btn-submit')) {
        const ticketName = this.form.popup.querySelector('#short-desc').value;
        const ticketDesc = this.form.popup.querySelector('#detail-desc').value;

        if (!ticketName) {
          this.form.popup.remove();
          return;
        }

        if (action === 'create') this.ticketService.create({ name: ticketName, description: ticketDesc });
        if (action === 'update') this.ticketService.update(id, { name: ticketName, description: ticketDesc });
        this.closeForm();
      }
    });
  }

  closeForm() {
    setTimeout(() => {
      this.form.popup.remove();
      this.list.innerHTML = '';
      this.viewList();
    }, 1000);
  }
}

export default class TicketView {
  constructor(container, ticket) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticket = ticket;
  }

  init() {
    this.renderTicket();
    this.showDescription();
    this.changeStatus();
  }

  renderTicket() {
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');
    listItem.classList.add('item');
    listItem.dataset.id = this.ticket.id;
    listItem.innerHTML = `
      <div class="item__wrapper">
        <button class="item__btn item__btn-status" type="button" name="button" aria-label="Click to indicate task completed"></button>
        <p class="item__content">${this.ticket.name}</p>
        <time class="item__datetime" datetime="${TicketView.getDateTime()}">${TicketView.getDate()}</time>
        <button class="item__btn item__btn-edit" type="button" name="button" aria-label="Click to edit ticket"></button>
        <button class="item__btn item__btn-delete" type="button" name="button" aria-label="Click to delete ticket"></button>
      </div>
      <p class="item__description item__description-hidden">${this.ticket.description}</p>
    `;
    this.container.append(listItem);
    this.listItem = listItem;
  }

  showDescription() {
    const content = this.listItem.querySelector('.item__content');
    const desc = this.listItem.querySelector('.item__description');
    content.addEventListener('click', (e) => {
      e.preventDefault();
      desc.classList.toggle('item__description-hidden');
    });
  }

  changeStatus() {
    const statusBtn = this.listItem.querySelector('.item__btn-status');
    statusBtn.addEventListener('click', (e) => {
      e.preventDefault();
      statusBtn.classList.toggle('item__btn-true');
    });
  }

  static getDateTime() {
    const dateTime = `
      ${new Date().getFullYear()}
      -${new Date().getMonth()}
      -${new Date().getDate()}
      T${new Date().getHours()}
      :${new Date().getMinutes()}
    `;
    return dateTime.replace(/\n/g, '').split(' ').join('');
  }

  static getDate() {
    const date = new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit', month: '2-digit', year: '2-digit',
    }).format(Date.now());
    const time = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit', minute: '2-digit',
    }).format(Date.now());
    return `${date} ${time}`;
  }
}

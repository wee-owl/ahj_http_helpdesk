/* eslint-disable no-console */
export default class TicketService {
  constructor(API_URL) {
    this.url = API_URL;
  }

  list() {
    return fetch(`${this.url}?method=allTickets`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.error(err));
  }

  get(id) {
    return fetch(`${this.url}?method=ticketById&id=${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.error(err));
  }

  create(data) {
    fetch(`${this.url}?method=createTicket`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => console.log(response.status, response.statusText))
      .catch((err) => console.error(err));
  }

  update(id, data) {
    fetch(`${this.url}?method=updateById&id=${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => console.log(response.status, response.statusText))
      .catch((err) => console.error(err));
  }

  delete(id) {
    fetch(`${this.url}?method=deleteById&id=${id}`, {
      method: 'GET',
    })
      .then((response) => console.log(response.status, response.statusText))
      .catch((err) => console.error(err));
  }
}

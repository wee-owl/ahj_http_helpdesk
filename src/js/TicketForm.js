export default class TicketForm {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
  }

  renderForm() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
      <div class="popup__block">
        <p class="popup__title"></p>
        <form class="popup__form form" action="" method="post" name="form">
          <div class="form__content">
            <div class="form__group">
              <label class="form__label" for="short-desc">
                <span class="form__title">Краткое описание</span>
                <textarea class="form__textarea" id="short-desc" type="text" name="text" placeholder="|"></textarea>
              </label>
            </div>
            <div class="form__group">
              <label class="form__label" for="detail-desc">
                <span class="form__title">Подробное описание</span>
                <textarea class="form__textarea" id="detail-desc" rows="5" type="text" name="text" placeholder="|"></textarea>
              </label>
            </div>
          </div>
          <div class="form__control">
            <button class="btn btn-reset" type="reset" name="button" aria-label="Click RESET to not add ticket">Отмена</button>
            <button class="btn btn-submit" type="submit" name="button" aria-label="Click OK to add ticket">Ок</button>
          </div>
        </form>
      </div>
    `;
    this.container.append(popup);
    this.popup = popup;
  }

  addTicket() {
    this.renderForm();
    const title = this.popup.querySelector('.popup__title');
    title.textContent = 'Добавить тикет';
    this.btnReset();
  }

  editTicket(name, description) {
    this.renderForm();
    const title = this.popup.querySelector('.popup__title');
    title.textContent = 'Изменить тикет';
    const content = this.popup.querySelector('#short-desc');
    content.textContent = name;
    const desc = this.popup.querySelector('#detail-desc');
    desc.textContent = description;
    this.btnReset();
  }

  deleteTicket() {
    this.renderForm();
    const title = this.popup.querySelector('.popup__title');
    title.textContent = 'Удалить тикет';
    const content = this.popup.querySelector('.form__content');
    content.textContent = 'Вы уверены, что хотите удалить тикет? Это действие необратимо.';
    this.btnReset();
  }

  btnReset() {
    const resetBtn = this.popup.querySelector('.btn-reset');
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.popup.querySelector('.form').reset();
      this.popup.remove();
    });
  }
}

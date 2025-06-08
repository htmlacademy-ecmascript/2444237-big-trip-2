import AbstractView from '../framework/view/abstract-view.js';

const createFailedDataTemplate = () => {
    return (
        `<main class="page-body__page-main  page-main">
            <div class="page-body__container">
                <section class="trip-events">
                    <h2 class="visually-hidden">Trip events</h2>
                    <p class="trip-events__msg">Failed to load latest route information</p>
                </section>
            </div>
        </main>`
    );
}

class FailedDataView extends AbstractView {
    get template() {
        return createFailedDataTemplate();
    }
}

export default FailedDataView;
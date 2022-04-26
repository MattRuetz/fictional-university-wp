// OBJECT ORIENTED APPROACH FOR REFERENCE
import $ from 'jquery';

class Search {
    // 1. constructor to declare object class
    constructor() {
        this.addSearchHTML(); //append search modal to end of body
        this.resultsDiv = $('#search-overlay__results');
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.searchField = $('#search-term');
        this.isOverlayOpen = false;
        this.events();
        this.typingTimer;
        this.isSpinnerVisible = false;
        this.previousValue;
    }

    // 2. Events
    events() {
        // open/close modal+overlay events
        this.openButton.on('click', this.openOverlay.bind(this));
        this.closeButton.on('click', this.closeOverlay.bind(this));
        $(document).on('keydown', this.keyPressDispatcher.bind(this));

        // Searching real-time event
        this.searchField.on('keyup', this.typingLogic.bind(this));
    }

    // 3. Methods( Funtions / Actions )

    typingLogic() {
        if (this.searchField.val() != this.previousValue) {
            // Clear timer every keystoke in search
            clearTimeout(this.typingTimer);

            if (this.searchField.val()) {
                // have a value
                if (!this.isSpinnerVisible) {
                    this.resultsDiv.html('<div class="spinner-loader"></div>');
                    this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 750);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }
        }

        this.previousValue = this.searchField.val();
    }

    getResults() {
        $.getJSON(
            universityData.root_url +
                '/wp-json/wp/v2/posts?search=' +
                this.searchField.val(),
            (response) => {
                this.resultsDiv.html(`
                <h2 class="search-overlay__section-title">General Information</h2>
                ${
                    response.length === 0
                        ? `<p>No results. Try to search for something else.</p>`
                        : `<ul class="link-list min-list">
                    ${response
                        .map(
                            (post) =>
                                `<li>
                            <a href=${post.link}>${post.title.rendered}</a>
                        </li>`
                        )
                        .join('')}
                </ul>
                `
                }`);
                this.isSpinnerVisible = false;
            }
        );
    }

    keyPressDispatcher(e) {
        console.log(e.key);
        e.key === 's' &&
            !this.isOverlayOpen &&
            !$('input, textarea').is(':focus') && // if ANY input is active, DONT trigger modal
            this.openOverlay();

        e.keyCode == 27 && this.isOverlayOpen && this.closeOverlay();
    }

    openOverlay() {
        this.searchOverlay.addClass('search-overlay--active');
        $('body').addClass('body-no-scroll');
        setTimeout(() => this.searchField.trigger('focus'), 301);
        this.isOverlayOpen = true;
    }

    closeOverlay() {
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.searchField.val('');
        this.isOverlayOpen = false;
    }

    addSearchHTML() {
        $('body').append(`

    <div class="search-overlay">
        <div class="search-overlay__top">
            <div class="container">
                FOOTER.PHP
                <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term" autocomplete="off" />
                <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
            </div>
        </div>

        <div class="container">
            <div id="search-overlay__results">

            </div>
        </div>
    </div>
    `);
    }
}

export default Search;
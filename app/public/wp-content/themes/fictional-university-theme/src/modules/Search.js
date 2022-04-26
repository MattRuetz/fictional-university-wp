// OBJECT ORIENTED APPROACH FOR REFERENCE
import $ from 'jquery';

class Search {
    // 1. constructor to declare object class
    constructor() {
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
                this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }
        }

        this.previousValue = this.searchField.val();
    }

    getResults() {
        $.getJSON(
            'http://fictional-university.local/wp-json/wp/v2/posts?search=' +
                this.searchField.val(),
            (response) => {
                this.resultsDiv.html(`
                <h2 class="search-overlay__section-title">General Information</h2>
                <ul class="link-list min-list">
                    ${response
                        .map(
                            (post) =>
                                `<li>
                            <a href=${post.link}>${post.title.rendered}</a>
                        </li>`
                        )
                        .join('')}
                    
                </ul>
                `);
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
        this.isOverlayOpen = true;
    }

    closeOverlay() {
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.isOverlayOpen = false;
    }
}

export default Search;

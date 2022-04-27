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

    listGeneralInfoResults(results) {
        return `${
            results.generalInfo.length === 0
                ? `<p>No results. Try to search for something else.</p>`
                : `<ul class="link-list min-list">
                    ${results.generalInfo
                        .map(
                            (item) =>
                                `<li>
                            <a href=${item.permalink}>${item.title}</a> ${
                                    item.postType === 'post'
                                        ? `by ${item.authorName}`
                                        : ''
                                } 
                        </li>`
                        )
                        .join('')}
                </ul>
                `
        }`;
    }

    listProgramsResults(results) {
        return `${
            results.programs.length === 0
                ? `<p>No programs match this search. <a href="${universityData.root_url}/programs">View all programs</a></p>`
                : `<ul class="link-list min-list">
                    ${results.programs
                        .map(
                            (item) =>
                                `<li>
                            <a href=${item.permalink}>${item.title}</a>
                        </li>`
                        )
                        .join('')}
                </ul>
                `
        }`;
    }

    listProfessorsResults(results) {
        return `${
            results.professors.length === 0
                ? `<p>No professors match this search.</p>`
                : `<ul class="professor-cards">
                    ${results.professors
                        .map(
                            (item) =>
                                `<li class="professor-card__list-item">
                    <a class="professor-card" href="${item.permalink}">
                        <img class="professor-card__image" src="${item.image}" alt="Profile Image">
                        <span class="professor-card__name">${item.title}</span>
                    </a>
                </li>`
                        )
                        .join('')}
                </ul>
                `
        }`;
    }

    listCampusesResults(results) {
        return `${
            results.campuses.length === 0
                ? `<p>No campuses match this search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`
                : `<ul class="link-list min-list">
                    ${results.campuses
                        .map(
                            (item) =>
                                `<li>
                            <a href=${item.permalink}>${item.title}</a>
                        </li>`
                        )
                        .join('')}
                </ul>
                `
        }`;
    }

    listEventsResults(results) {
        return `${
            results.events.length === 0
                ? `<p>No events match this search. <a href="${universityData.root_url}/events">View all events</a></p>`
                : `<ul class="link-list min-list">
                    ${results.events
                        .map(
                            (item) =>
                                `<li>
                            <a href=${item.permalink}>${item.title}</a>
                        </li>`
                        )
                        .join('')}
                </ul>
                `
        }`;
    }

    getResults() {
        $.getJSON(
            universityData.root_url +
                '/wp-json/university/v1/search?term=' +
                this.searchField.val(),
            (results) => {
                this.resultsDiv.html(`
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General Information</h2>
                        ${this.listGeneralInfoResults(results)}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        ${this.listProgramsResults(results)}
                        <h2 class="search-overlay__section-title">Professors</h2>
                        ${this.listProfessorsResults(results)}
                    </div>
                        
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Campuses</h2>
                        ${this.listCampusesResults(results)}
                        <h2 class="search-overlay__section-title">Events</h2>
                        ${this.listEventsResults(results)}
                    </div>
                </div>
            `);

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
        this.resultsDiv.html('');
        this.isOverlayOpen = false;
    }

    addSearchHTML() {
        $('body').append(`
            <div class="search-overlay">
                <div class="search-overlay__top">
                    <div class="container">
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

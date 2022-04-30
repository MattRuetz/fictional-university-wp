import $ from 'jquery';

class Like {
    constructor() {
        this.events();
    }

    events() {
        $('.like-box').on('click', this.ourClickDispatcher.bind(this));
    }

    // methods
    ourClickDispatcher(e) {
        // Select element with class .like-box closest to the user's click target
        let currentLikeBox = $(e.target).closest('.like-box');

        if (currentLikeBox.data('exists') == 'yes') {
            this.deleteLike();
        } else {
            this.createLike();
        }
    }

    // Add a like from current user to professor page
    createLike() {
        $.ajax({
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'POST',
            success: (response) => console.log(response),
            error: (response) => console.log(response),
        });
    }

    // remove like previously given to prof by this user
    deleteLike() {
        $.ajax({
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'DELETE',
            success: (response) => console.log(response),
            error: (response) => console.log(response),
        });
    }
}

export default Like;

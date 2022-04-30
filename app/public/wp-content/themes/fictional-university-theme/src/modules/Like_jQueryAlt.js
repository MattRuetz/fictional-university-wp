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
        var currentLikeBox = $(e.target).closest('.like-box');

        if (currentLikeBox.attr('data-exists') == 'yes') {
            this.deleteLike(currentLikeBox);
        } else {
            this.createLike(currentLikeBox);
        }
    }

    // Add a like from current user to professor page
    createLike(currentLikeBox) {
        $.ajax({
            beforeSend: (xhr) => {
                //attach nonce to request (like session cookie)
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'POST',
            data: { professor_id: currentLikeBox.data('professor') },
            success: (response) => {
                currentLikeBox.attr('data-exists', 'yes');
                let likeCount = parseInt(
                    currentLikeBox.find('.like-count').html(),
                    10
                );
                likeCount++;
                currentLikeBox.find('.like-count').html(likeCount);

                currentLikeBox.attr('data-like', response);
            },
            error: (response) => console.log(response),
        });
    }

    // remove like previously given to prof by this user
    deleteLike(currentLikeBox) {
        $.ajax({
            beforeSend: (xhr) => {
                //attach nonce to request (like session cookie)
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/university/v1/manageLike',
            type: 'DELETE',
            data: { like: currentLikeBox.attr('data-like') },
            success: () => {
                currentLikeBox.attr('data-exists', 'no');
                let likeCount = parseInt(
                    currentLikeBox.find('.like-count').html(),
                    10
                );
                likeCount--;
                currentLikeBox.find('.like-count').html(likeCount);
                currentLikeBox.attr('data-like', '');
            },
            error: (response) => {
                console.log('ERROR');
                console.log(response);
            },
        });
    }
}

export default Like;

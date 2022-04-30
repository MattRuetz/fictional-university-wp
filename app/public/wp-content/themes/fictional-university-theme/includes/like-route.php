<?php

add_action('rest_api_init', 'universityLikeRoutes');

function universityLikeRoutes()
{
    // Post route middleware
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => "POST",
        'callback' => 'createLike'
    ));

    // Delete route middleware
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => "DELETE",
        'callback' => 'deleteLike'
    ));
}


function createLike($data)
{
    // Method 1
    // if(current_user_can('')) {

    // }

    // MEhtod 2
    if (is_user_logged_in()) {
        $professor = sanitize_text_field($data['professor_id']);


        $existQuery = new WP_Query(array(
            'author' => get_current_user_id(),
            'post_type' => 'like',
            'meta_query' => array(
                array(
                    'key' => 'liked_professor_id',
                    'compare' => '=',
                    'value' => $professor
                )
            )
        ));

        if ($existQuery->found_posts == 0 and get_post_type($professor) == 'professor') {
            // no like exists -> create like post
            return wp_insert_post(array(
                'post_type' => 'like',
                'post_status' => 'publish',
                'post_title' => '2ndTest',
                'meta_input' => array(
                    'liked_professor_id' => $professor
                )
            )); // will return post ID of new 'like'
        } else {
            die('Invalid professor ID');
        }
    } else {
        die('Only logged-in users can leave a <3.');
    }
}

function deleteLike($data)
{
    $likeId = sanitize_text_field($data['like']);

    // only allow deleteLike if this post has a like who's post_author == cur user's ID
    if (
        get_current_user_id() == get_post_field('post_author', $likeId) and get_post_type($likeId) == 'like'
    ) {
        wp_delete_post($likeId, true);
        return "Like deleted";
    } else {
        die('You cannot unlike if you have never liked!');
    }
}

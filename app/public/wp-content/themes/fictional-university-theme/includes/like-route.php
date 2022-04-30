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


function createLike()
{
    return 'creating...';
}

function deleteLike()
{
    return 'deleting...';
}

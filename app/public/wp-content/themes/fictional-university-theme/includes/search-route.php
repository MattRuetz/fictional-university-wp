<?php

function universityRegisterRoute()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE, //safer than 'GET'
        'callback' => 'universitySearchResults'
    ));
}

add_action('rest_api_init', 'universityRegisterRoute');


function universitySearchResults()
{

    return 'ROUTE CREATED!';
}

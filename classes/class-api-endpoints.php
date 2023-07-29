<?php

// API endpoint for getting all password titles
add_action('rest_api_init', function () {
    // Register the REST API route for getting all movies
    register_rest_route('passwordmanager/v1', '/passwords/', array(
        'methods' => 'GET',
        'callback' => 'password_mananger_list_get_callback',
        'permission_callback' => 'password_mananger_is_user_valid'
    ));
});

// API endpoint for getting a single ppassword by its ID
add_action('rest_api_init', function () {
    // Register the REST API route for getting a single passwords by ID
    register_rest_route('passwordmanager/v1', '/password/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'password_mananger_get_single_password_callback',
        'permission_callback' => 'password_mananger_is_user_valid',
    ));
});

// API endpoint for creating a new passwoord
add_action('rest_api_init', function () {
    // Register the REST API route for creating a new passwords
    register_rest_route('passwordmanager/v1', '/add-password', array(
        'methods' => 'POST',
        'callback' => 'password_mananger_add_password_callback',
        'permission_callback' => 'password_mananger_is_user_valid',
    ));
});

// API endpoint for deleting a passwords
add_action('rest_api_init', function () {
    // Register the REST API route for deleting a passwords by ID
    register_rest_route('passwordmanager/v1', '/remove-password/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'password_mananger_remove_password_callback',
        'permission_callback' => 'password_mananger_is_user_valid',
    ));
});


// Get all password from the 'password' custom post type
function password_mananger_list_get_callback($request)
{

    // Retrieve all published passwords with specific fields
    $password_list = get_posts(array(
        'post_type' => 'passwords',
        'post_status' => 'publish',
        'fields' => 'ids', // Retrieve only IDs to reduce memory usage
        'numberposts' => -1, // Retrieve all posts
    ));

    wp_reset_postdata();

    $response = array();

    // Prepare the API response
    if (count($password_list) > 0) {
        $password_data = array();
        foreach ($password_list as $password_id) {
            $password = get_post($password_id);
            $password_data[] = array(
                'id' => $password->ID,
                'title' => $password->post_title,
                'created' => $password->post_date,
                'modified' => $password->post_modified,
            );
        }

        $response['status'] = 200;
        $response['success'] = true;
        $response['data'] = $password_data;
    } else {
        $response['status'] = 200;
        $response['success'] = false;
        $response['message'] = 'NO PASSWORDS AVAILABLE';
    }

    return new WP_REST_Response($response);
}

// Get a single password from the 'password' custom post type by its ID
function password_mananger_get_single_password_callback($request)
{
    $id = $request->get_param('id');

    if (!empty($id)) {
        // Retrieve the password post by its ID
        $password = get_post($id);

        if ($password && $password->post_type === 'passwords') {


            $password_data[] = array(
                'id' => $password->ID,
                'title' => $password->post_title,
                'content' => $password->post_content,
                'username' => get_post_meta($id, 'username', true),
                'site_password' => get_post_meta($id, 'site_password', true),
                'created' => $password->post_date,
                'modified' => $password->post_modified,
            );


            // If the post is a passwords and found, return its data
            $response['status'] = 200;
            $response['success'] = true;
            $response['data'] = $password_data;
        } else {
            // If the post is not found or not a passwords, return an error message
            $response['status'] = 404;
            $response['success'] = false;
            $response['message'] = 'Password not found';
        }
    } else {
        // If no 'id' parameter provided, return an error message
        $response['status'] = 400;
        $response['success'] = false;
        $response['message'] = 'Password ID parameter is missing';
    }

    return new WP_REST_Response($response);
}


// Callback function for the REST API endpoint
function password_mananger_add_password_callback($request)
{
    $parameters = $request->get_params();

    // Perform necessary validation on the incoming data
    // For example, check if required fields are provided

    // Create a new post
    $post_id = wp_insert_post(array(
        'post_title' => sanitize_text_field($parameters['title']),
        'post_content' => wp_kses_post($parameters['content']),
        'post_status' => 'publish',
        'post_type' => 'passwords', // Set the post type, e.g., 'post', 'page', or a custom post type
        'meta_input' => array(
            'username' => sanitize_text_field($parameters['username']),
            'site_password' => sanitize_text_field($parameters['site_password']),
        ),
    ));

    if (!is_wp_error($post_id)) {
        // If the post is created successfully, retrieve the saved post meta fields
        $username = get_post_meta($post_id, 'username', true);
        $site_password = get_post_meta($post_id, 'site_password', true);

        // Prepare the response data
        $response['status'] = 201;
        $response['success'] = true;
        $response['message'] = 'Password added successfully';
        $response['post_id'] = $post_id;
        $response['title'] = sanitize_text_field($parameters['title']);
        $response['content'] = wp_kses_post($parameters['content']);
        $response['username'] = $username;
        $response['site_password'] = $site_password;
    } else {
        // If there's an error creating the post, return an error message
        $response['status'] = 500;
        $response['success'] = false;
        $response['message'] = 'Error adding the password';
    }

    return new WP_REST_Response($response);
}


// Callback function for the REST API endpoint
function password_mananger_remove_password_callback($request)
{
    $id = $request->get_param('id');

    if (!empty($id)) {
        // Check if the post exists and its type
        $post = get_post($id);
        if ($post && $post->post_type === 'passwords') {
            // Delete the post and associated post meta data
            $result = wp_delete_post($id, true); // Set the second parameter to true to force delete the post and its meta data

            if ($result) {
                // If the post is deleted successfully, return success message
                $response['status'] = 200;
                $response['success'] = true;
                $response['message'] = 'Password deleted successfully';
            } else {
                // If there's an error deleting the post, return an error message
                $response['status'] = 500;
                $response['success'] = false;
                $response['message'] = 'Error deleting the post';
            }
        } else {
            // If the post is not found or not a 'passwords' type, return an error message
            $response['status'] = 404;
            $response['success'] = false;
            $response['message'] = 'Password not found';
        }
    } else {
        // If no 'id' parameter provided, return an error message
        $response['status'] = 400;
        $response['success'] = false;
        $response['message'] = 'Password ID parameter is missing';
    }

    return new WP_REST_Response($response);
}

function password_mananger_is_user_valid()
{
    // check above image for api call
    if (is_user_logged_in()) {
        return true;
    }
    return false;
}

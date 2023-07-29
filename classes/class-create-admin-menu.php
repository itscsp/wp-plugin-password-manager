<?php

/**
 * This file will create admin menu page.
 */


class WPPM_Create_Admin_Page
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'create_admin_menu']);
        add_action('init', [$this, 'create_meta_data']);
        add_action('admin_enqueue_scripts', [$this, 'pass_user_id']);
        add_action('init', [$this, 'create_custom_post_type']);
    }

    public function create_admin_menu()
    {
        $capability = 'manage_options';
        $slug = 'password-manager';

        add_menu_page(
            'Passwords',
            'Passwords',
            $capability,
            $slug,
            [$this, 'password_manager_template'],
            'dashicons-lock'
        );
    }

    public function pass_user_id()
    {
        // Pass data to the JavaScript file using wp_localize_script.
        wp_localize_script('my-password_manager', 'localized_data', array(
            'root_url' => get_site_url(),
            'current_user_id' => get_current_user_id(),
            'nonce' => wp_create_nonce('wp_rest'),
        ));
    }

    public function create_meta_data()
    {
        register_meta(
            'user',
            'master_password',
            array(
                'show_in_rest' => true,
                'single' => true,
                'type' => 'string',
            )
        );
    }

    public function create_custom_post_type()
    {

        /**
         * Register a Passwords custom post type
         */
        register_post_type(
            'passwords',
            array(
                'labels'       => array(
                    'name'          => __('Passwords'),
                    'singular_name' => __('Password')
                ),
                'public'             => true, // Hides the post type from the frontend
                'show_ui'            => true, // Hides the post type from the admin UI
                'exclude_from_search' => true, // Hides the post type from search
                'show_in_rest' => false,
                'supports'     => array(
                    'title',
                    'editor',
                    'thumbnail',
                    'excerpt',
                    'custom-fields',
                    'revisions',
                ),
                'taxonomies'   => array(
                    'category',
                    'post_tag',
                ),
            )
        );

        // Add custom field for username
        register_rest_field(
            'passwords',
            'username',
            array(
                'get_callback'    => 'get_custom_username',
                'update_callback' => 'update_custom_usernam',
                'schema'          => null,
            )
        );

        function get_custom_username($passwords)
        {
            return get_post_meta($passwords['id'], 'username', true);
        }

        function update_custom_usernam($value, $passwords)
        {
            return update_post_meta($passwords->ID, 'username', $value);
        }

        // Add custom field for password
        register_rest_field(
            'passwords',
            'site_password',
            array(
                'get_callback'    => 'get_custom_password',
                'update_callback' => 'update_custom_password',
                'schema'          => null,
            )
        );

        function get_custom_password($passwords)
        {
            return get_post_meta($passwords['id'], 'site_password', true);
        }

        function update_custom_password($value, $passwords)
        {
            return update_post_meta($passwords->ID, 'site_password', $value);
        }
    }

    //Force notes posts to be private




    public function password_manager_template()
    {
        echo '<div class="wrap">';
        echo '<div id="root"></div>';
        echo '</div>';
    }
}
new WPPM_Create_Admin_Page();

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
        add_action('admin_enqueue_scripts',[$this, 'pass_user_id'] );
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
            'current_user_id' => get_current_user_id()
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

    public function password_manager_template()
    {
        echo '<div class="wrap">';
        echo '<div id="root"></div>';
        echo '</div>';
    }
}
new WPPM_Create_Admin_Page();

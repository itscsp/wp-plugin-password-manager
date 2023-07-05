<?php
/**
 * This file will create admin menu page.
 */

 
class WPPM_Create_Admin_Page {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'create_admin_menu' ] );
    }

    public function create_admin_menu() {
        $capability = 'manage_options';
        $slug = 'password-manager';

        add_menu_page(
            'Passwords',
            'Passwords',
            $capability,
            $slug,
            [ $this, 'password_manager_template' ],
            'dashicons-lock'
        );
    }

    public function password_manager_template() {
        echo '<div class="wrap">';
        echo '<h1>Password Manager</h1>';
        insert_data_form();
        show_data();
        echo '<div id="root"></div>';
        echo '</div>';
    }

}
new WPPM_Create_Admin_Page();
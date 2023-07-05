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
        global $wpdb;
$table_name = $wpdb->prefix . TABLE_PREFIX . 'masterpassword';

$current_user = wp_get_current_user();
$user_login = $current_user->user_login; // Replace with the desired user login

$query = $wpdb->prepare(
    "SELECT wp_users.* FROM $table_name
    INNER JOIN wp_users ON $table_name.user_login = wp_users.user_login
    WHERE $table_name.user_login = %s",
    $user_login
);
$results = $wpdb->get_results($query);

if ($results) {
    foreach ($results as $result) {
        // Access the user details
        $user_id = $result->ID;
        $user_login = $result->user_login;
        $user_email = $result->user_email;
        // Add other user fields you want to retrieve

        // Do something with the user details
        echo "User ID: $user_id<br>";
        echo "User Login: $user_login<br>";
        echo "User Email: $user_email<br>";
        // Output other user fields
    }
} else {
    echo "No user found with the given user login.";
}

        echo '<div id="root"></div>';
        echo '</div>';
    }

}
new WPPM_Create_Admin_Page();
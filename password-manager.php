<?php
/**
 * Plugin Name: Password Manager
 * Description: Password Manager is manager your password.
 */

// Enqueue the bundled JavaScript file
function my_plugin_enqueue_scripts() {
  wp_enqueue_script('my-plugin', plugins_url('dist/bundle.js', __FILE__), array(), '1.0.0', true);

   wp_localize_script('my-plugin', 'myPluginData', array(
    'root_url' => get_site_url(),
    'nonce' => wp_create_nonce('wp_rest')
  ));
}
add_action('admin_enqueue_scripts', 'my_plugin_enqueue_scripts');

// Create a menu item in the admin dashboard
function my_plugin_menu() {
  add_menu_page(
    'Manager',
    'Manager',
    'manage_options',
    'password-manager',
    'my_plugin_page_callback',
    'dashicons-admin-network',
    99
  );
}
add_action('admin_menu', 'my_plugin_menu');

// Callback function to display the plugin page
function my_plugin_page_callback() {
  echo '<div class="wrap">';
  echo '<h1>Password Manager</h1>';
  echo '<div id="root"></div>';
  echo '</div>';
}


function my_plugin_alter_user_table() {
  global $wpdb;
  $table_name = $wpdb->prefix . 'users';
  $column_name = 'master_password';
  $column_type = 'VARCHAR(255)';
  $wpdb->query("ALTER TABLE $table_name ADD $column_name $column_type");
}

register_activation_hook(__FILE__, 'my_plugin_alter_user_table');

<?php

/**
 * Plugin Name: Password Manager
 * Description: Password Manager is manager your password.
 */

if (!defined('ABSPATH')) : exit();
endif; // No direct access allowed.


/**
 * Define Plugins Contants
 */
define('WPRK_PATH', trailingslashit(plugin_dir_path(__FILE__)));
define('WPRK_URL', trailingslashit(plugins_url('/', __FILE__)));


// Enqueue the bundled JavaScript file
function my_plugin_enqueue_scripts()
{
  wp_enqueue_script('my-password_manager', plugins_url('dist/bundle.js', __FILE__), array('wp-api'), time(), true);

}
add_action('admin_enqueue_scripts', 'my_plugin_enqueue_scripts');



// Create a menu item in the admin dashboard
require_once WPRK_PATH . 'classes/class-create-admin-menu.php';
require_once WPRK_PATH . 'classes/class-create-tables.php';
require_once WPRK_PATH . 'classes/class-api-endpoints.php';


/* Now every time data insert into tables*/

<?php

// Define your custom table prefix
define('TABLE_PREFIX', 'csp_');

// Define the BraProductImporter class
class CustomTables
{
    private $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->table_name = $wpdb->prefix . TABLE_PREFIX . 'masterpassword'; // Replace with your table name
    }

    // Create the custom table during plugin activation
    public function create_custom_table()
    {
        global $wpdb;


        // Check if the table already exists
        if ($wpdb->get_var("SHOW TABLES LIKE '$this->table_name'") !== $this->table_name) {
            // Define the SQL query to create the table
            $sql = "CREATE TABLE $this->table_name (
            id INT(11) NOT NULL AUTO_INCREMENT,
            user_login VARCHAR(60) NOT NULL,
            master_password VARCHAR(255) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (user_login) REFERENCES {$wpdb->prefix}users(user_login)
        );";

            // Execute the query
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }
    }
}

// Create an instance of the Fitiq_CustomTables class
$passwordmanager_tables = new CustomTables();

// Register hooks and callbacks
register_activation_hook(__FILE__, array($passwordmanager_tables, 'create_custom_table'));

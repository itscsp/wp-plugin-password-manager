<?php
/**
 * Insert Data Form
 */
function insert_data_form() {
    $current_user = wp_get_current_user();
    $default_user_login = $current_user->user_login;
    ?>
    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <input type="hidden" name="action" value="insert_data">
        <label for="user_login">User Login:</label>
        <input type="text" name="user_login" value="<?php echo esc_attr($default_user_login); ?>" required><br>
        <label for="master_password">Master Password:</label>
        <input type="password" name="master_password" required><br>
        <input type="submit" value="Insert Data">
    </form>
    <?php
}

/**
 * Handle the form submission and insert the data
 */
function handle_insert_data() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'insert_data') {
        global $wpdb;
        $table_name = $wpdb->prefix . TABLE_PREFIX . 'masterpassword';

        // Get the submitted form data
        $user_login = sanitize_text_field($_POST['user_login']);
        $master_password = sanitize_text_field($_POST['master_password']);

        // Insert data into the table
        $result = $wpdb->insert(
            $table_name,
            array(
                'user_login' => $user_login,
                'master_password' => $master_password
            ),
            array('%s', '%s')
        );

        if ($result !== false) {
            echo 'Data inserted successfully.';
        } else {
            echo 'Failed to insert data.';
        }
    }
}

add_action('admin_post_insert_data', 'handle_insert_data');

<?php

/*
  Plugin Name: Attention Quiz
  Description: Test your readers.
  Version: 1.0
  Author: Matt
  Author URI: https://mattruetz.com
*/

if (!defined('ABSPATH')) exit;

class AreYouPayingAttention
{
    function __construct()
    {
        add_action('init', array($this, 'adminAssets'));
    }

    function adminAssets()
    {
        wp_register_style('quizeditcss', plugin_dir_url(__FILE__) . 'build/index.css');
        wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type('outplugin/are-you-paying-attention', array(
            'editor_script' => 'ournewblocktype',
            'editor_style' => 'quizeditcss',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    function theHTML($attributes)
    {
        // METHOD ONE
        // return '<p>The sky is ' . $attributes['skyColor'] . ' and the grass is ' . $attributes['grassColor'] . '!!!</p>';

        if (!is_admin()) { //DONT run the frontend script in Admin
            wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
            wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
        }

        // METHOD TWO
        ob_start(); //output buffer start
?>
        <div class="paying-attention-update-me">
            <pre style='display: none;'><?php echo wp_json_encode($attributes) ?></pre>
        </div>
<?php return ob_get_clean(); //clear buffer and return contents
    }
}

$areYouPayingAttention = new AreYouPayingAttention();

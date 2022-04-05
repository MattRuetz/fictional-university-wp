ARCHIVE-EVENT.PHP

<?php
get_header();
pageBanner(array(
    'title' => 'All Events',
    'subtitle' => "See what fun events are coming up!"
));
?>


<div class="container container--narrow page-section">

    <?php
    while (have_posts()) {
        the_post();
        // pull in PHP from: template-parts/content-event.php
        get_template_part('template-parts/content-event');
    }

    echo paginate_links()
    ?>
    <hr class="section-break">
    <p>Looking for past events> <a href="<?php echo site_url('/past-events') ?>">Check the Past Events Archive</a></p>
</div>

<?php get_footer(); ?>
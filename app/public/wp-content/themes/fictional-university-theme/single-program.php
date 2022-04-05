SINGLE-PROGRAM.PHP
<!-- Page for a specific event post -->
<?php
get_header();

while (have_posts()) {
    the_post();
    pageBanner();
?>
    <div class="container container--narrow page-section">

        <div class="generic-content"><?php the_content() ?></div>


        <?php // Query for list of professors related to this program
        $relatedProfessors = new WP_Query(array(
            'posts_per_page' => -1,
            'post_type' => 'professor',
            'orderby' => 'title',
            'order' => 'ASC',
            'meta_query' => array(
                array(
                    'key' => 'related_programs',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"'
                ) //query for EVENTS with THIS as a related program
            )
        ));

        if ($relatedProfessors->have_posts()) {

            echo '<hr class="section-break">';
            echo '<h2 class="headline headline--medium">' . get_the_title() . ' Professor(s)</h2>';

            echo '<ul>';

            while ($relatedProfessors->have_posts()) {
                $relatedProfessors->the_post(); ?>

                <li class="professor-card__list-item">
                    <a class="professor-card" href="<?php the_permalink(); ?>">
                        <img class="professor-card__image" src="<?php the_post_thumbnail_url('professorLandscape') ?>" alt="Profile Image">
                        <span class="professor-card__name"><?php the_title(); ?></span>
                    </a>
                </li>

        <?php
            }

            echo '</ul>';
        }
        wp_reset_postdata(); // Reset to URL post query

        $today = date('Ymd');

        // Query for list of EVENTS related to this program
        $homepageEvents = new WP_Query(array(
            'posts_per_page' => 2,
            'post_type' => 'event',
            'orderby' => 'meta_value_num',
            'meta_key' => 'event_date',
            'order' => 'ASC',
            'meta_query' => array(
                array(
                    'key' => 'event_date',
                    'compare' => '>=',
                    'value' => $today,
                    'type' => 'numeric'
                ),
                array(
                    'key' => 'related_programs',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"'
                ) //query for EVENTS with THIS as a related program
            )
        ));

        if ($homepageEvents->have_posts()) {

            echo '<hr class="section-break">';
            echo '<h2 class="headline headline--medium">Upcoming ' . get_the_title() . ' Events</h2>';

            while ($homepageEvents->have_posts()) {
                $homepageEvents->the_post();
                // pull in PHP from: template-parts/content-event.php
                get_template_part('template-parts/content-event');
            }
        }
        wp_reset_postdata();
        ?>

        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program') ?>"><i class="fa fa-home" aria-hidden="true"></i> All Programs</a> <span class="metabox__main"><?php the_title() ?></span>
            </p>
        </div>
    </div>

<?php
}
get_footer();
?>
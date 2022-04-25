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

        <?php $mapLocation = get_field('map_location'); ?>

        <div class="acf-map">
            <div class="marker" data-lat="<?php echo $mapLocation['lat'] ?>" data-lng="<?php echo $mapLocation['lng'] ?>">
                <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                <?php echo $mapLocation['address']; ?>
            </div>
        </div>

        <?php // Query for list of professors related to this program
        $relatedPrograms = new WP_Query(array(
            'posts_per_page' => -1,
            'post_type' => 'program',
            'orderby' => 'title',
            'order' => 'ASC',
            'meta_query' => array(
                array(
                    'key' => 'related_campus',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"'
                ) //query for EVENTS with THIS as a related program
            )
        ));

        if ($relatedPrograms->have_posts()) {

            echo '<hr class="section-break">';
            echo '<h2 class="headline headline--medium">Programs At This Campus</h2>';

            echo '<ul class="min-list link-list">';

            while ($relatedPrograms->have_posts()) {
                $relatedPrograms->the_post(); ?>

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
        ?>

        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program') ?>"><i class="fa fa-home" aria-hidden="true"></i> All Campuses</a> <span class="metabox__main"><?php the_title() ?></span>
            </p>
        </div>
    </div>

<?php
}
get_footer();
?>
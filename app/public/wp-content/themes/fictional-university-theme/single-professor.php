SINGLE-PROFESSOR.PHP
<!-- Page for a specific professor post -->
<?php
get_header();

while (have_posts()) {
    the_post();
    pageBanner(array(
        'title' => 'Title from SINGLE-PROFESSOR.php',
        'subtitle' => 'Subtitle from SINGLE-PROFESSOR.php',
        'photo' => 'https://cdn.pixabay.com/photo/2014/12/03/12/21/monk-555391_1280.jpg'
    ));
?>



    <div class="container container--narrow page-section">

        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('event') ?>"><i class="fa fa-home" aria-hidden="true"></i> Events Home</a> <span class="metabox__main"><?php the_title() ?></span>
            </p>
        </div>

        <div class="generic-content">
            <div class="row group">
                <div class="one-third">
                    <?php the_post_thumbnail('professorPortrait') ?>
                </div>

                <div class="two-thirds">
                    <?php the_content() ?>
                </div>
            </div>
        </div>

        <?php
        $relatedPrograms = get_field('related_programs');

        if ($relatedPrograms) {
            echo '<hr class="section-break">';
            echo '<h2 class="headline headline--medium">Subject(s) Taught</h2>';
            echo '<ul class="link-list min-list">';

            foreach ($relatedPrograms as $program) {
        ?>
                <li><a href="<?php echo get_the_permalink($program); ?>"> <?php echo get_the_title($program) ?></a></li>
        <?php
            }
            echo '</ul>';
        }
        ?>

    </div>

<?php
}

get_footer();
?>
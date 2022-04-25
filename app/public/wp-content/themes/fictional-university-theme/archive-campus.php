ARCHIVE-PROGRAM.PHP

<?php
get_header();
pageBanner(array(
    'title' => 'Our Campuses',
    'subtitle' => "You will feel right at home!"
));
?>

<div class="container container--narrow page-section">

    <div class="acf-map">

        <ul class="link-list min-list">
            <?php
            while (have_posts()) {
                the_post();
                $mapLocation = get_field('map_location');
            ?>
                <div class="marker" data-lat="<?php echo $mapLocation['lat'] ?>" data-lng="<?php echo $mapLocation['lng'] ?>">
                    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <?php echo $mapLocation['address']; ?>
                </div>
            <?php
            }
            ?>
    </div>
</div>

<?php get_footer(); ?>
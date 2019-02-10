<?php
/**
 * Created by PhpStorm.
 * User: costantinos
 * Date: 9/7/2018
 * Time: 12:28 PM
 */

$i = 1;

//$images = glob('./images/*.*') ;
$DirFoto ='./images/';

if ( $handle = opendir($DirFoto) ) {

    $images = array(); # empty data structure
    while (($file = readdir($handle)) !== false) {
        if ($file == '..' || $file == '.' || is_dir($file))
            continue;
        # only for images
        $exif = exif_read_data("$DirFoto/$file", 0, true);
        $date = $exif['IFD0']['DateTime']; # everything you like to be ordered
        $images["$DirFoto/$file"] = $date; # associate each file to its date
    }
    asort($images); # sort the structure by date
}

//array_multisort(
//    array_map( 'getExifDate', $images ),
//    SORT_NUMERIC,
//    SORT_ASC,
//    $images
//);

foreach ($images as $filename => $fileDate) {
    // example usage
    try {
        generateThumbnail($filename, 210, 144, 70);
    } catch (ImagickException $e) {
        echo $e->getMessage();
    } catch (Exception $e) {
        echo $e->getMessage();
    }

       echo '<a class="lightboxgallery-gallery-item" target="_blank" href="https://hdms18.cs.ucy.ac.cy/' . $filename . '" data-title="HDMS 2018" data-alt="HDMS 2018" data-desc="HDMS 2018">
                                    <div>
                                        <img src="https://hdms18.cs.ucy.ac.cy/thumbs/' . $filename . '" title="HDMS 2018" alt="hdms2018">
                                        <div class="lightboxgallery-gallery-item-content">
                                        '.$fileDate.'
                                        </div>
                                    </div>
                                </a>';
    $i++;
}

function generateThumbnail($img, $width, $height, $quality = 70)
{
    if (file_exists('./thumbs/' . $img))
    return;
    if (is_file($img)) {
        $imagick = new Imagick(realpath($img));
        $imagick->setImageCompression(Imagick::COMPRESSION_JPEG);
        $imagick->setImageCompressionQuality($quality);
        $imagick->setImageFormat('jpeg');
        $imagick->stripImage();
        $imagick->thumbnailImage($width, $height, false, false);
        if (!$imagick->writeImage('./thumbs/' . $img)) {
            throw new Exception("Could not put contents. [./thumbs/{$img}]");
        }
        return true;
    } else {
        throw new Exception("No valid image provided with {$img}.");
    }
}


?>



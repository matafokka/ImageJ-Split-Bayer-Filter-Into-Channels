# ImageJ-Split-Bayer-Filter-To-Channels
This script determines pattern of Bayer filter and splits image into channels.

To install the script, put the .js file into /plugins/Scripts/Plugins/ directory or wherever it can be ran inside the ImageJ.
Works only with Bayer filter, but can be used to split any image with 2x2 pattern.

P.S. Thanks to @ Rasband, Wayne (NIH/NIMH) [E] for algorithm of creating images (I would spend much more time on reading bad API documentation):
http://imagej.1557.x6.nabble.com/Splitting-raw-bayer-image-into-four-separate-color-plane-images-R-G1-G2-B-fixed-attached-images-tp3683144p3683145.html

And thats why this script is written in JavaScript.

P.P.S. I'm against using such tools as JS or HTML for developing desktop application (You've got Qt and GTK!!!), but considering translation every script to Java, bad documentation and my laziness, usage of JS will make no difference in terms of performance.

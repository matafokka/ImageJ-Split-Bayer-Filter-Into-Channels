importClass(Packages.ij.IJ);
importClass(Packages.ij.ImagePlus);

// Get image
imp = IJ.getImage();
ip = imp.getProcessor();
// Get width and height of an image
w = ip.getWidth();
h = ip.getHeight();
// Position of colors
// GX
// XG
var greenLR = 0;
// XG
// GX
var greenRL = 0;
// RX
// XB
var RB_LR = 0;
// BX
// XR
var BR_LR = 0;
// XR
// BX
var RB_RL = 0;
// XB
// RX
var BR_RL = 0;

// First, we determine position of green subpixels,
// they should have almost the same value.
// Let's say, difference shouldn't be higher than 5.
var gDif = 5;
// Second, we determine where are red and blue channels.
// Blue color is almost always darker than red.
// BTW, red is darker than green.
// Differebce should be higher than 20 (r - b)
var rbDif = 20;

IJ.log("Detecting type of Bayer pattern, please, wait...");
for(var y = 0; y < h; y += 2)
{
    for(var x = 0; x < w; x += 2)
    {
        // Determine green
        if( Math.abs(ip.getPixel(x, y) - ip.getPixel(x + 1, y + 1)) <= gDif ) greenLR += 1;
        else if( Math.abs(ip.getPixel(x, y + 1) - ip.getPixel(x + 1, y)) <= gDif ) greenRL += 1;
        // Determine blue and red
        if(ip.getPixel(x, y) - ip.getPixel(x + 1, y + 1) >= rbDif) RB_LR += 1;
        else if(ip.getPixel(x + 1, y + 1) - ip.getPixel(x, y) >= rbDif) BR_LR += 1;
        else if(ip.getPixel(x + 1, y) - ip.getPixel(x, y + 1) >= rbDif) RB_RL += 1;
        else if(ip.getPixel(x, y + 1) - ip.getPixel(x + 1, y) >= rbDif) BR_RL += 1;
    }
}

// Compare results and call function with appropriate arguments
// Vars with file names
var green1 = "Green 1";
var green2 = "Green 2";
var red = "Red";
var blue = "Blue";

IJ.log("\\Update:Detected Bayer pattern:")
if(greenLR > greenRL)
{
    split(ip, green1, 0, 0);
    split(ip, green2, 1, 1);
    // GR
    // BG
    if(RB_RL > BR_RL)
    {
    	IJ.log("GR\nBG");
        split(ip, red, 1, 0);
        split(ip, blue, 0, 1);
    }
    // GB
    // RG
    else
    {
    	IJ.log("GB\nRG");
        split(ip, blue, 1, 0);
        split(ip, red, 0, 1);
    }
}
else
{
    split(ip, green2, 0, 1);
    split(ip, green1, 1, 0);
    // RG
    // GB
    if(RB_LR > BR_LR)
    {
    	IJ.log("RG\nGB");
        split(ip, red, 0, 0);
        split(ip, blue, 1, 1);
    }
    // BG
    // GR
    else
    {
    	IJ.log("BG\nGR");
        split(ip, blue, 0, 0);
        split(ip, red, 1, 1);
    }
}

// Thanks to @ Rasband, Wayne (NIH/NIMH) [E] for this algorithm:
// http://imagej.1557.x6.nabble.com/Splitting-raw-bayer-image-into-four-separate-color-plane-images-R-G1-G2-B-fixed-attached-images-tp3683144p3683145.html

function split(ip, name, xstart, ystart) 
{
    var imp2 = IJ.createImage(name, ip.getBitDepth + "-bit", w / 2, h / 2, 1);
    var ip2 = imp2.getProcessor();
    var i = 0;
    for (var y = ystart; y < h; y += 2)
    {
        for (var x = xstart; x < w; x += 2)
        {
            ip2.set(i++, ip.get(x, y));
        }
    }
    ip2.resetMinAndMax();
    imp2.show();
}

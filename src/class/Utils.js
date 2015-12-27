class Utils {

    static KelvinToRgb(kelvin){
    	kelvin = kelvin / 100;
      let red,green,blue;

    	if (kelvin <= 66){
    		red = 255;
    	} else {
    		red = 329.698727466 * Math.pow(kelvin - 60, -0.1332047592);
    	}

    	if (kelvin <= 66){
    		green = 99.4708025861 * Math.log(kelvin) - 161.1195681661;
    	} else {
    		green = 288.1221695283 * Math.pow(kelvin - 60, -0.0755148492);
    	}

    	if (kelvin >= 66){
    		blue = 255;
    	} else {
    		if (kelvin <= 19){
    			blue = 0;
    		} else {
    			blue = 138.5177312231 * Math.log(kelvin - 10) - 305.0447927307;
    		}
    	}

      red = red < 0 ? 0 : red > 255 ? 255 : red;
      green = green < 0 ? 0 : green > 255 ? 255 : green;
      blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;

    	return [Math.round(red),Math.round(green),Math.round(blue)];
    }
}

export default Utils;

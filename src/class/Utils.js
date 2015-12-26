class Utils {

    static KelvinToRgb(kelvin){
    	kelvin = kelvin / 100;
      let Red,Green,Blue;

    	if (kelvin <= 66){
    		Red = 255;
    	} else {
    		Red = kelvin - 60;
    		Red = 329.698727466 * Math.pow(Red, -0.1332047592);
    		if (Red < 0){
    			Red = 0;
    		}
    		if (Red > 255){
    			Red = 255;
    		}
    	}

    	if (kelvin <= 66){
    		Green = kelvin;
    		Green = 99.4708025861 * Math.log(Green) - 161.1195681661;
    		if (Green < 0 ) {
    			Green = 0;
    		}
    		if (Green > 255) {
    			Green = 255;
    		}
    	} else {
    		Green = kelvin - 60;
    		Green = 288.1221695283 * Math.pow(Green, -0.0755148492);
    		if (Green < 0 ) {
    			Green = 0;
    		}
    		if (Green > 255) {
    			Green = 255;
    		}
    	}

    	if (kelvin >= 66){
    		Blue = 255;
    	} else {
    		if (kelvin <= 19){
    			Blue = 0;
    		} else {
    			Blue = kelvin - 10;
    			Blue = 138.5177312231 * Math.log(Blue) - 305.0447927307;
    			if (Blue < 0){
    				Blue = 0;
    			}
    			if (Blue > 255){
    				Blue = 255;
    			}
    		}
    	}

    	return [Math.round(Red),Math.round(Green),Math.round(Blue)];
    }
}

export default Utils;

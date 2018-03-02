function setColor(picker,toplimit){
	IR.AddListener(IR.EVENT_ITEM_PRESS,picker, function ()
	{
		var color = picker.PickColor;
		   
		var R = (color >> 24) & 0xFF;
		var G = (color >> 16) & 0xFF;
		var B = (color >> 8)  & 0xFF;
		if (toplimit == '100') {
				driver.Send(['SET 0x01040005' + ' ' + R * (100 / 255),0x0D,0x0A]);
				driver.Send(['SET 0x01040006' + ' ' + G * (100 / 255),0x0D,0x0A]);
				driver.Send(['SET 0x01040007' + ' ' + B * (100 / 255),0x0D,0x0A]);
		  // device.Set(R_feed, R * (100 / 255)); 
		  // device.Set(G_feed, G * (100 / 255));
		  // device.Set(B_feed, B * (100 / 255));  
		} else if (toplimit == '255') {
		  	driver.Send(['SET 0x01040005' + ' ' + R,0x0D,0x0A]);
				driver.Send(['SET 0x01040006' + ' ' + G,0x0D,0x0A]);
				driver.Send(['SET 0x01040007' + ' ' + B,0x0D,0x0A]);  
		} else {
		  IR.Log("Incrorrect top limit! Choose 100 or 255");
		}
	});
}  
//set val to 0 or 100 by press button
function sendSet_dim(item, command, popupindex)
{
	IR.AddListener(IR.EVENT_ITEM_PRESS,IR.GetPopup(popups[popupindex]).GetItem(item), function ()
	{
		if(IR.GetPopup(popups[popupindex]).GetItem(item).Value == 0)
		{
			IR.Log("Send 100 in sendSet_dim!")
			driver.Send([command + ' ' + '100',0x0D,0x0A]);
		}
		else
		{
			IR.Log("Send 0 in sendSet_dim!")
			driver.Send([command + ' ' + '0',0x0D,0x0A]);	
		}
	     // var value = IR.GetPopup(popups[popupindex]).GetItem(item).Value; 
	});
}

function sendSet_(item, command, popupindex)
{
 // IR.AddListener(IR.EVENT_ITEM_PRESS,IR.GetPage(page).GetItem(item), function ()
 IR.AddListener(IR.EVENT_ITEM_PRESS,IR.GetPopup(popups[popupindex]).GetItem(item), function ()
 {
     var value = IR.GetPopup(popups[popupindex]).GetItem(item).Value;
     driver.Send([command,0x0D,0x0A]);
 });
}

// set value from level (more than 0,1)
function sendSet_val(item, command, popupindex)
{
 // IR.AddListener(IR.EVENT_ITEM_PRESS,IR.GetPage(page).GetItem(item), function ()
 IR.AddListener(IR.EVENT_ITEM_PRESS,IR.GetPopup(popups[popupindex]).GetItem(item), function ()
 {
     var value = IR.GetPopup(popups[popupindex]).GetItem(item).Value;
     driver.Send([command + ' ' + value,0x0D,0x0A]);
 });
}
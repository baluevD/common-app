// set for usual buttons
function sendSetBut(item, command, popupindex)
{
  // IR.AddListener(IR.EVENT_ITEM_PRESS,IR.GetPage(page).GetItem(item), function ()
  IR.AddListener(IR.EVENT_ITEM_PRESS,IR.GetPopup(popups[popupindex]).GetItem(item), function ()
  {
     // if(IR.GetPage(page).GetItem(item).Value == 1)
     if(IR.GetPopup(popups[popupindex]).GetItem(item).Value == 1)
     {
        driver.Send([command + ' 0',0x0D,0x0A]);   
     }
     if(IR.GetPopup(popups[popupindex]).GetItem(item).Value == 0)
     {
        driver.Send([command + ' 1',0x0D,0x0A]);
     }
  }); 
}
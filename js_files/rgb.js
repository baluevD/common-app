IR.AddListener(IR.EVENT_ONLINE, driver, function(text) 
{
    //rgb
    driver.Send(['GET 0x01040005', '\r\n']);
    driver.Send(['GET 0x01040006', '\r\n']);
    driver.Send(['GET 0x01040007', '\r\n']);
    driver.Send(['GET 0x01040008', '\r\n']);
});

// check GET responces
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrGetInt(text,'GET 0x01040005',"Dimmer_R",2);
    checkStrGetInt(text,'GET 0x01040006',"Dimmer_G",2);
    checkStrGetInt(text,'GET 0x01040007',"Dimmer_B",2);
    checkStrGetInt(text,'GET 0x01040008',"Dimmer_Y",2);
});

// check EVENT notifications
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrIn(text,9,'0x01040005',"Dimmer_R", 2);
    checkStrIn(text,9,'0x01040006',"Dimmer_G", 2);
    checkStrIn(text,9,'0x01040007',"Dimmer_B", 2);
    checkStrIn(text,9,'0x01040008',"Dimmer_Y", 2);
});

// RGB Y
sendSet_val("Level 1",'SET 0x01040008', 13);

// RGB!!!
setColor(IR.GetPopup('RGB').GetItem('Color1'),100);
setColor(IR.GetPopup('RGB').GetItem('Color2'),100);
setColor(IR.GetPopup('RGB').GetItem('Color3'),100);
setColor(IR.GetPopup('RGB').GetItem('Color4'),100);
setColor(IR.GetPopup('RGB').GetItem('Color5'),100);
setColor(IR.GetPopup('RGB').GetItem('Color6'),100);

IR.AddListener(IR.EVENT_CHANNEL_SET, driver, function(name,value) {
     switch(name){
        case "Dimmer_R":
            driver.Send(['SET 0x01040005' + ' ' + value,0x0D,0x0A]);
            break;
        case "Dimmer_G":
            driver.Send(['SET 0x01040006' + ' ' + value,0x0D,0x0A]);
            break;
        case "Dimmer_B":
            driver.Send(['SET 0x01040007' + ' ' + value,0x0D,0x0A]);
            break;
        case "Dimmer_Y":
            driver.Send(['SET 0x01040008' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('Dimmer_Y',value);
            break;
     }  
 });

RGB_player(
      driver,                                            // Driver in project
      "Dimmer_R",                                       // Name of Red Channel
      "Dimmer_G",                                        // Name of Green Channel 
      "Dimmer_B",                                         // Name of Blue Channel                                 // Name of Blue Channel
      255,                                                 // Top limit for RGB channel (100 or 255)
      IR.GetPopup('RGB').GetItem('RGB_picker')
      );
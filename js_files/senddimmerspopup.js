// dimmers
IR.AddListener(IR.EVENT_ONLINE, driver, function(text) 
{
    driver.Send(['GET 0x01040005', '\r\n']);
    driver.Send(['GET 0x01040006', '\r\n']);
    driver.Send(['GET 0x01040007', '\r\n']);
    driver.Send(['GET 0x01040008', '\r\n']);
    
    driver.Send(['GET 0x010200A8', '\r\n']);
    driver.Send(['GET 0x01040004', '\r\n']);
    driver.Send(['GET 0x01040003', '\r\n']);
    driver.Send(['GET 0x01040009', '\r\n']);
    driver.Send(['GET 0x0104000A', '\r\n']);
    driver.Send(['GET 0x0104000B', '\r\n']);
    
    driver.Send(['GET 0x010200A2', '\r\n']);
    driver.Send(['GET 0x0102009B', '\r\n']);
    driver.Send(['GET 0x010200AA', '\r\n']);
    driver.Send(['GET 0x010200B1', '\r\n']);
    driver.Send(['GET 0x010200B2', '\r\n']);
    driver.Send(['GET 0x010200C7', '\r\n']);
    driver.Send(['GET 0x010200C8', '\r\n']);
    driver.Send(['GET 0x010200A3', '\r\n']);
    driver.Send(['GET 0x010200A4', '\r\n']);
    driver.Send(['GET 0x010200A0', '\r\n']);
    driver.Send(['GET 0x0102009C', '\r\n']);
    driver.Send(['GET 0x0102009F', '\r\n']);
    driver.Send(['GET 0x010200A5', '\r\n']);
    driver.Send(['GET 0x010200A6', '\r\n']);
    driver.Send(['GET 0x010200BA', '\r\n']);
    driver.Send(['GET 0x010200BD', '\r\n']);
    driver.Send(['GET 0x010200BE', '\r\n']);
    driver.Send(['GET 0x010200BF', '\r\n']);
    driver.Send(['GET 0x010200C0', '\r\n']);
    driver.Send(['GET 0x010200C3', '\r\n']);
    driver.Send(['GET 0x010200C5', '\r\n']);
    driver.Send(['GET 0x010200C6', '\r\n']);
    driver.Send(['GET 0x0203001b', '\r\n']);
    driver.Send(['GET 0x0203001c', '\r\n']);
    driver.Send(['GET 0x0203001d', '\r\n']);
    driver.Send(['GET 0x0203001e', '\r\n']);
/*    driver.Send(['GET 0x02030000', '\r\n']);
    driver.Send(['GET 0x02030001', '\r\n']);
    driver.Send(['GET 0x02030002', '\r\n']);
    driver.Send(['GET 0x02030003', '\r\n']);*/
    driver.Send(['GET 0x02030023', '\r\n']);
    driver.Send(['GET 0x02030024', '\r\n']);
    driver.Send(['GET 0x02030025', '\r\n']);
    driver.Send(['GET 0x02030026', '\r\n']);
    driver.Send(['GET 0x0203002c', '\r\n']);
    driver.Send(['GET 0x0203002d', '\r\n']);
    driver.Send(['GET 0x0203002e', '\r\n']);
    driver.Send(['GET 0x0203002f', '\r\n']);
    driver.Send(['GET 0x01050003', '\r\n']);

    driver.Send(['GET 0x01020099', '\r\n']);
    driver.Send(['GET 0x010200B7', '\r\n']);
    driver.Send(['GET 0x010200C9', '\r\n']);
    driver.Send(['GET 0x010200AB', '\r\n']);
    driver.Send(['GET 0x010200AD', '\r\n']);
    driver.Send(['GET 0x0102009A', '\r\n']);
    driver.Send(['GET 0x010200B8', '\r\n']);
    driver.Send(['GET 0x010200CA', '\r\n']);
    driver.Send(['GET 0x010200AC', '\r\n']);
    driver.Send(['GET 0x010200AE', '\r\n']);    
});

// check GET responces
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrGetInt(text,'GET 0x01040005',"Dimmer_R",2);
    checkStrGetInt(text,'GET 0x01040006',"Dimmer_G",2);
    checkStrGetInt(text,'GET 0x01040007',"Dimmer_B",2);
    checkStrGetInt(text,'GET 0x01040008',"Dimmer_Y",2);
    
    checkStrGetInt(text,'GET 0x010200a8',"Trig",1);

    checkStrGetInt(text,'GET 0x01040004',"Dimmer",2);
    checkStrGetInt(text,'GET 0x01040003',"h10+h11",2);
    checkStrGetInt(text,'GET 0x01040009',"ld5",2);
    checkStrGetInt(text,'GET 0x0104000a',"ld4",2);
    checkStrGetInt(text,'GET 0x0104000b',"ld11",2);

    checkStrGetInt(text,'GET 0x010200a2',"bubble",1);
    checkStrGetInt(text,'GET 0x0102009b',"bubble_rgb",1);
    checkStrGetInt(text,'GET 0x010200aa',"bubble_led",1);
     checkStrGetInt(text,'GET 0x010200b1',"h3_night",1);
    checkStrGetInt(text,'GET 0x010200b2',"h4_night",1);
    checkStrGetInt(text,'GET 0x010200c7',"h8",1);
    checkStrGetInt(text,'GET 0x010200c8',"h9",1);
    checkStrGetInt(text,'GET 0x010200a3',"h3",1);
    checkStrGetInt(text,'GET 0x010200a4',"ld2",1);
    checkStrGetInt(text,'GET 0x010200a0',"h2",1);
    checkStrGetInt(text,'GET 0x0102009c',"h6",1);
    checkStrGetInt(text,'GET 0x0102009f',"h4",1);
    checkStrGetInt(text,'GET 0x010200a5',"h12",1);
    checkStrGetInt(text,'GET 0x010200a6',"h13",1);
    checkStrGetInt(text,'GET 0x010200ba',"h14+h15",1);
    checkStrGetInt(text,'GET 0x010200bd',"ld1",1);
    checkStrGetInt(text,'GET 0x010200be',"ld6",1);
    checkStrGetInt(text,'GET 0x010200bf',"ld8",1);
    checkStrGetInt(text,'GET 0x010200c0',"ld9",1);
    checkStrGetInt(text,'GET 0x010200c3',"ld10",1);
    checkStrGetInt(text,'GET 0x010200c5',"ld12",1);
    checkStrGetInt(text,'GET 0x010200c6',"ld13",1);

    checkStrGetInt(text,'GET 0x01020099',"m2_up",1);
    checkStrGetInt(text,'GET 0x010200b7',"m1_up",1);
    checkStrGetInt(text,'GET 0x010200c9',"m3_up",1);
    checkStrGetInt(text,'GET 0x010200ab',"m4_up",1);
    checkStrGetInt(text,'GET 0x010200ad',"m5_up",1);
    checkStrGetInt(text,'GET 0x0102009a',"m2_down",1);
    checkStrGetInt(text,'GET 0x010200b8',"m1_down",1);
    checkStrGetInt(text,'GET 0x010200ca',"m3_down",1);
    checkStrGetInt(text,'GET 0x010200ac',"m4_down",1);
    checkStrGetInt(text,'GET 0x010200ae',"m5_down",1);    
});

// check EVENT notifications
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrIn(text,9,'0x01040005',"Dimmer_R", 2);
    checkStrIn(text,9,'0x01040006',"Dimmer_G", 2);
    checkStrIn(text,9,'0x01040007',"Dimmer_B", 2);
    checkStrIn(text,9,'0x01040008',"Dimmer_Y", 2);
    
    checkStrIn(text,5,'0x010200a8',"Trig", 1);

    checkStrIn(text,9,'0x01040004',"Dimmer", 2);
    checkStrIn(text,9,'0x01040003',"h10+h11", 2);
    checkStrIn(text,9,'0x01040009',"ld5", 2);
    checkStrIn(text,9,'0x0104000a',"ld4", 2);
    checkStrIn(text,9,'0x0104000b',"ld11", 2);

    checkStrIn(text,5,'0x010200a2',"bubble", 1);
    checkStrIn(text,5,'0x0102009b',"bubble_rgb", 1);
    checkStrIn(text,5,'0x010200aa',"bubble_led", 1);
    checkStrIn(text,5,'0x010200c7',"h8", 1);
    checkStrIn(text,5,'0x010200c8',"h9", 1);
    checkStrIn(text,5,'0x010200a3',"h3", 1);
    checkStrIn(text,5,'0x010200a4',"ld2", 1);
    checkStrIn(text,5,'0x010200a0',"h2", 1);
    checkStrIn(text,5,'0x0102009c',"h6", 1);
    checkStrIn(text,5,'0x0102009f',"h4", 1);
    checkStrIn(text,5,'0x010200a5',"h12", 1);
    checkStrIn(text,5,'0x010200a6',"h13", 1);
    checkStrIn(text,5,'0x010200ba',"h14+h15", 1);
    checkStrIn(text,5,'0x010200bd',"ld1", 1);
    checkStrIn(text,5,'0x010200be',"ld6", 1);
    checkStrIn(text,5,'0x010200bf',"ld8", 1);
    checkStrIn(text,5,'0x010200c0',"ld9", 1);
    checkStrIn(text,5,'0x010200c3',"ld10", 1);
    checkStrIn(text,5,'0x010200c5',"ld12", 1);
    checkStrIn(text,5,'0x010200c6',"ld13", 1);
    checkStrIn(text,5,'0x010200b1',"h3_night", 1);
    checkStrIn(text,5,'0x010200b2',"h4_night", 1);

    checkStrIn(text,5,'0x01020099',"m2_up", 1);
    checkStrIn(text,5,'0x010200b7',"m1_up", 1);
    checkStrIn(text,5,'0x010200c9',"m3_up", 1);
    checkStrIn(text,5,'0x010200ab',"m4_up", 1);
    checkStrIn(text,5,'0x010200ad',"m5_up", 1);
    checkStrIn(text,5,'0x0102009a',"m2_down", 1);
    checkStrIn(text,5,'0x010200b8',"m1_down", 1);
    checkStrIn(text,5,'0x010200ca',"m3_down", 1);
    checkStrIn(text,5,'0x010200ac',"m4_down", 1);
    checkStrIn(text,5,'0x010200ae',"m5_down", 1);
});


// DIMMERS!
// do when channel is activated
IR.AddListener(IR.EVENT_CHANNEL_SET, driver, function(name,value) 
{
    switch(name)
    {
        case "h5+h7_press":
            IR.Log("Dimmer pressed! Value: "+ value);
            driver.Send(['SET 0x01040004' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('Dimmer',value);
            driver.SetFeedback('Dimmer 1',value);
            break;
        case "h10+h11_press":
            IR.Log("Dimmer pressed! Value: "+ value);
            driver.Send(['SET 0x01040003' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('h10+h11',value);
            driver.SetFeedback('h10+h11 1',value);
            break;
        case "ld5_press":
            IR.Log("Dimmer pressed! Value: "+ value);
            driver.Send(['SET 0x01040009' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('ld5',value);
            driver.SetFeedback('ld5 1',value);
            break;
        case "ld4_press":
            IR.Log("Dimmer pressed! Value: "+ value);
            driver.Send(['SET 0x0104000A' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('ld4',value);
            driver.SetFeedback('ld4 1',value);
            break;
        case "ld11_press":
            IR.Log("Dimmer pressed! Value: "+ value);
            driver.Send(['SET 0x0104000B' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('ld11',value);
            driver.SetFeedback('ld11 1',value);
            break;
        case "Dimmer_Y_press":
            IR.Log("Dimmer pressed! Value: "+ value);
            driver.Send(['SET 0x01040008' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('Dimmer_Y',value);
            driver.SetFeedback('Dimmer_Y 1',value);
            if(value>=1)
            {
                IR.GetPopup("RGB").GetItem("RGB_picker").Enable = true;
                IR.GetPopup("RGB").GetItem("Color1").Enable = true;
                IR.GetPopup("RGB").GetItem("Color2").Enable = true;
                IR.GetPopup("RGB").GetItem("Color3").Enable = true;
                IR.GetPopup("RGB").GetItem("Color4").Enable = true;
                IR.GetPopup("RGB").GetItem("Color5").Enable = true;
                IR.GetPopup("RGB").GetItem("Color6").Enable = true;
            }
            else
            {
                IR.GetPopup("RGB").GetItem("RGB_picker").Enable = false;
                IR.GetPopup("RGB").GetItem("Color1").Enable = false;
                IR.GetPopup("RGB").GetItem("Color2").Enable = false;
                IR.GetPopup("RGB").GetItem("Color3").Enable = false;
                IR.GetPopup("RGB").GetItem("Color4").Enable = false;
                IR.GetPopup("RGB").GetItem("Color5").Enable = false;
                IR.GetPopup("RGB").GetItem("Color6").Enable = false;    
            }
            break;

        case "h5+h7_release":
            IR.Log("Dimmer released! Value: "+ value);
            driver.Send(['SET 0x01040004' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('Dimmer',value);
            driver.SetFeedback('Dimmer 1',value);
            break;
        case "h10+h11_release":
            IR.Log("Dimmer released! Value: "+ value);
            driver.Send(['SET 0x01040003' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('h10+h11',value);
            driver.SetFeedback('h10+h11 1',value);
            break;
        case "ld5_release":
            IR.Log("Dimmer released! Value: "+ value);
            driver.Send(['SET 0x01040009' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('ld5',value);
            driver.SetFeedback('ld5 1',value);
            break;
        case "ld4_release":
            IR.Log("Dimmer released! Value: "+ value);
            driver.Send(['SET 0x0104000A' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('ld4',value);
            driver.SetFeedback('ld4 1',value);
            break;
        case "ld11_release":
            IR.Log("Dimmer released! Value: "+ value);
            driver.Send(['SET 0x0104000B' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('ld11',value);
            driver.SetFeedback('ld11 1',value);
            break;
        case "Dimmer_Y_release":
            IR.Log("Dimmer released! Value: "+ value);
            driver.Send(['SET 0x01040008' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('Dimmer_Y',value);
            driver.SetFeedback('Dimmer_Y 1',value);
            if(value>=1)
            {
                IR.GetPopup("RGB").GetItem("RGB_picker").Enable = true;
                IR.GetPopup("RGB").GetItem("Color1").Enable = true;
                IR.GetPopup("RGB").GetItem("Color2").Enable = true;
                IR.GetPopup("RGB").GetItem("Color3").Enable = true;
                IR.GetPopup("RGB").GetItem("Color4").Enable = true;
                IR.GetPopup("RGB").GetItem("Color5").Enable = true;
                IR.GetPopup("RGB").GetItem("Color6").Enable = true;
            }
            else
            {
                IR.GetPopup("RGB").GetItem("RGB_picker").Enable = false;
                IR.GetPopup("RGB").GetItem("Color1").Enable = false;
                IR.GetPopup("RGB").GetItem("Color2").Enable = false;
                IR.GetPopup("RGB").GetItem("Color3").Enable = false;
                IR.GetPopup("RGB").GetItem("Color4").Enable = false;
                IR.GetPopup("RGB").GetItem("Color5").Enable = false;
                IR.GetPopup("RGB").GetItem("Color6").Enable = false;    
            }
            break;

        case "h5+h7_move":
            IR.Log("Dimmer moved! Value: "+ value);
            driver.Send(['SET 0x01040004' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('h5+h7_direct',value);
            break;
        case "h10+h11_move":
            IR.Log("Dimmer moved! Value: "+ value);
            driver.Send(['SET 0x01040003' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('h10+h11_direct',value);
            break;
        case "ld5_move":
            IR.Log("Dimmer moved! Value: "+ value);
            driver.Send(['SET 0x01040009' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('ld5_direct',value);
            break;
        case "ld4_move":
            IR.Log("Dimmer moved! Value: "+ value);
            driver.Send(['SET 0x0104000A' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('ld4_direct',value);
            break;
        case "ld11_move":
            IR.Log("Dimmer moved! Value: "+ value);
            driver.Send(['SET 0x0104000B' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('ld11_direct',value);
            break;
        case "Dimmer_Y_move":
            IR.Log("Dimmer moved! Value: "+ value);
            driver.Send(['SET 0x01040008' + ' ' + value,0x0D,0x0A]);
            driver.SetFeedback('Dimmer_Y_direct',value);
            if(value>=1)
            {
                IR.GetPopup("RGB").GetItem("RGB_picker").Enable = true;
                IR.GetPopup("RGB").GetItem("Color1").Enable = true;
                IR.GetPopup("RGB").GetItem("Color2").Enable = true;
                IR.GetPopup("RGB").GetItem("Color3").Enable = true;
                IR.GetPopup("RGB").GetItem("Color4").Enable = true;
                IR.GetPopup("RGB").GetItem("Color5").Enable = true;
                IR.GetPopup("RGB").GetItem("Color6").Enable = true;
            }
            else
            {
                IR.GetPopup("RGB").GetItem("RGB_picker").Enable = false;
                IR.GetPopup("RGB").GetItem("Color1").Enable = false;
                IR.GetPopup("RGB").GetItem("Color2").Enable = false;
                IR.GetPopup("RGB").GetItem("Color3").Enable = false;
                IR.GetPopup("RGB").GetItem("Color4").Enable = false;
                IR.GetPopup("RGB").GetItem("Color5").Enable = false;
                IR.GetPopup("RGB").GetItem("Color6").Enable = false;    
            }
            break;
    }
});

//set dimmer value by click button
sendSet_dim("h5",'SET 0x01040004', 0);
sendSet_dim("h7",'SET 0x01040004', 0);
sendSet_dim("h10",'SET 0x01040003', 0);
sendSet_dim("h11",'SET 0x01040003', 0);
sendSet_dim("ld5",'SET 0x01040009', 0);
sendSet_dim("ld4",'SET 0x0104000A', 0);
sendSet_dim("ld11",'SET 0x0104000B', 0);
sendSet_dim("ld7",'SET 0x01040008', 0);
sendSet_dim("ld7",'SET 0x01040005', 0);
sendSet_dim("ld7",'SET 0x01040006', 0);
sendSet_dim("ld7",'SET 0x01040007', 0);

// RGB!!!
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
      100,                                                 // Top limit for RGB channel (100 or 255)
      IR.GetPopup('RGB').GetItem('RGB_picker')
      );
      
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

// MOTORS!

sendSet_("m2_up", 'SET 0x01010055 1', 9);
 // for stop - send 0 to up and down
sendSet_("m2_stop", 'SET 0x01020099 0', 9);
sendSet_("m2_stop", 'SET 0x0102009A 0', 9);
sendSet_("m2_down", 'SET 0x01010056 1', 9);

sendSet_("m1_up", 'SET 0x01010058 1', 9);
sendSet_("m1_stop", 'SET 0x010200B7 0', 9);
sendSet_("m1_stop", 'SET 0x010200B8 0', 9);
sendSet_("m1_down", 'SET 0x01010057 1', 9);

sendSet_("m3_up", 'SET 0x01010090 1', 9);
sendSet_("m3_stop", 'SET 0x010200C9 0', 9);
sendSet_("m3_stop", 'SET 0x010200CA 0', 9);
sendSet_("m3_down", 'SET 0x0101008F 1', 9);

sendSet_("m4_up", 'SET 0x01010068 1', 9);
sendSet_("m4_stop", 'SET 0x010200AB 0', 9);
sendSet_("m4_stop", 'SET 0x010200AC 0', 9);
sendSet_("m4_down", 'SET 0x01010067 1', 9);

sendSet_("Item 1", 'SET 0x02030037 1', 9);
sendSet_("Item 2", 'SET 0x02030037 0', 9);

sendSet_("m5_up", 'SET 0x0101008C 1', 9);
sendSet_("m5_stop", 'SET 0x010200AD 0', 9);
sendSet_("m5_stop", 'SET 0x010200AE 0', 9);
sendSet_("m5_down", 'SET 0x0101008B 1', 9);

IR.AddListener(IR.EVENT_CHANNEL_SET, driver, function(name,value) {
     switch(name){
        case "m1_stop":
            driver.SetFeedback('m1_stop',1);
            break;
        case "m2_stop":
            driver.SetFeedback('m2_stop',1);
            break;
        case "m3_stop":
            driver.SetFeedback('m3_stop',1);
            break;
        case "m4_stop":
            driver.SetFeedback('m4_stop',1);
            break;
        case "m5_stop":
            driver.SetFeedback('m5_stop',1);
            break;
     }
     if(name=="m1_up"||name=="m1_down")
            driver.SetFeedback('m1_stop',0);
     if(name=="m2_up"||name=="m2_down")
       driver.SetFeedback('m2_stop',0);
       if(name=="m3_up"||name=="m3_down")
       driver.SetFeedback('m3_stop',0);
       if(name=="m4_up"||name=="m4_down")
       driver.SetFeedback('m4_stop',0);
       if(name=="m5_up"||name=="m5_down")
       driver.SetFeedback('m5_stop',0);       
 });
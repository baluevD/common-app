function Internal()
{
IR.Log('Wi-fi');
 IR.GetDevice("CU_TCP").SetParameters({Host: "192.168.62.10", Port: "1111", 
        SendMode: 1,
        ScriptMode: 1,
        BackGroundMode: 0});
}

function External()
{
IR.Log("Internet");
 IR.GetDevice("CU_TCP").SetParameters({Host: "192.168.62.10", Port: "1111", 
        SendMode: 1,
        ScriptMode: 1,
        BackGroundMode: 0});
}

IR.AddListener(IR.EVENT_ITEM_PRESS,IR.GetPage("light").GetItem("Item 1"), function ()
{
       if(IR.GetPage("light").GetItem("Item 1").Value == 1)
       {
          Internal();  
       }
       if(IR.GetPage("light").GetItem("Item 1").Value == 0)
       {
          External();
       }
}); 
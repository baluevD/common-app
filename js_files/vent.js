IR.AddListener(IR.EVENT_ONLINE, driver, function(text) 
{
//vent kitchen
	driver.Send(['GET 0x010200A7', '\r\n']);
});
// check EVENT notifications
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrIn(text,5,'0x010200a7',"vent", 1);
});

// check GET responces
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text); 
    checkStrGetInt(text,'GET 0x010200a7',"vent", 1);
});

// vent kitchen
sendSetBut("vent", 'SET 0x010200A7', 0);
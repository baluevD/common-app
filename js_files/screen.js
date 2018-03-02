IR.AddListener(IR.EVENT_ONLINE, driver, function(text) 
{
// screen
	driver.Send(['GET 0x0102009D', '\r\n']);
	driver.Send(['GET 0x0102009E', '\r\n']);    
});

// check GET responces
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrGetInt(text,'GET 0x0102009D',"screen_down", 1);
    checkStrGetInt(text,'GET 0x0102009E',"screen_up", 1);
});

// check EVENT notifications
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrIn(text,5,'0x0102009D',"screen_down", 1);
    checkStrIn(text,5,'0x0102009E',"screen_up", 1);
});

// screen
sendSetBut("screen_up", 'SET 0x0102009E', 0);
sendSetBut("screen_down", 'SET 0x0102009D', 0);
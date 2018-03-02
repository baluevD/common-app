IR.AddListener(IR.EVENT_ONLINE, driver, function(text) 
{
// water
    driver.Send(['GET 0x010100B0', '\r\n']);
});

// check GET responces
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrGetInt(text,'GET 0x010200b0',"allwater", 1);
});

// check EVENT notifications
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrIn(text,5,'GET 0x010200b0',"allwater",1);
});

//allwater
sendSetBut("allwater", 'SET 0x010200B0', 11);
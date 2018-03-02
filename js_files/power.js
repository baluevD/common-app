IR.AddListener(IR.EVENT_ONLINE, driver, function(text) 
{
// power
    driver.Send(['GET 0x01020097', '\r\n']);
});

// check EVENT notifications
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrIn(text,5,'GET 0x01020097',"powersocket",1);
});

// check GET responces
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrGetInt(text,'GET 0x01020097',"powersocket", 1);
});

//powersocket
sendSetBut("powersocket1", 'SET 0x01020097', 12);
sendSetBut("powersocket2", 'SET 0x01020097', 12);
sendSetBut("powersocket3", 'SET 0x01020097', 12);
sendSetBut("powersocket4", 'SET 0x01020097', 12);
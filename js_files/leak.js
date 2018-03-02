IR.AddListener(IR.EVENT_ONLINE, driver, function(text) 
{
// detectors of leak
    driver.Send(['GET 0x01010044', '\r\n']);
    driver.Send(['GET 0x01010045', '\r\n']);
});

// check EVENT notifications
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrIn(text,29,'0x01010044',"leak123", 1);
    checkStrIn(text,29,'0x01010045',"leak45", 1);
});

// check GET responces
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrGetInt(text,'GET 0x01010044',"leak123", 1);
    checkStrGetInt(text,'GET 0x01010045',"leak45", 1);
});

// show popup 'leakage' when any leak is
IR.AddListener(IR.EVENT_TAG_CHANGE, driver, function(name, value) 
{  
    // IR.Log(name+": "+value); // Feedback 1: 100
    if((name == 'leak123' && value == 1) || (name == 'leak45' && value == 1))
    {
        IR.HideAllPopups(page);
        IR.ShowPopup("leakage");
    }
});
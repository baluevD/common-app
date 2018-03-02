// ouput 'OFFLINE' when device turn off
IR.AddListener(IR.EVENT_OFFLINE, driver, function(text) 
{
   IR.Log('disconnect');
	driver.SetFeedback("Getstatus",'OFFLINE');
});
//output value to button from get responces
function checkStrGetInt(text,getter,feedback,num)
{
	var cut = 15;
	var idx = 0;
	var a = 0;
	if(text.indexOf(getter) != -1)
	{
		idx = text.lastIndexOf(getter);
		a =  text.slice(idx+cut,idx+cut+num);
		if(num!=4)
			driver.SetFeedback(feedback,parseInt(a));
		else if(num==4)
			driver.SetFeedback(feedback,parseFloat(a.slice(0,2) + '.' + a.slice(2,4)));
	}
}
/*check for buttons (output value from EVENT notifications)
code - low code of event from pair
address - address of register
num - number of digits of wished value
code with letters should be pass as string! not number!
*/
function checkStrIn(text,code,address,feedback,num)
{
	var temp = false;
	var a = 0;
	var cut=14;
	if((code>=0)&&(code<10))
	{
		cut--;
	}
	if(code>='a'&&code<='e')
	{
		code = parseInt(code,16);
	}
	var idx1=0,idx2=0;

	if(text.indexOf(code.toString()+' '+address, idx1) >= 0)
	{
		idx1 = text.lastIndexOf(code.toString()+' '+address);
		a =  text.slice(idx1+cut,idx1+cut+num);
		temp = true;
	}
	// if not temperature (other have two codes)
	if(code != 15)
	{
		if(text.indexOf((code+1).toString()+' '+address, idx2) >= 0)
		{
			idx2 = text.lastIndexOf((code+1).toString()+' '+address);
			if(idx2>idx1)
			{
				IR.Log(text.slice(idx2,idx2+cut+num));
				IR.Log(text.slice(idx2+cut,idx2+cut+num));
				a = text.slice(idx2+cut,idx2+cut+num);
				temp = true; 
			}
		}
	}
	// float case
	if((num == 4)&&temp)
	{
		driver.SetFeedback(feedback,parseFloat(a.slice(0,2) + '.' + a.slice(2,4)));
	}
	// int case
	else if((num != 4)&&temp)
	{
		driver.SetFeedback(feedback,a);
	}
}
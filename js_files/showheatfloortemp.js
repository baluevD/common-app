function hideFloor1()
{
   IR.GetPopup("heat_plan").GetItem("Item 4").Visible = false;
}

function hideFloor2()
{
 IR.GetPopup("heat_plan").GetItem("Item 3").Visible = false;
}

function hideFloor3()
{
 IR.GetPopup("heat_plan").GetItem("Item 1").Visible = false;
}

function showFloor1()
{
   IR.GetPopup("heat_plan").GetItem("Item 4").Visible = true;
}

function showFloor2()
{
 IR.GetPopup("heat_plan").GetItem("Item 3").Visible = true;
}

function showFloor3()
{
 IR.GetPopup("heat_plan").GetItem("Item 1").Visible = true;
}


IR.AddListener(IR.EVENT_EXIT,0,function()
{

});
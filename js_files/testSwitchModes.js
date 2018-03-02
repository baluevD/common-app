IR.AddListener(IR.EVENT_START,0,function()
{

});

IR.AddListener(IR.EVENT_EXIT,0,function()
{

});

function switchToComfort1(){
IR.GetPopup("heat_plan1").GetItem('temp_setup 1').Visible = true;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan1").GetItem('temp_setup 3').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 4').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 5').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 2').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToMax1(){
IR.GetPopup("heat_plan1").GetItem('temp_setup 1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan1").GetItem('temp_setup 3').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 4').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 5').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 2').Visible = true;
//IR.Log(objNum[i]+' '+true);
}

function switchToTime1(){
IR.GetPopup("heat_plan1").GetItem('temp_setup 1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan1").GetItem('temp_setup 3').Visible = true;
IR.GetPopup("heat_plan1").GetItem('temp_setup 4').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 5').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 2').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToMin1(){
IR.GetPopup("heat_plan1").GetItem('temp_setup 1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan1").GetItem('temp_setup 3').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 4').Visible = true;
IR.GetPopup("heat_plan1").GetItem('temp_setup 5').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 2').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToNormal1(){
IR.GetPopup("heat_plan1").GetItem('temp_setup 1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan1").GetItem('temp_setup 3').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 4').Visible = false;
IR.GetPopup("heat_plan1").GetItem('temp_setup 5').Visible = true;
IR.GetPopup("heat_plan1").GetItem('temp_setup 2').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToComfort2(){
IR.GetPopup("heat_plan2").GetItem('temp_setup_1').Visible = true;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan2").GetItem('temp_setup_3').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_4').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_5').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_2').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToMax2(){
IR.GetPopup("heat_plan2").GetItem('temp_setup_1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan2").GetItem('temp_setup_3').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_4').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_5').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_2').Visible = true;
//IR.Log(objNum[i]+' '+true);
}

function switchToTime2(){
IR.GetPopup("heat_plan2").GetItem('temp_setup_1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan2").GetItem('temp_setup_3').Visible = true;
IR.GetPopup("heat_plan2").GetItem('temp_setup_4').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_5').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_2').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToMin2(){
IR.GetPopup("heat_plan2").GetItem('temp_setup_1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan2").GetItem('temp_setup_3').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_4').Visible = true;
IR.GetPopup("heat_plan2").GetItem('temp_setup_5').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_2').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToNormal2(){
IR.GetPopup("heat_plan2").GetItem('temp_setup_1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan2").GetItem('temp_setup_3').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_4').Visible = false;
IR.GetPopup("heat_plan2").GetItem('temp_setup_5').Visible = true;
IR.GetPopup("heat_plan2").GetItem('temp_setup_2').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToComfort3(){
IR.GetPopup("heat_plan3").GetItem('temp_setup_1 1').Visible = true;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan3").GetItem('temp_setup_3 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_4 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_5 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_2 1').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToMax3(){
IR.GetPopup("heat_plan3").GetItem('temp_setup_1 1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan3").GetItem('temp_setup_3 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_4 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_5 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_2 1').Visible = true;
//IR.Log(objNum[i]+' '+true);
}

function switchToTime3(){
IR.GetPopup("heat_plan3").GetItem('temp_setup_1 1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan3").GetItem('temp_setup_3 1').Visible = true;
IR.GetPopup("heat_plan3").GetItem('temp_setup_4 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_5 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_2 1').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToMin3(){
IR.GetPopup("heat_plan3").GetItem('temp_setup_1 1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan3").GetItem('temp_setup_3 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_4 1').Visible = true;
IR.GetPopup("heat_plan3").GetItem('temp_setup_5 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_2 1').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

function switchToNormal3(){
IR.GetPopup("heat_plan3").GetItem('temp_setup_1 1').Visible = false;
//IR.Log(objNum[i]+' '+false);
IR.GetPopup("heat_plan3").GetItem('temp_setup_3 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_4 1').Visible = false;
IR.GetPopup("heat_plan3").GetItem('temp_setup_5 1').Visible = true;
IR.GetPopup("heat_plan3").GetItem('temp_setup_2 1').Visible = false;
//IR.Log(objNum[i]+' '+true);
}

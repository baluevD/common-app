//var passwd = 0;
var passwords = [0,0,0];


IR.AddListener(IR.EVENT_ITEM_SHOW, IR.GetPopup('security_code'), function ()
{  
   passwords[0] = IR.GetVariable("Global.passwd7");
   passwords[1] = IR.GetVariable("Global.passwd8");
   passwords[2] = IR.GetVariable("Global.passwd9");
   IR.Log(passwords[0]);
   IR.Log(passwords[1]);
   IR.Log(passwords[2]);     
});



IR.AddListener(IR.EVENT_ITEM_CHANGE, IR.GetPopup("security_code").GetItem("security_input"), function (action, key)
{
    text = IR.GetPopup("security_code").GetItem("security_input").Text;
    if (action == 1)  // insert text
    {
         text = IR.GetPopup("security_code").GetItem("security_input").Text;

         if(text == passwords[0])
         {
              IR.GetPopup("security_code").GetItem("security_input").Text = '';
         if(IR.GetPopup("security_code").GetItem("shield").Value == 0)
            IR.GetDevice("CU_TCP").SetFeedback('1',1);
         if(IR.GetPopup("security_code").GetItem("shield").Value == 1)
            IR.GetDevice("CU_TCP").SetFeedback('1',0);

         }
         if(text == passwords[1])
         {
         IR.GetPopup("security_code").GetItem("security_input").Text = '';
        if(IR.GetPopup("security_code").GetItem("fire").Value == 0)
            IR.GetDevice("CU_TCP").SetFeedback('2',1);
         if(IR.GetPopup("security_code").GetItem("fire").Value == 1)
            IR.GetDevice("CU_TCP").SetFeedback('2',0);

         }
         if(text == passwords[2])
         {
         IR.GetPopup("security_code").GetItem("security_input").Text = '';
         if(IR.GetPopup("security_code").GetItem("water").Value == 0)
            IR.GetDevice("CU_TCP").SetFeedback('3',1);
         if(IR.GetPopup("security_code").GetItem("water").Value == 1)
            IR.GetDevice("CU_TCP").SetFeedback('3',0);
         }
    }
    if(text.length == 4){
         IR.GetPopup("security_code").GetItem("security_input").Text = '';
    }
});

IR.AddListener(IR.EVENT_ITEM_HIDE, IR.GetPopup('security_code'), function ()
{  
   IR.GetPopup("security_code").GetItem("security_input").Text = '';
});


IR.AddListener(IR.EVENT_EXIT,0,function()
{

});

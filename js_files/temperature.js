       IR.AddListener(IR.EVENT_ONLINE, driver, function(text) 
{
    // temperature
    driver.Send(['GET 0x0203001b', '\r\n']);
    driver.Send(['GET 0x0203001c', '\r\n']);
    driver.Send(['GET 0x0203001d', '\r\n']);
    driver.Send(['GET 0x0203001e', '\r\n']);
    driver.Send(['GET 0x02030023', '\r\n']);
    driver.Send(['GET 0x02030024', '\r\n']);
    driver.Send(['GET 0x02030025', '\r\n']);
    driver.Send(['GET 0x02030026', '\r\n']);
    driver.Send(['GET 0x0203002c', '\r\n']);
    driver.Send(['GET 0x0203002d', '\r\n']);
    driver.Send(['GET 0x0203002e', '\r\n']);
    driver.Send(['GET 0x0203002f', '\r\n']);
    driver.Send(['GET 0x01050003', '\r\n']);
    driver.Send(['GET 0x01050005', '\r\n']);
    driver.Send(['GET 0x0105000b', '\r\n']);
});

// check EVENT notifications
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrIn(text,15,'0x01050005',"temp_living", 4);
    checkStrIn(text,15,'0x01050003',"temp_cabinet", 4);
    checkStrIn(text,15,'0x0105000b',"temp_bedroom", 4);
    // checkStrIn(text,15,'0x01050003',"temp_living", 4);
});

// check GET responces
IR.AddListener(IR.EVENT_RECEIVE_TEXT, driver, function(text) 
{
    IR.Log(text);
    checkStrGetInt(text,'GET 0x01050005',"temp_living", 4);
    checkStrGetInt(text,'GET 0x01050003',"temp_cabinet", 4);
    checkStrGetInt(text,'GET 0x0105000b',"temp_bedroom", 4);
    // living room
    checkMode(text,'0x0203001b');
    checkMode(text,'0x0203001c');
    checkMode(text,'0x0203001d');
    checkMode(text,'0x0203001e');
    checkMode(text,'0x02030034');

    // cabinet
    checkMode(text,'0x02030023');
    checkMode(text,'0x02030024');
    checkMode(text,'0x02030025');
    checkMode(text,'0x02030026');
    checkMode(text,'0x02030035');
    // bedroom
    checkMode(text,'0x0203002c');
    checkMode(text,'0x0203002d');
    checkMode(text,'0x0203002e');
    checkMode(text,'0x0203002f');
    checkMode(text,'0x02030036');

});

var tempObj = {
    living:
    {
        // '0x0203001b': 'temp_setup_liv_2',
        // '0x0203001c': 'temp_setup_liv_3',
        // '0x0203001d': 'temp_setup_liv_4',
        // '0x0203001e': 'temp_setup_liv_5',
        // '0x02030034': 'temp_setup_liv_1'
        '0x0203001b': 'temp_setup_liv_4',
        '0x0203001c': 'temp_setup_liv_5',
        '0x0203001d': 'temp_setup_liv_1',
        '0x0203001e': 'temp_setup_liv_2',
        '0x02030034': 'temp_setup_liv_3'
    },
    cabinet:
    {
        '0x02030023': 'temp_setup_cab_4',
        '0x02030024': 'temp_setup_cab_5',
        '0x02030025': 'temp_setup_cab_1',
        '0x02030026': 'temp_setup_cab_2',
        '0x02030035': 'temp_setup_cab_3'
    },
    bedroom:
    {
        '0x0203002c': 'temp_setup_bed_4',
        '0x0203002d': 'temp_setup_bed_5',
        '0x0203002e': 'temp_setup_bed_1',
        '0x0203002f': 'temp_setup_bed_2',
        '0x02030036': 'temp_setup_bed_3'
    }
}

// make visible choosen mode and send to needed bit
function zeroAllExceptOne(register, obj)
{
    for(var regist in obj)
    {
        if(regist!=register)
        {
            driver.Send(['SET '+regist+' 0',0x0D,0x0A]);
            // IR.GetPopup("heat_plan").GetItem(obj[regist]).Visible = false;
        }
       // else
            // IR.GetPopup("heat_plan").GetItem(obj[regist]).Visible = true; 
    }
}

// check what mode was earlier
function checkMode(text,register)
{
    var cut = 15;
    var idx = 0;
    var a = 0;
    var getter = 'GET '+register;
    if(text.indexOf(getter) != -1)
    {
        idx = text.lastIndexOf(getter);
        a =  text.slice(idx+cut,idx+cut+num);
        if(parseInt(a)==1)
        {
           switchModes(register);
           IR.GetPopup("heat_plan").GetItem(obj[regist]).Visible = true; 
        }
    }
}

// set current mode
function sendSetTempMode(item, register)
{
    IR.AddListener(IR.EVENT_ITEM_PRESS,IR.GetPopup("heat_plan").GetItem(item),function()
    {
        driver.Send(['SET '+ register +' 1',0x0D,0x0A]);
        switchModes(register);
    });
}



// switch mode depends on feedback
function switchModes(command)
{
    switch(command)
    {
        //living room
        case '0x0203001b':
            zeroAllExceptOne('0x0203001b',tempObj['living']);
            break;
        case '0x0203001c':
            zeroAllExceptOne('0x0203001c',tempObj['living']);
            break;
        case '0x0203001d':
            zeroAllExceptOne('0x0203001d',tempObj['living']);
            break;
        case '0x0203001e':
            zeroAllExceptOne('0x0203001e',tempObj['living']);
            break;
        case '0x02030034':
            zeroAllExceptOne('0x02030034',tempObj['living']);
            break;
        //cabinet
        case '0x02030023':
            zeroAllExceptOne('0x02030023',tempObj['cabinet']);
            break;
        case '0x02030024':
            zeroAllExceptOne('0x02030024',tempObj['cabinet']);
            break;
        case '0x02030025':
            zeroAllExceptOne('0x02030025',tempObj['cabinet']);
            break;
        case '0x02030026':
            zeroAllExceptOne('0x02030026',tempObj['cabinet']);
            break;
        case '0x02030035':
            zeroAllExceptOne('0x02030035',tempObj['cabinet']);
            break;
        //bedroom 
        case '0x0203002c':
            zeroAllExceptOne('0x0203002c',tempObj['bedroom']);               
            break;
        case '0x0203002d':
            zeroAllExceptOne('0x0203002d',tempObj['bedroom']);
            break;
        case '0x0203002e':
            zeroAllExceptOne('0x0203002e',tempObj['bedroom']);
            break;
        case '0x0203002f':
            zeroAllExceptOne('0x0203002f',tempObj['bedroom']);
            break;
        case '0x02030036':
            zeroAllExceptOne('0x02030036',tempObj['bedroom']);
            break;
    }   
}

sendSetTempMode('liv_min_1', '0x0203001b');
sendSetTempMode('liv_min_2', '0x0203001b');
sendSetTempMode('liv_min_3', '0x0203001b');
sendSetTempMode('liv_norm_1', '0x0203001c');
sendSetTempMode('liv_norm_2', '0x0203001c');
sendSetTempMode('liv_norm_3', '0x0203001c');
sendSetTempMode('liv_norm_4', '0x0203001c');
sendSetTempMode('liv_comf_1', '0x0203001d');
sendSetTempMode('liv_comf_2', '0x0203001d');
sendSetTempMode('liv_comf_3', '0x0203001d');
sendSetTempMode('liv_comf_4', '0x0203001d');
sendSetTempMode('liv_max_1', '0x0203001e');
sendSetTempMode('liv_max_2', '0x0203001e');
sendSetTempMode('liv_max_3', '0x0203001e');
sendSetTempMode('liv_shed_1', '0x02030034');
sendSetTempMode('liv_shed_2', '0x02030034');
sendSetTempMode('liv_shed_3', '0x02030034');

sendSetTempMode('cab_min_1', '0x02030023');
sendSetTempMode('cab_min_2', '0x02030023');
sendSetTempMode('cab_min_3', '0x02030023');
sendSetTempMode('cab_norm_1', '0x02030024');
sendSetTempMode('cab_norm_2', '0x02030024');
sendSetTempMode('cab_norm_3', '0x02030024');
sendSetTempMode('cab_norm_4', '0x02030024');
sendSetTempMode('cab_comf_1', '0x02030025');
sendSetTempMode('cab_comf_2', '0x02030025');
sendSetTempMode('cab_comf_3', '0x02030025');
sendSetTempMode('cab_comf_4', '0x02030025');
sendSetTempMode('cab_max_1', '0x02030026');
sendSetTempMode('cab_max_2', '0x02030026');
sendSetTempMode('cab_max_3', '0x02030026');
sendSetTempMode('cab_shed_1', '0x02030035');
sendSetTempMode('cab_shed_2', '0x02030035');
sendSetTempMode('cab_shed_3', '0x02030035');

sendSetTempMode('bed_min_1', '0x0203002c');
sendSetTempMode('bed_min_2', '0x0203002c');
sendSetTempMode('bed_min_3', '0x0203002c');
sendSetTempMode('bed_norm_1', '0x0203002d');
sendSetTempMode('bed_norm_2', '0x0203002d');
sendSetTempMode('bed_norm_3', '0x0203002d');
sendSetTempMode('bed_norm_4', '0x0203002d');
sendSetTempMode('bed_comf_1', '0x0203002e');
sendSetTempMode('bed_comf_2', '0x0203002e');
sendSetTempMode('bed_comf_3', '0x0203002e');
sendSetTempMode('bed_comf_4', '0x0203002e');
sendSetTempMode('bed_max_1', '0x0203002f');
sendSetTempMode('bed_max_2', '0x0203002f');
sendSetTempMode('bed_max_3', '0x0203002f');
sendSetTempMode('bed_shed_1', '0x02030036');
sendSetTempMode('bed_shed_2', '0x02030036');
sendSetTempMode('bed_shed_3', '0x02030036');

var arrIt = ['temp_setup_liv_4','temp_setup_liv_5','temp_setup_liv_3','temp_setup_liv_1','temp_setup_liv_2'];
var arrIt2 = ['temp_setup_cab_4','temp_setup_cab_5','temp_setup_cab_3','temp_setup_cab_1','temp_setup_cab_2'];
var arrIt3 = ['temp_setup_bed_4','temp_setup_bed_5','temp_setup_bed_3','temp_setup_bed_1','temp_setup_bed_2'];


function trueAnime(degree,item,time,curve,type,popup,back)
{
    if(type == 0)
    {
        ANIMATION(
            ANIMATION.Rotate(degree),
            IR.GetPopup(popup).GetItem(item),
            time,
            ANIMATION.NO_DELAY,
            ANIMATION.NO_LOOP,
            IR.curve);
    }
    else
    {
        ANIMATION(
            ANIMATION.Rotate(degree),
            IR.GetPopup(popup).GetItem(item),
            time,
            ANIMATION.NO_DELAY,
            ANIMATION.NO_LOOP,
            IR.curve,function(){},back);
    }
}

// after end of animation - go back to primary state
// num - bed and cab termostats
// _num - fake for heat floors
function continue1() 
{ 
    trueAnime(0,arrIt[0],10,'LINEAR',0,'heat_plan');
}
function continue2()
{
    trueAnime(0,arrIt[1],10,'LINEAR',0,'heat_plan');  
}
function continue3()
{
    trueAnime(0,arrIt[2],10,'LINEAR',0,'heat_plan');    
}
function continue4()
{
    trueAnime(0,arrIt[3],10,'LINEAR',0,'heat_plan');
}
function continue5()
{
    trueAnime(0,arrIt[4],10,'LINEAR',0,'heat_plan');    
}

function continue12() 
{ 
    trueAnime(0,arrIt2[0],10,'LINEAR',0,'heat_plan');
}
function continue22()
{
    trueAnime(0,arrIt2[1],10,'LINEAR',0,'heat_plan');  
}
function continue32()
{
    trueAnime(0,arrIt2[2],10,'LINEAR',0,'heat_plan');    
}
function continue42()
{
    trueAnime(0,arrIt2[3],10,'LINEAR',0,'heat_plan');
}
function continue52()
{
    trueAnime(0,arrIt2[4],10,'LINEAR',0,'heat_plan');    
}

function continue13() 
{ 
    trueAnime(0,arrIt3[0],10,'LINEAR',0,'heat_plan');
}
function continue23()
{
    trueAnime(0,arrIt3[1],10,'LINEAR',0,'heat_plan');  
}
function continue33()
{
    trueAnime(0,arrIt3[2],10,'LINEAR',0,'heat_plan');    
}
function continue43()
{
    trueAnime(0,arrIt3[3],10,'LINEAR',0,'heat_plan');
}
function continue53()
{
    trueAnime(0,arrIt3[4],10,'LINEAR',0,'heat_plan');    
}

function continue1_1() 
{ 
    trueAnime(0,arrIt[0],10,'LINEAR',0,'heat_plan1');
}
function continue2_1()
{
    trueAnime(0,arrIt[1],10,'LINEAR',0,'heat_plan1');  
}
function continue3_1()
{
    trueAnime(0,arrIt[2],10,'LINEAR',0,'heat_plan1');    
}
function continue4_1()
{
    trueAnime(0,arrIt[3],10,'LINEAR',0,'heat_plan1');
}
function continue5_1()
{
    trueAnime(0,arrIt[4],10,'LINEAR',0,'heat_plan1');    
}

function continue1_2() 
{ 
    trueAnime(0,arrIt[0],10,'LINEAR',0,'heat_plan2');
}
function continue2_2()
{
    trueAnime(0,arrIt[1],10,'LINEAR',0,'heat_plan2');  
}
function continue3_2()
{
    trueAnime(0,arrIt[2],10,'LINEAR',0,'heat_plan2');    
}
function continue4_2()
{
    trueAnime(0,arrIt[3],10,'LINEAR',0,'heat_plan2');
}
function continue5_2()
{
    trueAnime(0,arrIt[4],10,'LINEAR',0,'heat_plan2');    
}

function continue1_3() 
{ 
    trueAnime(0,arrIt[0],10,'LINEAR',0,'heat_plan3');
}
function continue2_3()
{
    trueAnime(0,arrIt[1],10,'LINEAR',0,'heat_plan3');  
}
function continue3_3()
{
    trueAnime(0,arrIt[2],10,'LINEAR',0,'heat_plan3');    
}
function continue4_3()
{
    trueAnime(0,arrIt[3],10,'LINEAR',0,'heat_plan3');
}
function continue5_3()
{
    trueAnime(0,arrIt[4],10,'LINEAR',0,'heat_plan3');    
}

// for order: comfort,max,time,min,normal
function player1_1()
{
    trueAnime(68,arrIt[0],300,'SINE_IN',1,'heat_plan',continue1);
}
function player2_1() 
{
    trueAnime(146,arrIt[0],500,'SINE_IN',1,'heat_plan',continue1);
}
function player3_1() 
{
    trueAnime(-68,arrIt[0],300,'SINE_IN',1,'heat_plan',continue1);
}
function player4_1() 
{
    trueAnime(-136,arrIt[0],500,'SINE_IN',1,'heat_plan',continue1);
}

function player1_2() 
{
    trueAnime(78,arrIt[1],300,'SINE_IN',1,'heat_plan',continue2);
}
function player2_2() 
{
    trueAnime(156,arrIt[1],500,'SINE_IN',1,'heat_plan',continue2);
}
function player3_2() 
{
    trueAnime(-68,arrIt[1],300,'SINE_IN',1,'heat_plan',continue2);
}
function player4_2() 
{
    trueAnime(-136,arrIt[1],500,'SINE_IN',1,'heat_plan',continue2);
}

function player1_3() 
{
    trueAnime(78,arrIt[2],300,'SINE_IN',1,'heat_plan',continue3);
}
function player2_3() 
{
    trueAnime(146,arrIt[2],500,'SINE_IN',1,'heat_plan',continue3);
}
function player3_3() 
{
    trueAnime(-78,arrIt[2],300,'SINE_IN',1,'heat_plan',continue3);
}
function player4_3() 
{
    trueAnime(-146,arrIt[2],500,'SINE_IN',1,'heat_plan',continue3);
}
function player1_4() 
{
    trueAnime(68,arrIt[3],300,'SINE_IN',1,'heat_plan',continue4);
}
function player2_4() 
{
    trueAnime(136,arrIt[3],500,'SINE_IN',1,'heat_plan',continue4);
}
function player3_4() 
{
    trueAnime(-78,arrIt[3],300,'SINE_IN',1,'heat_plan',continue4);
}
function player4_4() 
{
    trueAnime(-156,arrIt[3],500,'SINE_IN',1,'heat_plan',continue4);
}

function player1_5() 
{
    trueAnime(68,arrIt[4],300,'SINE_IN',1,'heat_plan',continue5);
}
function player2_5() 
{
    trueAnime(136,arrIt[4],500,'SINE_IN',1,'heat_plan',continue5);
}
function player3_5() 
{
    trueAnime(-68,arrIt[4],300,'SINE_IN',1,'heat_plan',continue5);
}
function player4_5() 
{
    trueAnime(-146,arrIt[4],500,'SINE_IN',1,'heat_plan',continue5);
}

function player1_12()
{
    trueAnime(68,arrIt2[0],300,'SINE_IN',1,'heat_plan',continue12);
}
function player2_12() 
{
    trueAnime(146,arrIt2[0],500,'SINE_IN',1,'heat_plan',continue12);
}
function player3_12() 
{
    trueAnime(-68,arrIt2[0],300,'SINE_IN',1,'heat_plan',continue12);
}
function player4_12() 
{
    trueAnime(-136,arrIt2[0],500,'SINE_IN',1,'heat_plan',continue12);
}

function player1_22() 
{
    trueAnime(78,arrIt2[1],300,'SINE_IN',1,'heat_plan',continue22);
}
function player2_22() 
{
    trueAnime(156,arrIt2[1],500,'SINE_IN',1,'heat_plan',continue22);
}
function player3_22() 
{
    trueAnime(-68,arrIt2[1],300,'SINE_IN',1,'heat_plan',continue22);
}
function player4_22() 
{
    trueAnime(-136,arrIt2[1],500,'SINE_IN',1,'heat_plan',continue22);
}

function player1_32() 
{
    trueAnime(78,arrIt2[2],300,'SINE_IN',1,'heat_plan',continue32);
}
function player2_32() 
{
    trueAnime(146,arrIt2[2],500,'SINE_IN',1,'heat_plan',continue32);
}
function player3_32() 
{
    trueAnime(-78,arrIt2[2],300,'SINE_IN',1,'heat_plan',continue32);
}
function player4_32() 
{
    trueAnime(-146,arrIt2[2],500,'SINE_IN',1,'heat_plan',continue32);
}
function player1_42() 
{
    trueAnime(68,arrIt2[3],300,'SINE_IN',1,'heat_plan',continue42);
}
function player2_42() 
{
    trueAnime(136,arrIt2[3],500,'SINE_IN',1,'heat_plan',continue42);
}
function player3_42() 
{
    trueAnime(-78,arrIt2[3],300,'SINE_IN',1,'heat_plan',continue42);
}
function player4_42() 
{
    trueAnime(-156,arrIt2[3],500,'SINE_IN',1,'heat_plan',continue42);
}

function player1_52() 
{
    trueAnime(68,arrIt2[4],300,'SINE_IN',1,'heat_plan',continue52);
}
function player2_52() 
{
    trueAnime(136,arrIt2[4],500,'SINE_IN',1,'heat_plan',continue52);
}
function player3_52() 
{
    trueAnime(-68,arrIt2[4],300,'SINE_IN',1,'heat_plan',continue52);
}
function player4_52() 
{
    trueAnime(-146,arrIt2[4],500,'SINE_IN',1,'heat_plan',continue52);
}

function player1_13()
{
    trueAnime(68,arrIt3[0],300,'SINE_IN',1,'heat_plan3',continue13);
}
function player2_13() 
{
    trueAnime(146,arrIt3[0],500,'SINE_IN',1,'heat_plan3',continue13);
}
function player3_13() 
{
    trueAnime(-68,arrIt3[0],300,'SINE_IN',1,'heat_plan3',continue13);
}
function player4_13() 
{
    trueAnime(-136,arrIt3[0],500,'SINE_IN',1,'heat_plan3',continue13);
}

function player1_23() 
{
    trueAnime(78,arrIt3[1],300,'SINE_IN',1,'heat_plan3',continue23);
}
function player2_23() 
{
    trueAnime(156,arrIt3[1],500,'SINE_IN',1,'heat_plan3',continue23);
}
function player3_23() 
{
    trueAnime(-68,arrIt3[1],300,'SINE_IN',1,'heat_plan3',continue23);
}
function player4_23() 
{
    trueAnime(-136,arrIt3[1],500,'SINE_IN',1,'heat_plan3',continue23);
}

function player1_33() 
{
    trueAnime(78,arrIt3[2],300,'SINE_IN',1,'heat_plan3',continue33);
}
function player2_33() 
{
    trueAnime(146,arrIt3[2],500,'SINE_IN',1,'heat_plan3',continue33);
}
function player3_33() 
{
    trueAnime(-78,arrIt3[2],300,'SINE_IN',1,'heat_plan3',continue33);
}
function player4_33() 
{
    trueAnime(-146,arrIt3[2],500,'SINE_IN',1,'heat_plan3',continue33);
}
function player1_43() 
{
    trueAnime(68,arrIt3[3],300,'SINE_IN',1,'heat_plan3',continue43);
}
function player2_43() 
{
    trueAnime(136,arrIt3[3],500,'SINE_IN',1,'heat_plan3',continue43);
}
function player3_43() 
{
    trueAnime(-78,arrIt3[3],300,'SINE_IN',1,'heat_plan3',continue43);
}
function player4_43() 
{
    trueAnime(-156,arrIt3[3],500,'SINE_IN',1,'heat_plan3',continue43);
}

function player1_53() 
{
    trueAnime(68,arrIt3[4],300,'SINE_IN',1,'heat_plan3',continue53);
}
function player2_53() 
{
    trueAnime(136,arrIt3[4],500,'SINE_IN',1,'heat_plan3',continue53);
}
function player3_53() 
{
    trueAnime(-68,arrIt3[4],300,'SINE_IN',1,'heat_plan3',continue53);
}
function player4_53() 
{
    trueAnime(-146,arrIt3[4],500,'SINE_IN',1,'heat_plan3',continue53);
}

function player1_1_1()
{
    trueAnime(68,arrIt[0],300,'SINE_IN',1,'heat_plan1',continue1_1);
}
function player2_1_1() 
{
    trueAnime(146,arrIt[0],500,'SINE_IN',1,'heat_plan1',continue1_1);
}
function player3_1_1() 
{
    trueAnime(-68,arrIt[0],300,'SINE_IN',1,'heat_plan1',continue1_1);
}
function player4_1_1() 
{
    trueAnime(-136,arrIt[0],500,'SINE_IN',1,'heat_plan1',continue1_1);
}

function player1_2_1() 
{
    trueAnime(78,arrIt[1],300,'SINE_IN',1,'heat_plan1',continue2_1);
}
function player2_2_1() 
{
    trueAnime(156,arrIt[1],500,'SINE_IN',1,'heat_plan1',continue2_1);
}
function player3_2_1() 
{
    trueAnime(-68,arrIt[1],300,'SINE_IN',1,'heat_plan1',continue2_1);
}
function player4_2_1() 
{
    trueAnime(-136,arrIt[1],500,'SINE_IN',1,'heat_plan1',continue2_1);
}

function player1_3_1() 
{
    trueAnime(78,arrIt[2],300,'SINE_IN',1,'heat_plan1',continue3_1);
}
function player2_3_1() 
{
    trueAnime(146,arrIt[2],500,'SINE_IN',1,'heat_plan1',continue3_1);
}
function player3_3_1() 
{
    trueAnime(-78,arrIt[2],300,'SINE_IN',1,'heat_plan1',continue3_1);
}
function player4_3_1() 
{
    trueAnime(-146,arrIt[2],500,'SINE_IN',1,'heat_plan1',continue3_1);
}
function player1_4_1() 
{
    trueAnime(68,arrIt[3],300,'SINE_IN',1,'heat_plan1',continue4_1);
}
function player2_4_1() 
{
    trueAnime(136,arrIt[3],500,'SINE_IN',1,'heat_plan1',continue4_1);
}
function player3_4_1() 
{
    trueAnime(-78,arrIt[3],300,'SINE_IN',1,'heat_plan1',continue4_1);
}
function player4_4_1() 
{
    trueAnime(-156,arrIt[3],500,'SINE_IN',1,'heat_plan1',continue4_1);
}

function player1_5_1() 
{
    trueAnime(68,arrIt[4],300,'SINE_IN',1,'heat_plan1',continue5_1);
}
function player2_5_1() 
{
    trueAnime(136,arrIt[4],500,'SINE_IN',1,'heat_plan1',continue5_1);
}
function player3_5_1() 
{
    trueAnime(-68,arrIt[4],300,'SINE_IN',1,'heat_plan1',continue5_1);
}
function player4_5_1() 
{
    trueAnime(-146,arrIt[4],500,'SINE_IN',1,'heat_plan1',continue5_1);
}

function player1_1_2()
{
    trueAnime(68,arrIt[0],300,'SINE_IN',1,'heat_plan2',continue1_2);
}
function player2_1_2()
{
    trueAnime(146,arrIt[0],500,'SINE_IN',1,'heat_plan2',continue1_2);
}
function player3_1_2() 
{
    trueAnime(-68,arrIt[0],300,'SINE_IN',1,'heat_plan2',continue1_2);
}
function player4_1_2() 
{
    trueAnime(-136,arrIt[0],500,'SINE_IN',1,'heat_plan2',continue1_2);
}

function player1_2_2() 
{
    trueAnime(78,arrIt[1],300,'SINE_IN',1,'heat_plan2',continue2_2);
}
function player2_2_2() 
{
    trueAnime(156,arrIt[1],500,'SINE_IN',1,'heat_plan2',continue2_2);
}
function player3_2_2() 
{
    trueAnime(-68,arrIt[1],300,'SINE_IN',1,'heat_plan2',continue2_2);
}
function player4_2_2() 
{
    trueAnime(-136,arrIt[1],500,'SINE_IN',1,'heat_plan2',continue2_2);
}

function player1_3_2() 
{
    trueAnime(78,arrIt[2],300,'SINE_IN',1,'heat_plan2',continue3_2);
}
function player2_3_2() 
{
    trueAnime(146,arrIt[2],500,'SINE_IN',1,'heat_plan2',continue3_2);
}
function player3_3_2() 
{
    trueAnime(-78,arrIt[2],300,'SINE_IN',1,'heat_plan2',continue3_2);
}
function player4_3_2() 
{
    trueAnime(-146,arrIt[2],500,'SINE_IN',1,'heat_plan2',continue3_2);
}
function player1_4_2() 
{
    trueAnime(68,arrIt[3],300,'SINE_IN',1,'heat_plan2',continue4_2);
}
function player2_4_2() 
{
    trueAnime(136,arrIt[3],500,'SINE_IN',1,'heat_plan2',continue4_2);
}
function player3_4_2() 
{
    trueAnime(-78,arrIt[3],300,'SINE_IN',1,'heat_plan2',continue4_2);
}
function player4_4_2() 
{
    trueAnime(-156,arrIt[3],500,'SINE_IN',1,'heat_plan2',continue4_2);
}

function player1_5_2() 
{
    trueAnime(68,arrIt[4],300,'SINE_IN',1,'heat_plan2',continue5_2);
}
function player2_5_2() 
{
    trueAnime(136,arrIt[4],500,'SINE_IN',1,'heat_plan2',continue5_2);
}
function player3_5_2() 
{
    trueAnime(-68,arrIt[4],300,'SINE_IN',1,'heat_plan2',continue5_2);
}
function player4_5_2() 
{
    trueAnime(-146,arrIt[4],500,'SINE_IN',1,'heat_plan2',continue5_2);
}

function player1_1_3()
{
    trueAnime(68,arrIt[0],300,'SINE_IN',1,'heat_plan3',continue1_3);
}
function player2_1_3() 
{
    trueAnime(146,arrIt[0],500,'SINE_IN',1,'heat_plan3',continue1_3);
}
function player3_1_3() 
{
    trueAnime(-68,arrIt[0],300,'SINE_IN',1,'heat_plan3',continue1_3);
}
function player4_1_3() 
{
    trueAnime(-136,arrIt[0],500,'SINE_IN',1,'heat_plan3',continue1_3);
}

function player1_2_3() 
{
    trueAnime(78,arrIt[1],300,'SINE_IN',1,'heat_plan3',continue2_3);
}
function player2_2_3() 
{
    trueAnime(156,arrIt[1],500,'SINE_IN',1,'heat_plan3',continue2_3);
}
function player3_2_3() 
{
    trueAnime(-68,arrIt[1],300,'SINE_IN',1,'heat_plan3',continue2_3);
}
function player4_2_3() 
{
    trueAnime(-136,arrIt[1],500,'SINE_IN',1,'heat_plan3',continue2_3);
}

function player1_3_3() 
{
    trueAnime(78,arrIt[2],300,'SINE_IN',1,'heat_plan3',continue3_3);
}
function player2_3_3() 
{
    trueAnime(146,arrIt[2],500,'SINE_IN',1,'heat_plan3',continue3_3);
}
function player3_3_3() 
{
    trueAnime(-78,arrIt[2],300,'SINE_IN',1,'heat_plan3',continue3_3);
}
function player4_3_3() 
{
    trueAnime(-146,arrIt[2],500,'SINE_IN',1,'heat_plan3',continue3_3);
}
function player1_4_3() 
{
    trueAnime(68,arrIt[3],300,'SINE_IN',1,'heat_plan3',continue4_3);
}
function player2_4_3() 
{
    trueAnime(136,arrIt[3],500,'SINE_IN',1,'heat_plan3',continue4_3);
}
function player3_4_3() 
{
    trueAnime(-78,arrIt[3],300,'SINE_IN',1,'heat_plan3',continue4_3);
}
function player4_4_3() 
{
    trueAnime(-156,arrIt[3],500,'SINE_IN',1,'heat_plan3',continue4_3);
}

function player1_5_3() 
{
    trueAnime(68,arrIt[4],300,'SINE_IN',1,'heat_plan3',continue5_3);
}
function player2_5_3() 
{
    trueAnime(136,arrIt[4],500,'SINE_IN',1,'heat_plan3',continue5_3);
}
function player3_5_3() 
{
    trueAnime(-68,arrIt[4],300,'SINE_IN',1,'heat_plan3',continue5_3);
}
function player4_5_3() 
{
    trueAnime(-146,arrIt[4],500,'SINE_IN',1,'heat_plan3',continue5_3);
}


var currentItem = ' ';
var nextItem = ' ';

var currentItem2 = ' ';
var nextItem2 = ' ';

var currentItem3 = ' ';
var nextItem3 = ' ';

var currentItem_1 = ' ';
var nextItem_1 = ' ';

var currentItem_2 = ' ';
var nextItem_2 = ' ';

var currentItem_3 = ' ';
var nextItem_3 = ' ';

function checkSector(arr,curIt)
{
    for(var i =0;i<arr.length;i++)
    {
        if(IR.GetPopup("heat_plan").GetItem(arr[i]).Visible == true)
            curIt = arr[i];
        IR.Log('Current item:'+curIt);
    }
}

function checkSector_1()
{
    for(var i =0;i<arrIt.length;i++)
    {
        if(IR.GetPopup("heat_plan1").GetItem(arrIt[i]).Visible == true)
            currentItem_1 = arrIt[i];
        IR.Log('Current item:'+currentItem_1);
    }
}

function checkSector_2()
{
    for(var i =0;i<arrIt.length;i++)
    {
        if(IR.GetPopup("heat_plan2").GetItem(arrIt[i]).Visible == true)
            currentItem_2 = arrIt[i];
        IR.Log('Current item:'+currentItem_2);
    }
}

function checkSector_3()
{
    for(var i =0;i<arrIt.length;i++)
    {
        if(IR.GetPopup("heat_plan3").GetItem(arrIt[i]).Visible == true)
            currentItem_3 = arrIt[i];
        IR.Log('Current item:'+currentItem_3);
    }
}

// change visibility at the end of animation
function smthInterval(delay,item,cI,nI)
{
    cI = nI;
    IR.SetTimeout(delay, function() 
    {
        IR.GetPopup("heat_plan").GetItem(item).Visible = false;
        IR.GetPopup("heat_plan").GetItem(cI).Visible = true;
    });
}

function smthInterval_1(delay,item)
{
    currentItem_1 = nextItem_1;
    IR.SetTimeout(delay, function() 
    {
        IR.GetPopup("heat_plan1").GetItem(item).Visible = false;
        IR.GetPopup("heat_plan1").GetItem(currentItem_1).Visible = true;
    });
}

function smthInterval_2(delay,item)
{
    currentItem_2 = nextItem_2;
    IR.SetTimeout(delay, function() 
    {
        IR.GetPopup("heat_plan2").GetItem(item).Visible = false;
        IR.GetPopup("heat_plan2").GetItem(currentItem_2).Visible = true;
    });
}

function smthInterval_3(delay,item)
{
    currentItem_3 = nextItem_3;
    IR.SetTimeout(delay, function() 
    {
        IR.GetPopup("heat_plan3").GetItem(item).Visible = false;
        IR.GetPopup("heat_plan3").GetItem(currentItem_3).Visible = true;
    });
}

function checkDirection()
{
    switch(currentItem)
    {
        case arrIt[0]:
            if(nextItem==arrIt[1])
            {
                player1_1();
                smthInterval(300,arrIt[0],currentItem,nextItem);
            }
            if(nextItem==arrIt[2])
            {
                player2_1();
                smthInterval(500,arrIt[0],currentItem,nextItem);
            }
            if(nextItem==arrIt[4])
            {
                player3_1();
                smthInterval(300,arrIt[0],currentItem,nextItem);
            }
            if(nextItem==arrIt[3])
            {
                player4_1();
                smthInterval(500,arrIt[0],currentItem,nextItem);
            }    
            break;
        case arrIt[1]:
            if(nextItem==arrIt[2])
            {
                player1_2();
                smthInterval(300,arrIt[1],currentItem,nextItem);                
            }
            if(nextItem==arrIt[3])
            {
                player2_2();
                smthInterval(500,arrIt[1],currentItem,nextItem);
            }
            if(nextItem==arrIt[0])
            {
                player3_2();
                smthInterval(300,arrIt[1],currentItem,nextItem);
            }
            if(nextItem==arrIt[4])
            {
                player4_2();
                smthInterval(500,arrIt[1],currentItem,nextItem);
            }
            break;
       case arrIt[2]:
            if(nextItem==arrIt[3])
            {
                player1_3();
                smthInterval(300,arrIt[2],currentItem,nextItem);
            }
            if(nextItem==arrIt[4])
            {
                player2_3();
                smthInterval(500,arrIt[2],currentItem,nextItem);
            }
            if(nextItem==arrIt[1])
            {
                player3_3();
                smthInterval(300,arrIt[2],currentItem,nextItem);
            }
            if(nextItem==arrIt[0])
            {
                player4_3();
                smthInterval(500,arrIt[2],currentItem,nextItem);
            }
            break;
        case arrIt[3]:
            if(nextItem==arrIt[2])
            {
                player3_4();
                smthInterval(300,arrIt[3],currentItem,nextItem);
            }
            if(nextItem==arrIt[1])
            {
                player4_4();
                smthInterval(500,arrIt[3],currentItem,nextItem);
            }
            if(nextItem==arrIt[4])
            {
                player1_4();
                smthInterval(300,arrIt[3],currentItem,nextItem);
            }
            if(nextItem==arrIt[0])
            {
                player2_4();
                smthInterval(500,arrIt[3],currentItem,nextItem);
            }
            break;
        case arrIt[4]:
            if(nextItem==arrIt[0])
            {
                player1_5();
                smthInterval(300,arrIt[4],currentItem,nextItem);
            }
            if(nextItem==arrIt[1])
            {
                player2_5();
                smthInterval(500,arrIt[4],currentItem,nextItem);
            }            
            if(nextItem==arrIt[3])
            {
                player3_5();
                smthInterval(300,arrIt[4],currentItem,nextItem);
            }
            if(nextItem==arrIt[2])
            {
                player4_5();
                smthInterval(500,arrIt[4],currentItem,nextItem);
            }
            break;
    }
    
}

function checkDirection2()
{
    switch(currentItem2)
    {
        case arrIt2[0]:
            if(nextItem2==arrIt2[1])
            {
                player1_12();
                smthInterval(300,arrIt2[0],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[2])
            {
                player2_12();
                smthInterval(500,arrIt2[0],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[4])
            {
                player3_12();
                smthInterval(300,arrIt2[0],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[3])
            {
                player4_12();
                smthInterval(500,arrIt2[0],currentItem2,nextItem2);
            }    
            break;
        case arrIt2[1]:
            if(nextItem2==arrIt2[2])
            {
                player1_22();
                smthInterval(300,arrIt2[1],currentItem2,nextItem2);                
            }
            if(nextItem2==arrIt2[3])
            {
                player2_22();
                smthInterval(500,arrIt2[1],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[0])
            {
                player3_22();
                smthInterval(300,arrIt2[1],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[4])
            {
                player4_22();
                smthInterval(500,arrIt2[1],currentItem2,nextItem2);
            }
            break;
       case arrIt2[2]:
            if(nextItem2==arrIt2[3])
            {
                player1_32();
                smthInterval(300,arrIt2[2],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[4])
            {
                player2_32();
                smthInterval(500,arrIt2[2],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[1])
            {
                player3_32();
                smthInterval(300,arrIt2[2],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[0])
            {
                player4_3();
                smthInterval(500,arrIt[2],currentItem2,nextItem2);
            }
            break;
        case arrIt2[3]:
            if(nextItem2==arrIt2[2])
            {
                player3_42();
                smthInterval(300,arrIt2[3],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[1])
            {
                player4_42();
                smthInterval(500,arrIt2[3],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[4])
            {
                player1_42();
                smthInterval(300,arrIt2[3],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[0])
            {
                player2_42();
                smthInterval(500,arrIt2[3],currentItem2,nextItem2);
            }
            break;
        case arrIt2[4]:
            if(nextItem2==arrIt2[0])
            {
                player1_52();
                smthInterval(300,arrIt2[4],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[1])
            {
                player2_52();
                smthInterval(500,arrIt2[4],currentItem2,nextItem2);
            }            
            if(nextItem2==arrIt2[3])
            {
                player3_52();
                smthInterval(300,arrIt2[4],currentItem2,nextItem2);
            }
            if(nextItem2==arrIt2[2])
            {
                player4_52();
                smthInterval(500,arrIt2[4],currentItem2,nextItem2);
            }
            break;
    }    
}

function checkDirection3()
{
    switch(currentItem3)
    {
        case arrIt3[0]:
            if(nextItem3==arrIt3[1])
            {
                player1_13();
                smthInterval(300,arrIt3[0],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[2])
            {
                player2_13();
                smthInterval(500,arrIt3[0],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[4])
            {
                player3_13();
                smthInterval(300,arrIt3[0],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[3])
            {
                player4_13();
                smthInterval(500,arrIt3[0],currentItem3,nextItem3);
            }    
            break;
        case arrIt3[1]:
            if(nextItem3==arrIt3[2])
            {
                player1_23();
                smthInterval(300,arrIt3[1],currentItem3,nextItem3);                
            }
            if(nextItem3==arrIt3[3])
            {
                player2_23();
                smthInterval(500,arrIt3[1],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[0])
            {
                player3_23();
                smthInterval(300,arrIt3[1],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[4])
            {
                player4_23();
                smthInterval(500,arrIt3[1],currentItem3,nextItem3);
            }
            break;
       case arrIt3[2]:
            if(nextIte32==arrI32[3])
            {
                player1_33();
                smthInterval(300,arrIt3[2],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[4])
            {
                player2_33();
                smthInterval(500,arrIt3[2],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[1])
            {
                player3_33();
                smthInterval(300,arrIt3[2],currentItem3,nextItem3);
            }
            if(nextIte32==arrI3[0])
            {
                player4_3();
                smthInterval(500,arrI3[2],currentItem3,nextItem3);
            }
            break;
        case arrIt3[3]:
            if(nextItem3==arrIt3[2])
            {
                player3_43();
                smthInterval(300,arrIt3[3],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[1])
            {
                player4_43();
                smthInterval(500,arrIt3[3],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[4])
            {
                player1_43();
                smthInterval(300,arrIt3[3],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[0])
            {
                player2_43();
                smthInterval(500,arrIt3[3],currentItem3,nextItem3);
            }
            break;
        case arrIt3[4]:
            if(nextItem3==arrIt3[0])
            {
                player1_53();
                smthInterval(300,arrIt3[4],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[1])
            {
                player2_53();
                smthInterval(500,arrIt3[4],currentItem3,nextItem3);
            }            
            if(nextItem3==arrIt3[3])
            {
                player3_53();
                smthInterval(300,arrIt3[4],currentItem3,nextItem3);
            }
            if(nextItem3==arrIt3[2])
            {
                player4_53();
                smthInterval(500,arrIt3[4],currentItem3,nextItem3);
            }
            break;
    }    
}

function checkDirection_1()
{
    switch(currentItem_1)
    {
        case arrIt[0]:
            if(nextItem_1==arrIt[1])
            {
                player1_1_1();
                smthInterval_1(300,arrIt[0]);
            }
            if(nextItem_1==arrIt[2])
            {
                player2_1_1();
                smthInterval_1(500,arrIt[0]);
            }
            if(nextItem_1==arrIt[4])
            {
                player3_1_1();
                smthInterval_1(300,arrIt[0]);
            }
            if(nextItem_1==arrIt[3])
            {
                player4_1_1();
                smthInterval_1(500,arrIt[0]);
            }    
            break;
        case arrIt[1]:
            if(nextItem_1==arrIt[2])
            {
                player1_2_1();
                smthInterval_1(300,arrIt[1]);                
            }
            if(nextItem_1==arrIt[3])
            {
                player2_2_1();
                smthInterval_1(500,arrIt[1]);
            }
            if(nextItem_1==arrIt[0])
            {
                player3_2_1();
                smthInterval_1(300,arrIt[1]);
            }
            if(nextItem_1==arrIt[4])
            {
                player4_2_1();
                smthInterval_1(500,arrIt[1]);
            }
            break;
       case arrIt[2]:
            if(nextItem_1==arrIt[3])
            {
                player1_3_1();
                smthInterval_1(300,arrIt[2]);
            }
            if(nextItem_1==arrIt[4])
            {
                player2_3_1();
                smthInterval_1(500,arrIt[2]);
            }
            if(nextItem_1==arrIt[1])
            {
                player3_3_1();
                smthInterval_1(300,arrIt[2]);
            }
            if(nextItem_1==arrIt[0])
            {
                player4_3_1();
                smthInterval_1(500,arrIt[2]);
            }
            break;
        case arrIt[3]:
            if(nextItem_1==arrIt[2])
            {
                player3_4_1();
                smthInterval_1(300,arrIt[3]);
            }
            if(nextItem_1==arrIt[1])
            {
                player4_4_1();
                smthInterval_1(500,arrIt[3]);
            }
            if(nextItem_1==arrIt[4])
            {
                player1_4_1();
                smthInterval_1(300,arrIt[3]);
            }
            if(nextItem_1==arrIt[0])
            {
                player2_4_1();
                smthInterval_1(500,arrIt[3]);
            }
            break;
        case arrIt[4]:
            if(nextItem_1==arrIt[0])
            {
                player1_5_1();
                smthInterval_1(300,arrIt[4]);
            }
            if(nextItem_1==arrIt[1])
            {
                player2_5_1();
                smthInterval_1(500,arrIt[4]);
            }            
            if(nextItem_1==arrIt[3])
            {
                player3_5_1();
                smthInterval_1(300,arrIt[4]);
            }
            if(nextItem_1==arrIt[2])
            {
                player4_5_1();
                smthInterval_1(500,arrIt[4]);
            }
            break;
    }    
}

function checkDirection_2()
{
    switch(currentItem_2)
    {
        case arrIt[0]:
            if(nextItem_2==arrIt[1])
            {
                player1_1_2();
                smthInterval_2(300,arrIt[0]);
            }
            if(nextItem_2==arrIt[2])
            {
                player2_1_2();
                smthInterval_2(500,arrIt[0]);
            }
            if(nextItem_2==arrIt[4])
            {
                player3_1_2();
                smthInterval_2(300,arrIt[0]);
            }
            if(nextItem_2==arrIt[3])
            {
                player4_1_2();
                smthInterval_2(500,arrIt[0]);
            }    
            break;
        case arrIt[1]:
            if(nextItem_2==arrIt[2])
            {
                player1_2_2();
                smthInterval_2(300,arrIt[1]);                
            }
            if(nextItem_2==arrIt[3])
            {
                player2_2_2();
                smthInterval_2(500,arrIt[1]);
            }
            if(nextItem_2==arrIt[0])
            {
                player3_2_2();
                smthInterval_2(300,arrIt[1]);
            }
            if(nextItem_2==arrIt[4])
            {
                player4_2_2();
                smthInterval_2(500,arrIt[1]);
            }
            break;
       case arrIt[2]:
            if(nextItem_2==arrIt[3])
            {
                player1_3_2();
                smthInterval_2(300,arrIt[2]);
            }
            if(nextItem_2==arrIt[4])
            {
                player2_3_2();
                smthInterval_2(500,arrIt[2]);
            }
            if(nextItem_2==arrIt[1])
            {
                player3_3_2();
                smthInterval_2(300,arrIt[2]);
            }
            if(nextItem_2==arrIt[0])
            {
                player4_3_2();
                smthInterval_2(500,arrIt[2]);
            }
            break;
        case arrIt[3]:
            if(nextItem_2==arrIt[2])
            {
                player3_4_2();
                smthInterval_2(300,arrIt[3]);
            }
            if(nextItem_2==arrIt[1])
            {
                player4_4_2();
                smthInterval_2(500,arrIt[3]);
            }
            if(nextItem_2==arrIt[4])
            {
                player1_4_2();
                smthInterval_2(300,arrIt[3]);
            }
            if(nextItem_2==arrIt[0])
            {
                player2_4_2();
                smthInterval_2(500,arrIt[3]);
            }
            break;
        case arrIt[4]:
            if(nextItem_2==arrIt[0])
            {
                player1_5_2();
                smthInterval_2(300,arrIt[4]);
            }
            if(nextItem_2==arrIt[1])
            {
                player2_5_2();
                smthInterval_2(500,arrIt[4]);
            }            
            if(nextItem_2==arrIt[3])
            {
                player3_5_2();
                smthInterval_2(300,arrIt[4]);
            }
            if(nextItem_2==arrIt[2])
            {
                player4_5_2();
                smthInterval_2(500,arrIt[4]);
            }
            break;
    }    
}

function checkDirection_3()
{
    switch(currentItem_3)
    {
        case arrIt[0]:
            if(nextItem_3==arrIt[1])
            {
                player1_1_3();
                smthInterval_3(300,arrIt[0]);
            }
            if(nextItem_3==arrIt[2])
            {
                player2_1_3();
                smthInterval_3(500,arrIt[0]);
            }
            if(nextItem_3==arrIt[4])
            {
                player3_1_3();
                smthInterval_3(300,arrIt[0]);
            }
            if(nextItem_3==arrIt[3])
            {
                player4_1_3();
                smthInterval_3(500,arrIt[0]);
            }    
            break;
        case arrIt[1]:
            if(nextItem_3==arrIt[2])
            {
                player1_2_3();
                smthInterval_3(300,arrIt[1]);                
            }
            if(nextItem_3==arrIt[3])
            {
                player2_2_3();
                smthInterval_3(500,arrIt[1]);
            }
            if(nextItem_3==arrIt[0])
            {
                player3_2_3();
                smthInterval_3(300,arrIt[1]);
            }
            if(nextItem_3==arrIt[4])
            {
                player4_2_3();
                smthInterval_3(500,arrIt[1]);
            }
            break;
       case arrIt[2]:
            if(nextItem_3==arrIt[3])
            {
                player1_3_3();
                smthInterval_3(300,arrIt[2]);
            }
            if(nextItem_3==arrIt[4])
            {
                player2_3_3();
                smthInterval_3(500,arrIt[2]);
            }
            if(nextItem_3==arrIt[1])
            {
                player3_3_3();
                smthInterval_3(300,arrIt[2]);
            }
            if(nextItem_3==arrIt[0])
            {
                player4_3_3();
                smthInterval_3(500,arrIt[2]);
            }
            break;
        case arrIt[3]:
            if(nextItem_3==arrIt[2])
            {
                player3_4_3();
                smthInterval_3(300,arrIt[3]);
            }
            if(nextItem_3==arrIt[1])
            {
                player4_4_3();
                smthInterval_3(500,arrIt[3]);
            }
            if(nextItem_3==arrIt[4])
            {
                player1_4_3();
                smthInterval_3(300,arrIt[3]);
            }
            if(nextItem_3==arrIt[0])
            {
                player2_4_3();
                smthInterval_3(500,arrIt[3]);
            }
            break;
        case arrIt[4]:
            if(nextItem_3==arrIt[0])
            {
                player1_5_3();
                smthInterval_3(300,arrIt[4]);
            }
            if(nextItem_3==arrIt[1])
            {
                player2_5_3();
                smthInterval_3(500,arrIt[4]);
            }            
            if(nextItem_3==arrIt[3])
            {
                player3_5_3();
                smthInterval_3(300,arrIt[4]);
            }
            if(nextItem_3==arrIt[2])
            {
                player4_5_3();
                smthInterval_3(500,arrIt[4]);
            }
            break;
    }    
}


function checkToWhere(button)
{
    switch(button)
    {
        case 'liv_shed_1':
            nextItem = arrIt[2];
            checkDirection();
            break;
        case 'liv_shed_2':
            nextItem = arrIt[2];
            checkDirection();
            break;
        case 'liv_shed_3':
            nextItem = arrIt[2];
            checkDirection();
            break;
        case 'liv_min_1':
            nextItem = arrIt[3];
            checkDirection();
            break;
        case 'liv_min_2':
            nextItem = arrIt[3];
            checkDirection();
            break;
        case 'liv_min_3':
            nextItem = arrIt[3];
            checkDirection();
            break;
        case 'liv_norm_1':
            nextItem = arrIt[4];
            checkDirection();
            break;
        case 'liv_norm_2':
            nextItem = arrIt[4];
            checkDirection();
            break;
        case 'liv_norm_3':
            nextItem = arrIt[4];
            checkDirection();
            break;
        case 'liv_norm_4':
            nextItem = arrIt[4];
            checkDirection();
            break;
        case 'liv_comf_1':
            nextItem = arrIt[0];
            checkDirection();
            break;
        case 'liv_comf_2':
            nextItem = arrIt[0];
            checkDirection();
            break;
        case 'liv_comf_3':
            nextItem = arrIt[0];
            checkDirection();
            break;
        case 'liv_comf_4':
            nextItem = arrIt[0];
            checkDirection();
            break;
        case 'liv_max_1':
            nextItem = arrIt[1];
            checkDirection();
            break;
        case 'liv_max_2':
            nextItem = arrIt[1];
            checkDirection();
            break;
        case 'liv_max_3':
            nextItem = arrIt[1];
            checkDirection();
            break;
        case 'cab_shed_1':
            nextItem2 = arrIt2[2];
            checkDirection2();
            break;
        case 'cab_shed_2':
            nextItem2 = arrIt2[2];
            checkDirection2();
            break;
        case 'cab_shed_3':
            nextItem2 = arrIt2[2];
            checkDirection2();
            break;
        case 'cab_min_1':
            nextItem2 = arrIt2[3];
            checkDirection2();
            break;
        case 'cab_min_2':
            nextItem2 = arrIt2[3];
            checkDirection2();
            break;
        case 'cab_min_3':
            nextItem2 = arrIt2[3];
            checkDirection2();
            break;
        case 'cab_norm_1':
            nextItem2 = arrIt2[4];
            checkDirection2();
            break;
        case 'cab_norm_2':
            nextItem2 = arrIt2[4];
            checkDirection2();
            break;
        case 'cab_norm_3':
            nextItem2 = arrIt2[4];
            checkDirection2();
            break;
        case 'cab_norm_4':
            nextItem2 = arrIt2[4];
            checkDirection2();
            break;
        case 'cab_comf_1':
            nextItem2 = arrIt2[0];
            checkDirection2();
            break;
        case 'cab_comf_2':
            nextItem2 = arrIt2[0];
            checkDirection2();
            break;
        case 'cab_comf_3':
            nextItem2 = arrIt2[0];
            checkDirection2();
            break;
        case 'cab_comf_4':
            nextItem2 = arrIt2[0];
            checkDirection2();
            break;
        case 'cab_max_1':
            nextItem2 = arrIt2[1];
            checkDirection2();
            break;
        case 'cab_max_2':
            nextItem2 = arrIt2[1];
            checkDirection2();
            break;
        case 'cab_max_3':
            nextItem2 = arrIt2[1];
            checkDirection2();
            break;
        case 'bed_shed_1':
            nextItem3 = arrIt3[2];
            checkDirection3();
            break;
        case 'bed_shed_2':
            nextItem3 = arrIt3[2];
            checkDirection3();
            break;
        case 'bed_shed_3':
            nextItem3 = arrIt3[2];
            checkDirection3();
            break;
        case 'bed_min_1':
            nextItem3 = arrIt3[3];
            checkDirection3();
            break;
        case 'bed_min_2':
            nextItem3 = arrIt3[3];
            checkDirection3();
            break;
        case 'bed_min_3':
            nextItem3 = arrIt3[3];
            checkDirection3();
            break;
        case 'bed_norm_1':
            nextItem3 = arrIt3[4];
            checkDirection3();
            break;
        case 'bed_norm_2':
            nextItem3 = arrIt3[4];
            checkDirection3();
            break;
        case 'cab_norm_3':
            nextItem2 = arrIt2[4];
            checkDirection2() ;
            break;
        case 'bed_norm_4':
            nextItem3 = arrIt3[4];
            checkDirection3();
            break;
        case 'bed_comf_1':
            nextItem3 = arrIt3[0];
            checkDirection3();
            break;
        case 'bed_comf_2':
            nextItem3 = arrIt3[0];
            checkDirection3();
            break;
        case 'bed_comf_3':
            nextItem3 = arrIt3[0];
            checkDirection3();
            break;
        case 'bed_comf_4':
            nextItem3 = arrIt3[0];
            checkDirection3();
            break;
        case 'bed_max_1':
            nextItem3 = arrIt3[1];
            checkDirection3();
            break;
        case 'bed_max_2':
            nextItem3 = arrIt3[1];
            checkDirection3();
            break;
        case 'bed_max_3':
            nextItem3 = arrIt3[1];
            checkDirection3();
            break;
    }
}

function checkToWhere_1(button)
{
    switch(button)
    {
        case 'liv_shed_1':
            nextItem_1 = arrIt[2];
            checkDirection_1() ;
            break;
        case 'liv_shed_2':
            nextItem_1 = arrIt[2];
            checkDirection_1() ;
            break;
        case 'liv_shed_3':
            nextItem_1 = arrIt[2];
            checkDirection_1() ;
            break;
        case 'liv_min_1':
            nextItem_1 = arrIt[3];
            checkDirection_1() ;
            break;
        case 'liv_min_2':
            nextItem_1 = arrIt[3];
            checkDirection_1() ;
            break;
        case 'liv_min_3':
            nextItem_1 = arrIt[3];
            checkDirection_1() ;
            break;
        case 'liv_norm_1':
            nextItem_1 = arrIt[4];
            checkDirection_1() ;
            break;
        case 'liv_norm_2':
            nextItem_1 = arrIt[4];
            checkDirection_1() ;
            break;
        case 'liv_norm_3':
            nextItem_1 = arrIt[4];
            checkDirection_1() ;
            break;
        case 'liv_norm_4':
            nextItem_1 = arrIt[4];
            checkDirection_1() ;
            break;
        case 'liv_comf_1':
            nextItem_1 = arrIt[0];
            checkDirection_1() ;
            break;
        case 'liv_comf_2':
            nextItem_1 = arrIt[0];
            checkDirection_1() ;
            break;
        case 'liv_comf_3':
            nextItem_1 = arrIt[0];
            checkDirection_1() ;
            break;
        case 'liv_comf_4':
            nextItem_1 = arrIt[0];
            checkDirection_1() ;
            break;
        case 'liv_max_1':
            nextItem_1 = arrIt[1];
            checkDirection_1() ;
            break;
        case 'liv_max_2':
            nextItem_1 = arrIt[1];
            checkDirection_1() ;
            break;
        case 'liv_max_3':
            nextItem_1 = arrIt[1];
            checkDirection_1() ;
            break;
    }
}

function checkToWhere_2(button)
{
    switch(button)
    {
        case 'liv_shed_1':
            nextItem_2 = arrIt[2];
            checkDirection_2() ;
            break;
        case 'liv_shed_2':
            nextItem_2 = arrIt[2];
            checkDirection_2() ;
            break;
        case 'liv_shed_3':
            nextItem_2 = arrIt[2];
            checkDirection_2() ;
            break;
        case 'liv_min_1':
            nextItem_2 = arrIt[3];
            checkDirection_2() ;
            break;
        case 'liv_min_2':
            nextItem_2 = arrIt[3];
            checkDirection_2() ;
            break;
        case 'liv_min_3':
            nextItem_2 = arrIt[3];
            checkDirection_2() ;
            break;
        case 'liv_norm_1':
            nextItem_2 = arrIt[4];
            checkDirection_2() ;
            break;
        case 'liv_norm_2':
            nextItem_2 = arrIt[4];
            checkDirection_2() ;
            break;
        case 'liv_norm_3':
            nextItem_2 = arrIt[4];
            checkDirection_2() ;
            break;
        case 'liv_norm_4':
            nextItem_2 = arrIt[4];
            checkDirection_2() ;
            break;
        case 'liv_comf_1':
            nextItem_2 = arrIt[0];
            checkDirection_2() ;
            break;
        case 'liv_comf_2':
            nextItem_2 = arrIt[0];
            checkDirection_2() ;
            break;
        case 'liv_comf_3':
            nextItem_2 = arrIt[0];
            checkDirection_2() ;
            break;
        case 'liv_comf_4':
            nextItem_2 = arrIt[0];
            checkDirection_2() ;
            break;
        case 'liv_max_1':
            nextItem_2 = arrIt[1];
            checkDirection_2() ;
            break;
        case 'liv_max_2':
            nextItem_2 = arrIt[1];
            checkDirection_2() ;
            break;
        case 'liv_max_3':
            nextItem_2 = arrIt[1];
            checkDirection_2() ;
            break;
    }
}

function checkToWhere_3(button)
{
    switch(button)
    {
        case 'liv_shed_1':
            nextItem_3 = arrIt[2];
            checkDirection_3() ;
            break;
        case 'liv_shed_2':
            nextItem_3 = arrIt[2];
            checkDirection_3() ;
            break;
        case 'liv_shed_3':
            nextItem_3 = arrIt[2];
            checkDirection_3() ;
            break;
        case 'liv_min_1':
            nextItem_3 = arrIt[3];
            checkDirection_3() ;
            break;
        case 'liv_min_2':
            nextItem_3 = arrIt[3];
            checkDirection_3() ;
            break;
        case 'liv_min_3':
            nextItem_3 = arrIt[3];
            checkDirection_3() ;
            break;
        case 'liv_norm_1':
            nextItem_3 = arrIt[4];
            checkDirection_3() ;
            break;
        case 'liv_norm_2':
            nextItem_3 = arrIt[4];
            checkDirection_3() ;
            break;
        case 'liv_norm_3':
            nextItem_3 = arrIt[4];
            checkDirection_3() ;
            break;
        case 'liv_norm_4':
            nextItem_3 = arrIt[4];
            checkDirection_3() ;
            break;
        case 'liv_comf_1':
            nextItem_3 = arrIt[0];
            checkDirection_3() ;
            break;
        case 'liv_comf_2':
            nextItem_3 = arrIt[0];
            checkDirection_3() ;
            break;
        case 'liv_comf_3':
            nextItem_3 = arrIt[0];
            checkDirection_3() ;
            break;
        case 'liv_comf_4':
            nextItem_3 = arrIt[0];
            checkDirection_3() ;
            break;
        case 'liv_max_1':
            nextItem_3 = arrIt[1];
            checkDirection_3() ;
            break;
        case 'liv_max_2':
            nextItem_3 = arrIt[1];
            checkDirection_3() ;
            break;
        case 'liv_max_3':
            nextItem_3 = arrIt[1];
            checkDirection_3() ;
            break;
    }
}

function checkPress(button,popup)
{
    switch(popup)
    {
        case 'heat_plan':
            IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup(popup).GetItem(button), function ()
            {
                checkToWhere(button);
            });
            break;
        case 'heat_plan1':
            IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup(popup).GetItem(button), function ()
            {
                checkToWhere_1(button);
            });
            break;
        case 'heat_plan2':
            IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup(popup).GetItem(button), function ()
            {
                checkToWhere_2(button);
            });
            break;
         case 'heat_plan3':
            IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup(popup).GetItem(button), function ()
            {
                checkToWhere_3(button);
            });
            break;      
    }
    
}

IR.AddListener(IR.EVENT_START,0,function()
    {
        checkSector(arrIt,currentItem);
        checkSector(arrIt2,currentItem2);
        checkSector(arrIt3,currentItem3);
        checkSector_1();
        checkSector_2();
        checkSector_3();
    });

checkPress('liv_min_1','heat_plan');
checkPress('liv_min_2','heat_plan');
checkPress('liv_min_3','heat_plan');
checkPress('liv_norm_1','heat_plan');
checkPress('liv_norm_2','heat_plan');
checkPress('liv_norm_3','heat_plan');
checkPress('liv_norm_4','heat_plan');
checkPress('liv_comf_1','heat_plan');
checkPress('liv_comf_2','heat_plan');
checkPress('liv_comf_3','heat_plan');
checkPress('liv_comf_4','heat_plan');
checkPress('liv_max_1','heat_plan');
checkPress('liv_max_2','heat_plan');
checkPress('liv_max_3','heat_plan');
checkPress('liv_shed_1','heat_plan');
checkPress('liv_shed_2','heat_plan');
checkPress('liv_shed_3','heat_plan');

checkPress('liv_min_1','heat_plan1');
checkPress('liv_min_2','heat_plan1');
checkPress('liv_min_3','heat_plan1');
checkPress('liv_norm_1','heat_plan1');
checkPress('liv_norm_2','heat_plan1');
checkPress('liv_norm_3','heat_plan1');
checkPress('liv_norm_4','heat_plan1');
checkPress('liv_comf_1','heat_plan1');
checkPress('liv_comf_2','heat_plan1');
checkPress('liv_comf_3','heat_plan1');
checkPress('liv_comf_4','heat_plan1');
checkPress('liv_max_1','heat_plan1');
checkPress('liv_max_2','heat_plan1');
checkPress('liv_max_3','heat_plan1');
checkPress('liv_shed_1','heat_plan1');
checkPress('liv_shed_2','heat_plan1');
checkPress('liv_shed_3','heat_plan1');

checkPress('liv_min_1','heat_plan2');
checkPress('liv_min_2','heat_plan2');
checkPress('liv_min_3','heat_plan2');
checkPress('liv_norm_1','heat_plan2');
checkPress('liv_norm_2','heat_plan2');
checkPress('liv_norm_3','heat_plan2');
checkPress('liv_norm_4','heat_plan2');
checkPress('liv_comf_1','heat_plan2');
checkPress('liv_comf_2','heat_plan2');
checkPress('liv_comf_3','heat_plan2');
checkPress('liv_comf_4','heat_plan2');
checkPress('liv_max_1','heat_plan2');
checkPress('liv_max_2','heat_plan2');
checkPress('liv_max_3','heat_plan2');
checkPress('liv_shed_1','heat_plan2');
checkPress('liv_shed_2','heat_plan2');
checkPress('liv_shed_3','heat_plan2');

checkPress('liv_min_1','heat_plan3');
checkPress('liv_min_2','heat_plan3');
checkPress('liv_min_3','heat_plan3');
checkPress('liv_norm_1','heat_plan3');
checkPress('liv_norm_2','heat_plan3');
checkPress('liv_norm_3','heat_plan3');
checkPress('liv_norm_4','heat_plan3');
checkPress('liv_comf_1','heat_plan3');
checkPress('liv_comf_2','heat_plan3');
checkPress('liv_comf_3','heat_plan3');
checkPress('liv_comf_4','heat_plan3');
checkPress('liv_max_1','heat_plan3');
checkPress('liv_max_2','heat_plan3');
checkPress('liv_max_3','heat_plan3');
checkPress('liv_shed_1','heat_plan3');
checkPress('liv_shed_2','heat_plan3');
checkPress('liv_shed_3','heat_plan3');
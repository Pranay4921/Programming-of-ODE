// JavaScript source code
//Please Change dt value, dt for more agreement with exact


U0 = 1;                            //Initial Condition                                (CAN BE TUNED)
T = 8;                              //Solution for 0<=t<=20                            (CAN BE TUNED)
dt = 4;                              //Step size                                        (OUGHT TO BE TUNED)
N = T / dt;                          //Number of steps to be performed                  (CAN BE TUNED)

N_exact = 20;                       //Number of points for exact equation               (CAN BE TUNED)

let u = [];
let t = [];
let u_exact = [];
let t_exact = [];


function f(x, y) {
    return -y;
}


function RK2_func(f, U_0, Delt, n) {
    u[0] = U_0;
    t[0] = 0;
    for (i = 1; i <= n; i++) {
        K1 = f((i - 1) * Delt, u[i - 1]);
        K2 = f((i - 0.5) * Delt, u[i - 1] + 0.5 * Delt * K1);
        u[i] = u[i - 1] + K2*Delt;
        t[i] = t[i - 1] + Delt;
    }

}

function exact_fun(Tcap,n) {
    for (i = 0; i <= n; i++) {
        u_exact[i] = Math.exp(-i * Tcap / n);
        t_exact[i] = i * Tcap / n;
    }
    //document.write(t_exact);
}

function main_F() {                                                                 //This is main function which will be running befor p5.js function
    RK2_func(f, U0, dt, N);
    exact_fun(T,N_exact);
}






//-----------p5.js plotting------------
function setup() {
    createCanvas(600, 600);
	frameRate(1);
}

function draw() {
	
	main_F();
	
    background(200);
    let psx = 10;                                    // Plot scale used for x axis              (CAN BE TUNED)
    let psy = 4;                                    // Plot scale used for y axis              (CAN BE TUNED)

    //---------------Axis----------------------
    stroke(0);
    strokeWeight(1);
    line(width / psx, height - height / psy, width / psx, height / psy);
    line(width / psx, height - height / psy, width - width / psx, height - height / psy);
    y = 1;
    for (i = height - 2 * height / psy; i > 0; i = i - height / psy) {
        line(width / psx - 2, i, width / psx + 2, i);
        text(y, width / (2*psx) , i);
        y++;
    }
    x = 1;
    for (i = 2 * width / psx; i <width; i = i + width / psx) {
        line(i,height-height/psy-2,i,height-height/psy+2);
        text(x, i, height-height / (2 * psy));
        x++;
    }

    //---------------------Numerical Solution RK2--------------------
    for (i = 1; i <= N; i++) {
        X1 = (t[i-1] + 1) * width / psx;
        Y1 = height - height / psy - u[i - 1] * height / psy;
        X2 = (t[i] + 1) * width / psx;
        Y2 = height - height / psy - u[i] * height / psy;
        stroke('red');
        strokeWeight(1);
        line(X1, Y1, X2, Y2);
        strokeWeight(2);
        point(X2, Y2);
    }
	

    //---------------------Exact Solution--------------------
    stroke(0);
    strokeWeight(1);

    for (i = 1; i <= N_exact; i++) {
        X1 = (t_exact[i - 1] + 1) * width / psx;
        Y1 = height - height / psy - u_exact[i - 1] * height / psy;
        X2 = (t_exact[i] + 1) * width / psx;
        Y2 = height - height / psy - u_exact[i] * height / psy;
        line(X1, Y1, X2, Y2);
    }

    //-------------------LEGEND--------------------------------
    lpx = 5;                                           //Legend position x axis                    (CAN BE TUNED)
    lpy = 10;                                           //Legend position y axis                    (CAN BE TUNED)
    lplw = 5;                                           //Legend plotline width                     (CAN BE TUNED)
    ld = 15;                                             //Legend distance                           (CAN BE TUNED)

        //Exact Legend
    stroke(0);
	text('dt=', width - width / lpx-2*
	lplw, height / lpy-ld);
	text(dt, width - width / lpx + 2 * lplw, height / lpy-ld);
    line(width - width / lpx - lplw, height / lpy, width - width / lpx + lplw, height / lpy);
    text('Exact', width - width / lpx + 2 * lplw, height / lpy);
        //RK2 legend
    stroke('red');
    line(width - width / lpx - lplw, height / lpy + ld, width - width / lpx + lplw, height / lpy + ld);
    stroke(0);
    text('RK2', width - width / lpx + 2 * lplw, height / lpy+ld);
		
	
	
	if (dt>0.005){
		dt = dt/2;
		N = T/dt;
	}
}
// JavaScript source code
//Please Change dt value, dt for more agreement with exact

eps = 0.001;
U0 = 1+Math.sqrt(eps);                            //Initial Condition                                (CAN BE TUNED)
T = 4;                              //Solution for 0<=t<=20                            (CAN BE TUNED)
dt = 0.1;                              //Step size                                        (OUGHT TO BE TUNED)
N = T / dt;                          //Number of steps to be performed                  (CAN BE TUNED)

N_exact = 20;                       //Number of points for exact equation               (CAN BE TUNED)

let u_FE = [];
let t_FE = [];
let u_RK4 = [];
let t_RK4 = [];
let u_exact = [];
let t_exact = [];


function f(x, y) {
    return 1/(2*(y-1));
}

function ForwardEuler(f, U_0, Delt, n) {
    u_FE[0] = U_0;
    t_FE[0] = 0;
    for (i = 1; i <= n; i++) {
        u_FE[i] = u_FE[i - 1] + Delt * f((i-1) * Delt, u_FE[i - 1]);
        t_FE[i] = t_FE[i - 1] + Delt;
    }

}

function RK4_func(f, U_0, Delt, n) {
    u_RK4[0] = U_0;
    t_RK4[0] = 0;
    for (i = 1; i <= n; i++) {
        K1 = f((i - 1) * Delt, u_RK4[i - 1]);
        K2 = f((i - 0.5) * Delt, u_RK4[i - 1] + 0.5 * Delt * K1);
        K3 = f((i - 0.5) * Delt, u_RK4[i - 1] + 0.5 * Delt * K2);
        K4 = f((i) * Delt, u_RK4[i - 1] + Delt * K3);
        u_RK4[i] = u_RK4[i - 1] + (K1 + 2 * K2 + 2 * K3 + K4) * Delt / 6;
        t_RK4[i] = t_RK4[i - 1] + Delt;
    }

}


function exact_fun(Tcap,n) {
    for (i = 0; i <= n; i++) {
        u_exact[i] = 1 + Math.sqrt( (i * Tcap / n)+eps);
        t_exact[i] = i * Tcap / n;
    }
    //document.write(t_exact);
}

function main_F() {                                                                 //This is main function which will be running befor p5.js function
    ForwardEuler(f, U0, dt, N);
    RK4_func(f, U0, dt, N);
    exact_fun(T,N_exact);
}

main_F();




//-----------p5.js plotting------------
function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(200);
    let psx = 7;                                    // Plot scale used for x axis              (CAN BE TUNED)
    let psy = 7;                                    // Plot scale used for y axis              (CAN BE TUNED)

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

    //---------------------Forward Euler Solution--------------------
    for (i = 1; i <= N; i++) {
        X1 = (t_FE[i-1] + 1) * width / psx;
        Y1 = height - height / psy - u_FE[i - 1] * height / psy;
        X2 = (t_FE[i] + 1) * width / psx;
        Y2 = height - height / psy - u_FE[i] * height / psy;
        stroke('red');
        strokeWeight(1);
        line(X1, Y1, X2, Y2);
    }

    //---------------------RK4 Solution---------------------------------
    for (i = 1; i <= N; i++) {
        X1 = (t_RK4[i - 1] + 1) * width / psx;
        Y1 = height - height / psy - u_RK4[i - 1] * height / psy;
        X2 = (t_RK4[i] + 1) * width / psx;
        Y2 = height - height / psy - u_RK4[i] * height / psy;
        stroke('blue');
        strokeWeight(1);
        line(X1, Y1, X2, Y2);
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
    line(width - width / lpx - lplw, height / lpy, width - width / lpx + lplw, height / lpy);
    text('Exact', width - width / lpx + 2 * lplw, height / lpy);
        //Forward Euler legend
    stroke('red');
    line(width - width / lpx - lplw, height / lpy + ld, width - width / lpx + lplw, height / lpy + ld);
    stroke(0);
    text('ForwardEuler', width - width / lpx + 2 * lplw, height / lpy + ld);
    stroke('blue');
    line(width - width / lpx - lplw, height / lpy + 2*ld, width - width / lpx + lplw, height / lpy + 2*ld);
    stroke(0);
    text('RK4', width - width / lpx + 2 * lplw, height / lpy + 2*ld);
}
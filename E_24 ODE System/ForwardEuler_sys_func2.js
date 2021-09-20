// JavaScript source code
//Please Change dt value, dt for more agreement with exact


U0 = 2;                            //Initial Condition                                (CAN BE TUNED)
V0 = 3;
T = 5;                              //Solution for 0<=t<=20                            (CAN BE TUNED)
dt = 1;                              //Step size                                        (OUGHT TO BE TUNED)
N = T / dt;                          //Number of steps to be performed                  (CAN BE TUNED)

N_exact = 20;                       //Number of points for exact equation               (CAN BE TUNED)

let u = [];
let v = [];
let t = [];
let u_exact = [];
let v_exact = [];
let t_exact = [];


function f(x, y_u, y_v) {
    return 3 + Math.pow((3 + 4 * x - y_v), 3);
}

function g(x, y_u, y_v) {
    return 4 + Math.pow((2 + 3 * x - y_u), 4);
}

function ForwardEuler(f, U_0, V_0, Delt, n) {
    u[0] = U_0;
    v[0] = V_0;
    t[0] = 0;
    for (i = 1; i <= n; i++) {
        u[i] = u[i - 1] + Delt * f((i - 1) * Delt, u[i - 1], v[i - 1]);
        v[i] = v[i - 1] + Delt * g((i - 1) * Delt, u[i - 1], v[i - 1]);
        t[i] = t[i - 1] + Delt;
    }

}

function exact_fun(Tcap,n) {
    for (i = 0; i <= n; i++) {
        u_exact[i] = 2 + 3 * i * Tcap / n;
        v_exact[i] = 3 + 4 * i * Tcap / n;
        t_exact[i] = i * Tcap / n;
    }
    //document.write(t_exact);
}

function main_F() {                                                                 //This is main function which will be running befor p5.js function
    ForwardEuler(f, U0,V0, dt, N);
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
    let psy = 25;                                    // Plot scale used for y axis              (CAN BE TUNED)

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

    //---------------------Forward Euler Solution (u) --------------------
    for (i = 1; i <= N; i++) {
        X1 = (t[i-1] + 1) * width / psx;
        Y1 = height - height / psy - u[i - 1] * height / psy;
        X2 = (t[i] + 1) * width / psx;
        Y2 = height - height / psy - u[i] * height / psy;
        stroke('red');
        strokeWeight(1);
        line(X1, Y1, X2, Y2);
        strokeWeight(10);
        point(X2, Y2);
    }

    //---------------------Forward Euler Solution (v) --------------------
    for (i = 1; i <= N; i++) {
        X1 = (t[i - 1] + 1) * width / psx;
        Y1 = height - height / psy - v[i - 1] * height / psy;
        X2 = (t[i] + 1) * width / psx;
        Y2 = height - height / psy - v[i] * height / psy;
        stroke('blue');
        strokeWeight(1);
        line(X1, Y1, X2, Y2);
        strokeWeight(10);
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

    stroke(0);
    strokeWeight(1);

    for (i = 1; i <= N_exact; i++) {
        X1 = (t_exact[i - 1] + 1) * width / psx;
        Y1 = height - height / psy - v_exact[i - 1] * height / psy;
        X2 = (t_exact[i] + 1) * width / psx;
        Y2 = height - height / psy - v_exact[i] * height / psy;
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
    text('ForwardEuler (u)', width - width / lpx + 2 * lplw, height / lpy + ld);
    stroke('blue');
    line(width - width / lpx - lplw, height / lpy + 2*ld, width - width / lpx + lplw, height / lpy + 2*ld);
    stroke(0);
    text('ForwardEuler (v)', width - width / lpx + 2 * lplw, height / lpy + 2*ld);
}
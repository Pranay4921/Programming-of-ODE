// JavaScript source code
//Please Change dt value, dt for more agreement with exact

// Current code solves the drag equation - stokes problem

g = 9.81;
rho_b = 1003;
rho = 0.79;
C_D = 0.6;
A = 0.9;
V = 0.08
m = 80;

U0 = 0;                            //Initial Condition                                (CAN BE TUNED)
T = 20;                              //Solution for 0<=t<=200                            (CAN BE TUNED)
dt = 0.5;                              //Step size                                        (OUGHT TO BE TUNED)
N = T / dt;                          //Number of steps to be performed                  (CAN BE TUNED)


let u = [];
let u_abs = [];
let t = [];
let Fd = [];


function f(x, y) {
    return (-g * (1 - rho / rho_b)-(0.5*C_D*(rho/rho_b)*(A/V)*(Math.pow(y,2))*Math.sign(y)));
}

function ForwardEuler(f, U_0, Delt, n) {
    u[0] = U_0;
    u_abs[0] = Math.abs(u[0]);
    t[0] = 0;
    for (i = 1; i <= n; i++) {
        u[i] = u[i - 1] + Delt * f((i-1) * Delt, u[i - 1]);
        t[i] = t[i - 1] + Delt;
        u_abs[i] = Math.abs(u[i]);
    }
}

function dragforce() {
    for (i = 0; i < u.length; i++) {
        Fd[i] = 20*(u[i] * u[i]) / (u[u.length - 1] * u[u.length - 1]);
    }
    document.write('Scale of the Normalised drag force is magnified by 20 times');
}


function main_F() {                                                                 //This is main function which will be running befor p5.js function
    ForwardEuler(f, U0, dt, N);
    dragforce();
    
}

main_F();




//-----------p5.js plotting------------
function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(200);
    let psx = 20;                                    // Plot scale used for x axis              (CAN BE TUNED)
    let psy = 70;                                    // Plot scale used for y axis              (CAN BE TUNED)

    //---------------Axis----------------------
    stroke(0);
    strokeWeight(1);
    line(width / psx, height - height / psy, width / psx, height / psy);
    line(width / psx, height - height / psy, width - width / psx, height - height / psy);
    y = 1;
    for (i = height - 2 * height / psy; i > 0; i = i - height / psy) {
        line(width / psx - 2, i, width / psx + 2, i);
        if (y % 10 == 0) {
            text(y, width / (2 * psx), i);
        }
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
        X1 = (t[i-1] + 1) * width / psx;
        Y1 = height - height / psy - u_abs[i - 1] * height / psy;
        X2 = (t[i] + 1) * width / psx;
        Y2 = height - height / psy - u_abs[i] * height / psy;
        stroke('red');
        strokeWeight(1);
        line(X1, Y1, X2, Y2);
        strokeWeight(10);
        point(X2, Y2);
    }

    //---------------------Exact Solution--------------------
    stroke(0);
    strokeWeight(1);

    for (i = 1; i <= N; i++) {
        X1 = (t[i - 1] + 1) * width / psx;
        Y1 = height - height / psy - Fd[i - 1] * height / psy;
        X2 = (t[i] + 1) * width / psx;
        Y2 = height - height / psy - Fd[i] * height / psy;
        line(X1, Y1, X2, Y2);
    }

    //-------------------LEGEND--------------------------------
    lpx = 4;                                           //Legend position x axis                    (CAN BE TUNED)
    lpy = 5;                                           //Legend position y axis                    (CAN BE TUNED)
    lplw = 5;                                           //Legend plotline width                     (CAN BE TUNED)
    ld = 15;                                             //Legend distance                           (CAN BE TUNED)

        //Exact Legend
    stroke(0);
    line(width - width / lpx - lplw, height / lpy, width - width / lpx + lplw, height / lpy);
    text('Drag Force (Normalized)', width - width / lpx + 2 * lplw, height / lpy);
        //Forward Euler legend
    stroke('red');
    line(width - width / lpx - lplw, height / lpy + ld, width - width / lpx + lplw, height / lpy + ld);
    stroke(0);
    text('Absolute Velocity', width - width / lpx + 2 * lplw, height / lpy+ld);
}
// JavaScript source code

U0 = 0.2;                            //Initial Condition
T = 20;                              //Solution for 0<=t<=20
dt = 5;                              //Step size
N = T / dt;                          //Number of steps to be performed

let u = [];
let t = [];
let u_exact = [];
let t_exact = [];


function f(x, y) {
    return 0.1 * y;
}

function ForwardEuler(f, U_0, Delt, n) {
    u[0] = U_0;
    t[0] = 0;
    for (i = 1; i <= n; i++) {
        u[i] = u[i - 1] + Delt * f(i * Delt, u[i - 1]);
        t[i] = t[i - 1] + Delt;
    }
    
}

function exact_fun(Tcap) {
    for (i = 0; i <= 20; i++) {
        u_exact[i] = 0.2 * exp(0.1 * i * Tcap / 20);
        t_exact[i] = i * Tcap / 200;
        document.write(i);
    }
    
}

function main() {
    ForwardEuler(f, U0, dt, N);
    exact_fun(T);
}

main();




//-----------p5.js plotting------------
function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(200);
    let psx = 25;                                    // Plot scale used for x axis
    let psy = 10;                                    // Plot scale used for y axis

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

    //---------------------Exact Solution--------------------
    stroke(0);
    strokeWeight(1);

    for (i = 1; i <= 20; i++) {
        X1 = (t_exact[i - 1] + 1) * width / psx;
        Y1 = height - height / psy - u_exact[i - 1] * height / psy;
        X2 = (t_exact[i] + 1) * width / psx;
        Y2 = height - height / psy - u_exact[i] * height / psy;
        line(X1, Y1, X2, Y2);
        
    }

}
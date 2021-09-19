// JavaScript source code
//Please Change dt value, dt for more agreement with exact, Beware of instability
//Following code finds out the arc length of a curve y = g(x) from x_0 to x_f
// For this it solves ODE ds/dx = f(x) = sqrt(1+pow(g_dash(x),2)) where s is the arc length

// For example and verification current code solves for two curves 1) y = 0.5x+1 2)y = x^2
// Wherever required, indicators are used to toggle b/w this two curves indicator E {1,2}
// Thus values of g_dash: 1) g_dash = 0.5 2) g_dash = 2x


x_0 = 0;                                        //Initial Condition for s: s(x_0) = 0                         (CAN BE TUNED)
x_f = 2;                                                                                                  ``//(CAN BE TUNED)

dx = 0.5;                                      //Step size                                                  (OUGHT TO BE TUNED)
N = (x_f - x_0) / dx;                          //Number of steps to be performed                            (CAN BE TUNED)






function f(x, y, indic) {
    if (indic == 1) {
        g_dash = 0.5
    }
    if (indic == 2) {
        g_dash = 2 * x
    }
    return Math.sqrt(1 + Math.pow(g_dash, 2));
}

function ForwardEuler(f, s_0, Delx, n, indic) {
    temps1 = s_0;
    temps2 = 0;
    tempx1 = x_0;
    tempx2 = 0;
    for (i = 1; i <= n; i++) {
        temps2 = temps1 + Delx * f(tempx1, temps1, indic);
        tempx2 = tempx1 + Delx;
        tempx1 = tempx2;
        temps1 = temps2;
    }
    return temps2;

}



function main_F() {                                                                 //This is main function which will be running befor p5.js function
    s = ForwardEuler(f, 0, dx, N, 1);
    document.write('arclength of line is  ');
    document.write(s);
    s = ForwardEuler(f, 0, dx, N, 2);
    document.write("<br>");
    document.write('\t arclength of parabola is  ');
    document.write(s);
}

main_F();

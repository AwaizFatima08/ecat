# Spot check — math

Generated 2026-11-09. ⚠ = a writer or blind reviewer had a doubt (scope or wording); the rest is a fixed random sample. Mark anything wrong or out of syllabus, with the id.

## math-01 — Number Systems and Complex Numbers (2 of 60)

**math-01-008** · MATH-1.4 · M  
The number 2 + i is a root of the equation x² − 4x + c = 0. What is the real number c?  
A) −5  
**B) 5 ✓**  
C) 3  
D) 4  
_(2 + i)² − 4(2 + i) + c = (3 + 4i) − 8 − 4i + c = c − 5 = 0, so c = 5. Equivalently the roots are 2 ± i, and their product is 4 + 1 = 5. Taking i² = +1 in the product gives 3._

**⚠ math-01-047** · MATH-1.3 · D  
What is (1 + √3 i)⁶?  
A) −64  
**B) 64 ✓**  
C) 64i  
D) 32  
_(1 + √3 i)² = 1 + 2√3 i − 3 = −2 + 2√3 i, and (1 + √3 i)³ = (1 + √3 i)(−2 + 2√3 i) = −2 − 6 = −8. So the sixth power is (−8)² = 64. In polar form: 2⁶(cos 2π + i sin 2π) = 64._

## math-02 — Sets, Logic and Groups (2 of 40)

**math-02-008** · MATH-2.2 · E  
What is the negation of the proposition “∃x ∈ R, x² − 2x + 3 < 0”?  
A) ∀x ∈ R, x² − 2x + 3 < 0  
B) ∃x ∈ R, x² − 2x + 3 ≥ 0  
C) ∃x ∈ R, x² − 2x + 3 > 0  
**D) ∀x ∈ R, x² − 2x + 3 ≥ 0 ✓**  
_Change ∃ to ∀ and negate < 0 to ≥ 0: “∀x ∈ R, x² − 2x + 3 ≥ 0”. Keeping ∃ and negating only the inequality gives a statement that can be true at the same time as the original, so it is not the negation._

**⚠ math-02-026** · MATH-2.3 · E  
Let A = {1, 2, 3}. Which of these relations is a function from A to A?  
**A) {(1, 2), (2, 2), (3, 1)} ✓**  
B) {(1, 1), (1, 2), (3, 3)}  
C) {(1, 3), (2, 1)}  
D) {(2, 1), (3, 2), (2, 3)}  
_A function from A must pair every element of A with exactly one image. {(1, 2), (2, 2), (3, 1)} does; two images may be equal. The others give 1 or 2 two images, or leave 3 without an image._

## math-03 — Functions and Graphs (2 of 80)

**⚠ math-03-045** · MATH-3.1 · M  
A = {1, 2, 3} and B = {p, q, r, s}. How many one-one functions from A to B are there?  
A) 64  
**B) 24 ✓**  
C) 12  
D) 4  
_The image of 1 can be chosen in 4 ways, then 2 in 3 ways and 3 in 2 ways, so there are 4 × 3 × 2 = 24 one-one functions. 64 = 4³ counts all functions from A to B, including those that repeat an image._

**math-03-059** · MATH-3.2 · M  
Let f(x) = √x and g(x) = 4 − x². What is the domain of f(g(x))?  
A) [0, 2]  
B) ℝ  
**C) [−2, 2] ✓**  
D) (−∞, −2] ∪ [2, ∞)  
_f(g(x)) = √(4 − x²) needs 4 − x² ≥ 0, i.e. x² ≤ 4, so −2 ≤ x ≤ 2. [0, 2] wrongly keeps the restriction x ≥ 0 from f, and the union reverses the inequality._

## math-04 — Limits and Continuity (2 of 50)

**math-04-008** · MATH-4.1 · M  
If lim(x→a) f(x) = 3 and lim(x→a) g(x) = −2, then lim(x→a) [f(x)·g(x) + f(x)] equals:  
A) 3  
B) −6  
C) 1  
**D) −3 ✓**  
_By the product and sum theorems the limit is 3 × (−2) + 3 = −6 + 3 = −3. Stopping at the product gives −6; adding instead of multiplying gives 4 or 1._

**⚠ math-04-032** · MATH-4.2 · D  
If θ is measured in degrees, lim(θ→0) (sin θ)/θ equals:  
A) 1  
B) 180/π  
**C) π/180 ✓**  
D) 0  
_θ degrees = πθ/180 radians, so (sin θ°)/θ = (π/180) · sin(πθ/180)/(πθ/180) → π/180. The value 1 holds only for radians._

## math-05 — Matrices and Determinants (2 of 70)

**math-05-008** · MATH-5.1 · M  
If A = [[1, 1], [0, 1]], then A³ equals:  
A) [[1, 1], [0, 1]]  
B) [[3, 3], [0, 3]]  
**C) [[1, 3], [0, 1]] ✓**  
D) [[1, 0], [3, 1]]  
_A² = [[1, 2], [0, 1]] and A³ = A²·A = [[1, 3], [0, 1]]. Cubing each entry would wrongly leave A unchanged, and [[3, 3], [0, 3]] is 3A._

**math-05-040** · MATH-5.3 · M  
The inverse of [[2, 1], [5, 3]] is:  
**A) [[3, −1], [−5, 2]] ✓**  
B) [[−3, 1], [5, −2]]  
C) [[3, −5], [−1, 2]]  
D) [[2, −1], [−5, 3]]  
_|A| = 6 − 5 = 1 and adj A = [[3, −1], [−5, 2]], so A⁻¹ = [[3, −1], [−5, 2]]. Check: [[2, 1], [5, 3]]·[[3, −1], [−5, 2]] = [[1, 0], [0, 1]]._

## math-06 — Quadratic Equations and Polynomials (2 of 90)

**math-06-008** · MATH-6.5 · E  
What is the solution set of x² − x − 6 > 0?  
A) −2 < x < 3  
B) x < −3 or x > 2  
**C) x < −2 or x > 3 ✓**  
D) −3 < x < 2  
_x² − x − 6 = (x − 3)(x + 2), with roots −2 and 3. The parabola opens upward, so it is positive outside the roots: x < −2 or x > 3. The roots −3 and 2 come from factorising as (x + 3)(x − 2), which gives x² + x − 6._

**math-06-058** · MATH-6.2 · M  
If α and β are the roots of x² − 3x + 5 = 0, which equation has roots 2α and 2β?  
A) x² − 6x + 10 = 0  
**B) x² − 6x + 20 = 0 ✓**  
C) x² + 6x + 20 = 0  
D) x² − 3x + 20 = 0  
_New sum = 2(α + β) = 6, new product = 4αβ = 20, so x² − 6x + 20 = 0. Doubling the product only once gives 10._

## math-07 — Partial Fractions (2 of 30)

**math-07-008** · MATH-7.1 · M  
Express (x² + 1)/(x(x − 1)(x + 1)) as partial fractions.  
A) 1/x + 1/(x − 1) + 1/(x + 1)  
**B) −1/x + 1/(x − 1) + 1/(x + 1) ✓**  
C) −1/x + 1/(x − 1) − 1/(x + 1)  
D) 1/x − 1/(x − 1) + 1/(x + 1)  
_Cover-up: at x = 0, 1/((−1)(1)) = −1; at x = 1, 2/((1)(2)) = 1; at x = −1, 2/((−1)(−2)) = 1. A sign slip in the first product gives +1/x._

**math-07-030** · MATH-7.2 · M  
Resolve 1/(x²(x² + 1)) into partial fractions.  
A) 1/x − 1/(x² + 1)  
**B) 1/x² − 1/(x² + 1) ✓**  
C) 1/x² + 1/(x² + 1)  
D) 1/x² − x/(x² + 1)  
_Treat x² as one block: 1/(u(u + 1)) = 1/u − 1/(u + 1) with u = x². So the answer is 1/x² − 1/(x² + 1); the A/x and Bx terms are both 0. Check at x = 1: 1/2 = 1 − 1/2._

## math-08 — Sequences and Series (2 of 70)

**math-08-008** · MATH-8.4 · M  
What is the value of 1/(1 × 3) + 1/(3 × 5) + 1/(5 × 7) + … + 1/(19 × 21)?  
A) 20/21  
**B) 10/21 ✓**  
C) 10/11  
D) 5/11  
_1/((2k − 1)(2k + 1)) = ½[1/(2k − 1) − 1/(2k + 1)], so the sum telescopes to ½(1 − 1/21) = ½ × 20/21 = 10/21. Forgetting the factor ½ gives 20/21._

**math-08-040** · MATH-8.1 · D  
In an A.P. the pth term is q and the qth term is p, where p ≠ q. What is the (p + q)th term?  
**A) 0 ✓**  
B) p + q  
C) p − q  
D) 1  
_a + (p − 1)d = q and a + (q − 1)d = p; subtracting gives (p − q)d = q − p, so d = −1 and a = p + q − 1. Then the (p + q)th term is a + (p + q − 1)(−1) = 0. Check: 5, 4, 3, 2, … has 2nd term 4 and 4th term 2, and its 6th term is 0._

## math-09 — Permutations, Combinations and Probability (2 of 70)

**math-09-008** · MATH-9.4 · E  
A bag contains 4 red, 3 blue and 3 green balls of the same size. One ball is drawn at random. What is the probability that it is blue or green?  
A) 3/10  
**B) 3/5 ✓**  
C) 2/5  
D) 7/10  
_There are 3 + 3 = 6 blue or green balls out of 10, so the probability is 6/10 = 3/5. The value 2/5 is the probability of red, the complement._

**math-09-040** · MATH-9.1 · M  
Zara can travel from Lahore to Islamabad by any one of 4 trains or 6 buses. In how many ways can she go and come back if she returns by a different vehicle from the one she went by?  
A) 100  
B) 48  
C) 20  
**D) 90 ✓**  
_By the addition principle she has 4 + 6 = 10 ways to go; any of the other 9 vehicles can bring her back, so 10 × 9 = 90 ways. 100 allows the same vehicle both ways, and 48 multiplies 4 × 6 × 2 instead of adding._

## math-10 — Mathematical Induction and Binomial Theorem (2 of 60)

**math-10-008** · MATH-10.1 · M  
The statement 'n² − n + 41 is prime' is true for n = 1, 2, …, 40. The smallest positive integer n for which it is false is:  
**A) 41 ✓**  
B) 40  
C) 42  
D) 43  
_At n = 41: 41² − 41 + 41 = 41², not prime. The example shows that checking many cases is not a proof; induction needs the general step P(k) ⇒ P(k + 1)._

**⚠ math-10-043** · MATH-10.3 · M  
For |x| < 1, the first three terms of √(1 + x) are:  
A) 1 + x/2 + x²/8  
B) 1 + x/2 − x²/4  
C) 1 − x/2 − x²/8  
**D) 1 + x/2 − x²/8 ✓**  
_n = 1/2: n(n − 1)/2 = (1/2)(−1/2)/2 = −1/8, so √(1 + x) = 1 + x/2 − x²/8 + … Forgetting to divide by 2! gives −x²/4._

## math-11 — Fundamentals of Trigonometry (2 of 40)

**math-11-008** · MATH-11.2 · M  
The terminal side of angle α passes through P(4a, −3a), where a < 0. What is sin α?  
**A) 3/5 ✓**  
B) −4/5  
C) −3/5  
D) 4/5  
_r = √(16a² + 9a²) = 5|a| = −5a because a < 0. So sin α = −3a/(−5a) = 3/5. The answer −3/5 comes from assuming a > 0; in fact P lies in the second quadrant._

**math-11-030** · MATH-11.2 · M  
If sin θ cos θ > 0 and sin θ tan θ < 0, in which quadrant does the terminal side of θ lie?  
**A) Third ✓**  
B) First  
C) Second  
D) Fourth  
_sin θ tan θ = sin²θ/cos θ < 0 forces cos θ < 0; then sin θ cos θ > 0 forces sin θ < 0. Both negative means the third quadrant._

## math-12 — Trigonometric Identities (2 of 70)

**math-12-040** · MATH-12.1 · M  
What is the value of sin 105° + cos 105°?  
A) √6/2  
B) −√2/2  
C) (√6 − √2)/4  
**D) √2/2 ✓**  
_sin 105° = sin(60° + 45°) = (√6 + √2)/4 and cos 105° = cos(60° + 45°) = (√2 − √6)/4. Adding gives 2√2/4 = √2/2. Check: sin x + cos x = √2 sin(x + 45°) = √2 sin 150° = √2/2._

**⚠ math-12-070** · MATH-12.3 · D  
What is the value of cos(2π/7) + cos(4π/7) + cos(6π/7)?  
**A) −1/2 ✓**  
B) 1/2  
C) 0  
D) −1  
_Multiply the sum S by 2 sin(π/7) and use 2 sin A cos B = sin(A + B) − sin(B − A): the terms give [sin(3π/7) − sin(π/7)] + [sin(5π/7) − sin(3π/7)] + [sin π − sin(5π/7)] = −sin(π/7). So 2 sin(π/7) · S = −sin(π/7) and S = −1/2._

## math-13 — Trigonometric Functions and their Graphs (2 of 50)

**math-13-008** · MATH-13.3 · D  
What is the maximum value of y = cos 2x + 2 sin x?  
A) 1  
**B) 3/2 ✓**  
C) 2  
D) 3  
_Write cos 2x = 1 − 2sin²x and let s = sin x in [−1, 1]: y = −2s² + 2s + 1, a downward parabola with vertex at s = 1/2, where y = −1/2 + 1 + 1 = 3/2. The value 3 adds the separate maxima of cos 2x and 2 sin x, but at sin x = 1 we have cos 2x = −1._

**math-13-030** · MATH-13.1 · M  
What is the domain of y = cot(x/2)? (k ∈ ℤ)  
**A) x ≠ 2kπ ✓**  
B) x ≠ kπ  
C) x ≠ kπ/2  
D) x ≠ (2k + 1)π  
_cot u is undefined when u = kπ, so x/2 ≠ kπ, that is x ≠ 2kπ. Using the rule for cot x itself gives x ≠ kπ._

## math-14 — Application of Trigonometry (2 of 60)

**math-14-008** · MATH-14.2 · M  
A triangle has sides 3, 5 and 7. What is its largest angle?  
A) 90°  
**B) 120° ✓**  
C) 135°  
D) 150°  
_The largest angle is opposite the side 7: cos θ = (3² + 5² − 7²)/(2 × 3 × 5) = −15/30 = −1/2, so θ = 120°. Since 3² + 5² < 7² the angle is obtuse, so 90° is impossible._

**⚠ math-14-060** · MATH-14.4 · D  
In triangle ABC, C = 90°. Which quantity is always equal to r₃, the radius of the escribed circle opposite C?  
A) R  
B) 2R  
C) s − c  
**D) s ✓**  
_With legs a, b: r₃ = Δ/(s − c) and Δ = ½ab. Since (s − c)·s = ¼[(a + b)² − c²] = ½ab = Δ, we get r₃ = s. Check 3-4-5: r₃ = 6/1 = 6 = s. s − c is the inradius r, and 2R = c._

## math-15 — Inverse Trigonometric Functions (2 of 40)

**math-15-008** · MATH-15.1 · M  
sin(cos⁻¹(3/5)) equals:  
A) −4/5  
**B) 4/5 ✓**  
C) 3/4  
D) 3/5  
_Let θ = cos⁻¹(3/5), in [0, π], so sin θ ≥ 0 and sin θ = √(1 − 9/25) = 4/5. The negative root is ruled out by the range._

**⚠ math-15-011** · MATH-15.1 · M  
Taking the principal range of cot⁻¹ as (0, π), the value of cot⁻¹(−√3) is:  
A) −π/6  
**B) 5π/6 ✓**  
C) π/6  
D) 2π/3  
_cot(5π/6) = cos/sin = (−√3/2)/(1/2) = −√3, and 5π/6 is in (0, π). −π/6 also has cotangent −√3 but is outside (0, π)._

## math-16 — Trigonometric Equations (2 of 40)

**math-16-008** · MATH-16.1 · M  
The solutions of cos 2θ = 1/2 in the interval 0 ≤ θ ≤ π are:  
**A) π/6 and 5π/6 ✓**  
B) π/6 only  
C) π/3 and 5π/3  
D) π/6 and π/3  
_For 0 ≤ θ ≤ π, 2θ runs over [0, 2π], where cos 2θ = 1/2 at 2θ = π/3 and 5π/3, so θ = π/6 and 5π/6. Stopping at 2θ = π/3 loses 5π/6; π/3 and 5π/3 forget to halve._

**⚠ math-16-033** · MATH-16.2 · E  
The general solution of sin θ − √3 cos θ = 0 is (n ∈ Z):  
**A) θ = nπ + π/3 ✓**  
B) θ = nπ + π/6  
C) θ = nπ − π/3  
D) θ = 2nπ + π/3  
_cos θ = 0 does not satisfy the equation, so divide by cos θ: tan θ = √3 and θ = nπ + π/3. tan θ = 1/√3 (from dividing the wrong way) gives π/6._

## math-17 — Differentiation (2 of 110)

**math-17-008** · MATH-17.3 · M  
What is the derivative of y = 2ˣ?  
**A) 2ˣ ln 2 ✓**  
B) x·2ˣ⁻¹  
C) 2ˣ/ln 2  
D) 2ˣ  
_For aˣ with a > 0, (aˣ)′ = aˣ ln a, so y′ = 2ˣ ln 2. The option x·2ˣ⁻¹ treats the exponential as a power function, and 2ˣ alone is correct only for base e._

**⚠ math-17-029** · MATH-17.6 · M  
What is the largest interval of positive x on which f(x) = x + 4/x is decreasing?  
**A) (0, 2] ✓**  
B) (0, √2]  
C) [2, +∞)  
D) (0, 4]  
_f′(x) = 1 − 4/x², which is negative for 0 < x < 2 and positive for x > 2, so f decreases on (0, 2] and increases on [2, +∞). (0, √2] is only part of that interval; (0, 4] is wrong because the minimum f(2) = 4 is at x = 2, not at x = 4._

## math-18 — Integration (2 of 110)

**math-18-008** · MATH-18.1 · M  
∫ sin²x dx equals:  
A) x/2 + (sin 2x)/4 + C  
B) (sin³x)/3 + C  
C) x/2 − (sin 2x)/2 + C  
**D) x/2 − (sin 2x)/4 + C ✓**  
_sin²x = (1 − cos 2x)/2, which integrates to x/2 − (sin 2x)/4 + C. Using the power rule on sin x gives (sin³x)/3, which ignores the chain rule._

**math-18-030** · MATH-18.2 · M  
∫ dx/(x² + 2x + 5) equals:  
A) tan⁻¹((x + 1)/2) + C  
B) 2 tan⁻¹((x + 1)/2) + C  
**C) ½ tan⁻¹((x + 1)/2) + C ✓**  
D) ½ tan⁻¹((x − 1)/2) + C  
_Complete the square: x² + 2x + 5 = (x + 1)² + 4. Then ∫ du/(u² + 2²) with u = x + 1 gives ½ tan⁻¹((x + 1)/2) + C. Completing as (x − 1)² is the sign slip._

## math-19 — Differential Equations (2 of 40)

**math-19-008** · MATH-19.1 · M  
Which of the following differential equations is of first order and first degree?  
A) (dy/dx)² + y = 0  
B) d²y/dx² + y = 0  
C) (d²y/dx²)² = y  
**D) dy/dx + y = x² ✓**  
_dy/dx + y = x² has only the first derivative, to power 1. (dy/dx)² + y = 0 is first order but degree 2; the other two are second order._

**⚠ math-19-034** · MATH-19.3 · M  
A boat's speed v (m/s) falls under resistance with dv/dt = −kv. If v = 20 at t = 0 and v = 10 at t = 1 s, then v at t = 3 s is:  
A) 5  
**B) 2.5 ✓**  
C) 0  
D) 1.25  
_v = 20e^(−kt) and e^(−k) = ½, so v(3) = 20 × (½)³ = 2.5. Subtracting 10 per second (linear decrease) gives 0._

## math-20 — Straight Lines (Analytic Geometry) (2 of 90)

**math-20-008** · MATH-20.2 · E  
What is the inclination angle of the line x − √3y + 1 = 0?  
A) 60°  
B) 120°  
**C) 30° ✓**  
D) 150°  
_Rewrite as y = (1/√3)x + 1/√3, so the slope is 1/√3 = √3/3 and tan α = √3/3 gives α = 30°. Choosing 60° confuses slope √3/3 with slope √3._

**math-20-058** · MATH-20.2 · D  
A line passes through (3, −2) and its inclination is twice the inclination of the line y = x/√3. What is its equation?  
A) 2x − √3y − 6 − 2√3 = 0  
B) x − √3y − 3 − 2√3 = 0  
C) √3x + y − 3√3 + 2 = 0  
**D) √3x − y − 3√3 − 2 = 0 ✓**  
_y = x/√3 has inclination 30°, so the new line has inclination 60° and slope √3: y + 2 = √3(x − 3), i.e. √3x − y − 3√3 − 2 = 0. Doubling the slope (2/√3) instead of the angle gives the second-most tempting equation._

## math-21 — Linear Inequalities and Linear Programming (2 of 30)

**math-21-008** · MATH-21.1 · M  
The region 2x + y ≤ 4, x + 2y ≤ 4, x ≥ 0, y ≥ 0 has one corner point that is on neither axis. What is it?  
**A) (4/3, 4/3) ✓**  
B) (2, 2)  
C) (1, 2)  
D) (4/3, 2/3)  
_Solve 2x + y = 4 and x + 2y = 4: subtracting gives x = y, then 3x = 4, so x = y = 4/3. Check: 8/3 + 4/3 = 4 for both lines._

**math-21-030** · MATH-21.2 · D  
Food P costs Rs 20 per unit and gives 2 units of vitamin and 1 of protein; food Q costs Rs 30 per unit and gives 1 of vitamin and 2 of protein. At least 8 units of vitamin and 7 of protein are needed. What is the least cost?  
A) Rs 140  
B) Rs 240  
C) Rs 100  
**D) Rs 120 ✓**  
_Constraints 2x + y ≥ 8, x + 2y ≥ 7, x, y ≥ 0. Corners: (0, 8), (3, 2) where the lines meet, and (7, 0). Cost 20x + 30y = 240, 60 + 60 = 120, 140, so the least cost is Rs 120._

## math-22 — Conic Sections (2 of 90)

**math-22-008** · MATH-22.4 · E  
What are the coordinates of the foci of the hyperbola x²/4 − y²/5 = 1?  
A) (0, ±3)  
**B) (±3, 0) ✓**  
C) (±1, 0)  
D) (±√5, 0)  
_For a hyperbola c² = a² + b² = 4 + 5 = 9, so c = 3. The x² term is positive, so the foci are on the x-axis: (±3, 0). (±1, 0) uses the ellipse rule c² = a² − b² with the values swapped._

**⚠ math-22-083** · MATH-22.5 · M  
Through what acute angle must the axes be rotated to remove the xy-term from 5x² + 2√3xy + 3y² − 12 = 0?  
**A) 30° ✓**  
B) 60°  
C) 45°  
D) 15°  
_tan 2θ = B/(A − C) = 2√3/(5 − 3) = √3, so 2θ = 60° and θ = 30°. Taking 60° forgets to halve 2θ; 45° applies only when A = C._

## math-23 — Vectors (2 of 70)

**math-23-008** · MATH-23.1 · M  
The vectors a = (2, m) and b = (3, 6) are parallel. What is the value of m?  
A) −1  
B) 1  
**C) 4 ✓**  
D) 9  
_For parallel vectors x₁y₂ − x₂y₁ = 0: 2 × 6 − 3m = 0, so m = 4 (indeed b = 1.5a). The value −1 comes from the perpendicular condition 6 + 6m = 0, and 9 from the inverted ratio 2/3 = 6/m._

**math-23-040** · MATH-23.3 · M  
Two non-zero vectors a and b satisfy |a × b| = √3 (a · b). What is the angle between them?  
A) 30°  
**B) 60° ✓**  
C) 45°  
D) 120°  
_|a||b| sin θ = √3 |a||b| cos θ, so tan θ = √3 and θ = 60° (cos θ must be positive, so 120° is impossible). Reading it as cot θ = √3 gives 30°._

## math-24 — Numerical Methods (2 of 20)

**math-24-008** · MATH-24.1 · M  
The Newton–Raphson formula breaks down (division by zero) at an iterate xₙ when:  
A) f(xₙ) = 0  
**B) f′(xₙ) = 0 ✓**  
C) f″(xₙ) = 0  
D) xₙ = 0  
_The step is f(xₙ)/f′(xₙ), so it cannot be formed when f′(xₙ) = 0: the tangent is horizontal and never meets the x-axis. If f(xₙ) = 0, xₙ is already a root._

**⚠ math-24-016** · MATH-24.2 · M  
The trapezium rule is used to estimate ∫₀¹ eˣ dx. Compared with the exact value, the estimate is:  
A) smaller than the exact value  
B) equal to the exact value  
**C) larger than the exact value ✓**  
D) sometimes larger, sometimes smaller, depending on h  
_eˣ is concave up (second derivative eˣ > 0), so each chord lies above the curve and every trapezium has more area than the strip under the curve. So the estimate is too large for every h._

## math-25 — Kinematics with Calculus (2 of 20)

**math-25-008** · MATH-25.1 · M  
A ball is thrown upward and its height is s = 40t − 5t² metres after t seconds. Its greatest height is:  
A) 40 m  
B) 160 m  
C) 75 m  
**D) 80 m ✓**  
_v = 40 − 10t = 0 at t = 4 s, and s(4) = 160 − 80 = 80 m. Taking only 40t at t = 4 gives 160; 75 is the height at t = 3._

**⚠ math-25-015** · MATH-25.1 · D  
A particle moves along a line with velocity v = 2s m/s when it is at displacement s metres. Its acceleration when s = 3 m is:  
A) 2 m/s²  
B) 6 m/s²  
**C) 12 m/s² ✓**  
D) 36 m/s²  
_a = dv/dt = (dv/ds)(ds/dt) = v·dv/ds = 2s × 2 = 4s, so a = 12 m/s² at s = 3. Taking a = dv/ds = 2 forgets the chain-rule factor v; 6 is the velocity there._

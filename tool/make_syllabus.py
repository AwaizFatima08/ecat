#!/usr/bin/env python3
"""make_syllabus.py: writes the Maths, Physics, Chemistry and CS units of
content/syllabus.json (English is edited by hand there and kept as is).

Units are topic-based so one question bank serves both textbook generations:
the old PTB books (2002 curriculum, "O") and the new PECTAA books (National
Curriculum 2023, "N"). Each unit's "books" line maps it to chapters, e.g.
"O I-3 · N 11-4" = old Part I chapter 3 and new Class 11 unit 4. Chapter and
topic lists are from docs/textbook-chapters.md (checked 9 Nov 2026).
Unit and topic ids are permanent once questions use them: append, never renumber.
Run: python3 tool/make_syllabus.py
"""
import json, os

ROOT = os.path.join(os.path.dirname(__file__), "..")

def books(s):
    """'O I-3, N 11-4' -> readable text."""
    out = []
    for part in [p.strip() for p in s.split(",")]:
        gen, ch = part.split(" ", 1)
        if gen == "O":
            yr, n = ch.split("-")
            out.append(f"old Part {yr} ch {n}")
        else:
            yr, n = ch.split("-")
            out.append(f"new Class {yr} ch {n}")
    return " · ".join(out)

# subject -> list of (unit name, books, [(topic slug, topic name, what it covers)])
DATA = {
"math": ("MATH", [
 ("Number Systems and Complex Numbers", "O I-1, N 11-1", [
   ("real", "Real numbers", "Rational and irrational numbers and the properties of real numbers."),
   ("complex", "Complex numbers", "Operations, conjugate, modulus and properties of complex numbers."),
   ("argand", "Argand diagram and polar form", "Complex numbers as ordered pairs, the Argand diagram and polar form."),
   ("roots", "Square roots and equations", "Square roots of a complex number and equations with complex roots.")]),
 ("Sets, Logic and Groups", "O I-2", [
   ("sets", "Sets and Venn diagrams", "Sets, set operations and Venn diagrams."),
   ("logic", "Logic", "Statements, truth tables and quantifiers."),
   ("relations", "Relations and functions", "Relations; into, onto, one-one and inverse functions."),
   ("groups", "Binary operations and groups", "Binary operations and their properties; groups.")]),
 ("Functions and Graphs", "O II-1, N 11-2, N 12-1", [
   ("types", "Types of functions", "Domain, co-domain, range; one-one, onto and bijective functions; algebraic and transcendental functions."),
   ("composition", "Composition and inverse", "Composition of functions and inverse functions and their graphs."),
   ("graphs", "Graphs of functions", "Graphs of linear, quadratic, root, trigonometric, exponential and logarithmic functions; transformations."),
   ("explog", "Exponential and logarithmic functions", "Laws of logarithms, exponential and logarithmic equations and their applications.")]),
 ("Limits and Continuity", "O II-1, N 11-12", [
   ("limits", "Limits and limit theorems", "Limit of a sequence and a function; the limit theorems."),
   ("important", "Important limits", "Standard limits such as (sin x)/x and (1 + 1/n)^n."),
   ("continuity", "Continuity", "Continuous and discontinuous functions.")]),
 ("Matrices and Determinants", "O I-3, N 11-4", [
   ("algebra", "Matrices and their algebra", "Types of matrices and matrix operations, with real and complex entries."),
   ("det", "Determinants", "Determinants by cofactors and their properties."),
   ("inverse", "Inverse and rank", "Adjoint and inverse of a matrix, row operations, echelon form and rank."),
   ("systems", "Systems of linear equations", "Cramer's rule, inverse-matrix method, Gaussian elimination; consistent, inconsistent and homogeneous systems.")]),
 ("Quadratic Equations and Polynomials", "O I-4, N 11-3, N 11-9", [
   ("solve", "Solving quadratic equations", "Factorisation, completing the square, the quadratic formula; equations reducible to quadratic form."),
   ("nature", "Roots and coefficients", "Nature of roots (discriminant), sum and product of roots, forming equations."),
   ("unity", "Cube and fourth roots of unity", "Cube roots and fourth roots of unity and their properties."),
   ("poly", "Polynomial division", "Remainder and factor theorems, synthetic division, factorising cubics."),
   ("qfunc", "Quadratic functions", "Maximum and minimum of a quadratic, its graph, and quadratic inequalities."),
   ("simul", "Simultaneous equations", "Systems with one linear and one quadratic equation.")]),
 ("Partial Fractions", "O I-5, N 11-5", [
   ("linear", "Linear factors", "Partial fractions with distinct and repeated linear factors."),
   ("quadratic", "Quadratic factors", "Partial fractions with irreducible and repeated quadratic factors.")]),
 ("Sequences and Series", "O I-6, N 11-6", [
   ("ap", "Arithmetic progressions", "A.P., nth term, sum and arithmetic means."),
   ("gp", "Geometric progressions", "G.P., nth term, sums, infinite geometric series and geometric means."),
   ("hp", "Harmonic progressions", "H.P., harmonic means and the relation between A, G and H."),
   ("sigma", "Sigma notation and special sums", "Sums of n, n² and n³ and arithmetico-geometric series.")]),
 ("Permutations, Combinations and Probability", "O I-7, N 11-7", [
   ("counting", "Counting and factorials", "Fundamental counting principles and factorial notation."),
   ("perm", "Permutations", "Permutations, with repetition and circular arrangements."),
   ("comb", "Combinations", "Combinations and their properties."),
   ("prob", "Probability", "Sample space, events, addition and multiplication rules of probability.")]),
 ("Mathematical Induction and Binomial Theorem", "O I-8, N 11-8", [
   ("induction", "Mathematical induction", "Principle of induction and proofs by induction."),
   ("binomial", "Binomial theorem", "Expansion, general term and middle term for a positive integral index."),
   ("series", "Binomial series", "Binomial series for negative or fractional index and approximations.")]),
 ("Fundamentals of Trigonometry", "O I-9", [
   ("angles", "Angles and radian measure", "Degrees and radians and arc length l = rθ."),
   ("ratios", "Trigonometric ratios", "Ratios, signs in quadrants and values of standard angles."),
   ("basic", "Basic identities", "Fundamental identities such as sin²θ + cos²θ = 1.")]),
 ("Trigonometric Identities", "O I-10, N 11-10", [
   ("compound", "Sum and difference of angles", "Fundamental law of trigonometry and compound-angle formulas."),
   ("multiple", "Double, half and triple angles", "Double-, half- and triple-angle identities."),
   ("sumprod", "Sum and product formulas", "Sum-to-product and product-to-sum formulas.")]),
 ("Trigonometric Functions and their Graphs", "O I-11, N 11-11", [
   ("domain", "Domain, range and period", "Domain, range, period, even and odd trigonometric functions."),
   ("graphs", "Graphs", "Graphs of sin, cos, tan and the others; amplitude, frequency and phase shift."),
   ("maxmin", "Maximum and minimum values", "Maximum and minimum values of trigonometric expressions.")]),
 ("Application of Trigonometry", "O I-12", [
   ("triangles", "Solving triangles", "Right and oblique triangles; heights and distances."),
   ("laws", "Laws of sines, cosines and tangents", "The laws of sines, cosines and tangents and half-angle formulas."),
   ("area", "Area of a triangle", "Area formulas including Hero's formula."),
   ("circles", "Circumcircle, incircle and escribed circles", "Radii R, r and r1, r2, r3.")]),
 ("Inverse Trigonometric Functions", "O I-13, N 12-9", [
   ("defs", "Definitions and principal values", "Domains, ranges and principal values of inverse trigonometric functions."),
   ("graphs", "Graphs", "Graphs of inverse trigonometric functions."),
   ("formulas", "Addition formulas", "Addition and other formulas for inverse trigonometric functions.")]),
 ("Trigonometric Equations", "O I-14, N 12-10", [
   ("general", "General solutions", "General solutions of sin θ = k, cos θ = k and tan θ = k."),
   ("reducible", "Equations reducible to quadratic form", "Trigonometric equations solved as quadratics or with several functions.")]),
 ("Differentiation", "O II-2, N 11-13, N 12-2", [
   ("first", "Derivative from first principles", "The derivative as a limit and its geometrical meaning."),
   ("rules", "Rules of differentiation", "Sum, product, quotient and chain rules."),
   ("trans", "Derivatives of special functions", "Trigonometric, inverse trigonometric, exponential, logarithmic and hyperbolic derivatives."),
   ("implicit", "Implicit and parametric differentiation", "Implicit, parametric and logarithmic differentiation; higher derivatives."),
   ("series", "Series expansions", "Maclaurin and Taylor series."),
   ("apps", "Applications of derivatives", "Tangents and normals, increasing and decreasing functions, maxima and minima, differentials.")]),
 ("Integration", "O II-3, N 12-3", [
   ("anti", "Antiderivatives", "Integration as anti-derivative and standard integrals."),
   ("subst", "Integration by substitution", "Substitution, including trigonometric substitution."),
   ("parts", "Integration by parts", "Integration by parts."),
   ("pfrac", "Integration using partial fractions", "Integrating rational functions with partial fractions."),
   ("definite", "Definite integrals", "Definite integrals, their properties and the Fundamental Theorem of Calculus."),
   ("area", "Area and volume", "Area under and between curves; volumes of solids of revolution.")]),
 ("Differential Equations", "O II-3, N 12-4", [
   ("basics", "Order, degree and formation", "Order and degree of a differential equation and how it is formed."),
   ("separable", "Separable equations", "First-order equations with separable variables."),
   ("apps", "Applications", "Growth, decay and motion problems.")]),
 ("Straight Lines (Analytic Geometry)", "O II-4, N 12-5", [
   ("coords", "Coordinates and formulas", "Distance, midpoint and section formulas; translation and rotation of axes."),
   ("lines", "Equations of a line", "Slope and the standard forms of the equation of a line."),
   ("two", "Two or more lines", "Intersection, concurrency, parallel and perpendicular lines, angle between lines."),
   ("distance", "Distance from a point to a line", "Distance of a point from a line and between parallel lines."),
   ("pair", "Pair of lines", "Homogeneous second-degree equations representing a pair of lines.")]),
 ("Linear Inequalities and Linear Programming", "O II-5", [
   ("ineq", "Linear inequalities", "Graphs of linear inequalities and regions they bound."),
   ("lp", "Linear programming", "Constraints, feasible region, corner points and optimising an objective function.")]),
 ("Conic Sections", "O II-6, N 12-6", [
   ("circle", "Circle", "Equations of a circle, tangents and normals."),
   ("parabola", "Parabola", "Parabola and its elements."),
   ("ellipse", "Ellipse", "Ellipse and its elements."),
   ("hyperbola", "Hyperbola", "Hyperbola and its elements."),
   ("tangents", "Tangents and the general conic", "Tangents and normals to conics; general second-degree equation.")]),
 ("Vectors", "O II-7, N 11-14, N 12-11", [
   ("plane", "Vectors in plane and space", "Components, unit vectors, magnitude and direction cosines."),
   ("dot", "Dot product", "Scalar product, angle between vectors, projection and work."),
   ("cross", "Cross product", "Vector product and areas of triangles and parallelograms."),
   ("triple", "Scalar triple product", "Scalar triple product and volumes; coplanarity."),
   ("vfunc", "Vector-valued functions", "Vector-valued functions and their derivatives; velocity and acceleration.")]),
 ("Numerical Methods", "N 12-8", [
   ("roots", "Solving equations numerically", "Bisection, regula-falsi and Newton–Raphson methods."),
   ("trapezium", "Numerical integration", "The trapezium rule.")]),
 ("Kinematics with Calculus", "N 12-7", [
   ("motion", "Motion in a line", "Displacement, velocity and acceleration as derivatives and integrals.")]),
]),
"phy": ("PHY", [
 ("Measurements", "O I-1, N 11-1", [
   ("units", "SI units", "Base, supplementary and derived units; prefixes and scientific notation."),
   ("errors", "Errors and uncertainty", "Systematic and random errors, uncertainty and its propagation."),
   ("sigfig", "Significant figures, precision and accuracy", "Significant figures, precision and accuracy."),
   ("dim", "Dimensional analysis", "Dimensions, homogeneity of equations and deriving relations.")]),
 ("Vectors and Equilibrium", "O I-2, N 11-2", [
   ("basics", "Vectors and components", "Unit, null and position vectors; rectangular components; addition by components."),
   ("products", "Scalar and vector products", "Dot and cross products and their uses."),
   ("torque", "Torque", "Torque and its calculation."),
   ("equil", "Equilibrium", "First and second conditions of equilibrium.")]),
 ("Motion and Force", "O I-3, N 11-2", [
   ("kinematics", "Kinematics", "Displacement, velocity, acceleration and velocity–time graphs."),
   ("eqns", "Equations of motion", "Equations of uniformly accelerated motion and free fall."),
   ("newton", "Newton's laws, momentum and impulse", "Newton's laws, momentum and impulse."),
   ("collisions", "Conservation of momentum and collisions", "Elastic and inelastic collisions."),
   ("projectile", "Projectile motion", "Range, height and time of flight of a projectile.")]),
 ("Work, Energy and Power", "O I-4, N 11-4", [
   ("work", "Work", "Work by constant and variable forces; force–displacement graphs."),
   ("energy", "Kinetic and potential energy", "Kinetic and potential energy; work–energy principle."),
   ("escape", "Absolute potential energy and escape velocity", "Gravitational potential energy and escape velocity."),
   ("power", "Power and conservation of energy", "Power, conservative fields and conservation of energy.")]),
 ("Circular and Rotational Motion", "O I-5, N 11-3", [
   ("angular", "Angular motion", "Radian measure, angular displacement, velocity and acceleration."),
   ("centripetal", "Centripetal force", "Centripetal force and acceleration."),
   ("inertia", "Moment of inertia and angular momentum", "Moment of inertia, angular momentum and its conservation, rotational kinetic energy."),
   ("satellites", "Satellites and weightlessness", "Orbital velocity, artificial satellites, weightlessness and artificial gravity.")]),
 ("Fluid Dynamics", "O I-6, N 11-5", [
   ("viscous", "Viscosity and Stokes' law", "Viscous drag, Stokes' law and terminal velocity."),
   ("flow", "Flow and continuity", "Laminar and turbulent flow; equation of continuity."),
   ("bernoulli", "Bernoulli's equation", "Bernoulli's equation and its applications (Torricelli, Venturi meter)."),
   ("archimedes", "Archimedes' principle", "Upthrust and flotation.")]),
 ("Oscillations", "O I-7, N 12-14", [
   ("shm", "Simple harmonic motion", "SHM, its equations, amplitude, period, frequency and phase."),
   ("systems", "Spring–mass and pendulum", "Spring–mass system and simple pendulum."),
   ("energy", "Energy in SHM", "Kinetic and potential energy in SHM."),
   ("resonance", "Damping and resonance", "Free, forced and damped oscillations and resonance.")]),
 ("Waves and Sound", "O I-8, N 11-7", [
   ("waves", "Progressive waves", "Transverse and longitudinal waves, v = fλ, intensity."),
   ("sound", "Speed of sound", "Newton's formula, Laplace correction and factors affecting the speed of sound."),
   ("superpos", "Superposition and beats", "Superposition, interference and beats."),
   ("stationary", "Stationary waves", "Stationary waves in strings and air columns; harmonics."),
   ("doppler", "Doppler effect", "Doppler effect and its uses.")]),
 ("Physical Optics", "O I-9, N 11-8, N 12-15", [
   ("huygens", "Wavefronts and Huygens' principle", "Wavefronts and Huygens' principle."),
   ("interference", "Interference", "Young's double slit, thin films, Newton's rings and Michelson's interferometer."),
   ("diffraction", "Diffraction", "Single slit, diffraction grating and X-ray diffraction by crystals."),
   ("polarisation", "Polarisation", "Polarisation and Malus's law."),
   ("gravwaves", "Gravitational waves", "Gravitational waves and their detection by interferometers.")]),
 ("Optical Instruments", "O I-10", [
   ("magnify", "Magnifying and resolving power", "Least distance of distinct vision, magnifying and resolving power."),
   ("instruments", "Microscopes and telescopes", "Simple and compound microscope, astronomical telescope and spectrometer."),
   ("light", "Speed of light and optical fibres", "Michelson's method and optical fibres.")]),
 ("Heat and Thermodynamics", "O I-11, N 11-6, N 12-13", [
   ("kinetic", "Kinetic theory of gases", "Pressure of a gas, temperature, rms speed and the ideal gas equation."),
   ("firstlaw", "First law of thermodynamics", "Internal energy, work and heat; isothermal and adiabatic processes."),
   ("specific", "Molar specific heats", "Molar specific heats of gases."),
   ("engines", "Heat engines and the second law", "Carnot engine, efficiency, refrigerators and the second law."),
   ("entropy", "Entropy", "Entropy and reversible and irreversible processes.")]),
 ("Electrostatics", "O II-12, N 11-9, N 12-16", [
   ("coulomb", "Coulomb's law", "Coulomb's law and forces between charges."),
   ("field", "Electric field and Gauss's law", "Electric field, field lines, flux and Gauss's law."),
   ("potential", "Electric potential", "Potential, potential difference, potential gradient and potential energy."),
   ("millikan", "Millikan's method", "Charge on an electron by Millikan's method."),
   ("capacitors", "Capacitors", "Capacitance, dielectrics, combinations, energy stored, RC charging and discharging.")]),
 ("Current Electricity", "O II-13, N 11-9", [
   ("ohm", "Current and Ohm's law", "Current, I = nAvq, Ohm's law and resistance."),
   ("resistivity", "Resistivity", "Resistivity and its temperature dependence; colour code, thermistor, LDR."),
   ("power", "Power, EMF and internal resistance", "Electrical power, EMF and internal resistance."),
   ("kirchhoff", "Kirchhoff's rules", "Kirchhoff's rules and circuit analysis."),
   ("bridge", "Wheatstone bridge and potentiometer", "Wheatstone bridge, potentiometer and potential dividers.")]),
 ("Electromagnetism", "O II-14, N 11-10", [
   ("force", "Force on a conductor", "F = BIL sin θ, flux density and magnetic flux."),
   ("ampere", "Ampère's law", "Ampère's law and the field of a solenoid."),
   ("charge", "Force on a moving charge", "F = qvB sin θ, motion in a field, e/m and velocity selector."),
   ("meters", "Galvanometer, ammeter and voltmeter", "Torque on a coil and conversion of a galvanometer.")]),
 ("Electromagnetic Induction", "O II-15, N 11-10", [
   ("faraday", "Faraday's and Lenz's laws", "Induced and motional EMF, Faraday's and Lenz's laws."),
   ("inductance", "Self and mutual induction", "Self and mutual inductance and energy stored in an inductor."),
   ("machines", "Generators, motors and transformers", "AC and DC generators, back EMF and transformers.")]),
 ("Alternating Current", "O II-16, N 12-17", [
   ("rms", "AC values and phase", "Peak and rms values and phase."),
   ("circuits", "Resistor, inductor and capacitor in AC", "Reactance, impedance and phase in R, L and C circuits."),
   ("rlc", "RLC circuits and resonance", "Series and parallel RLC circuits, power and resonance."),
   ("em", "Electromagnetic waves and modulation", "Electromagnetic waves, three-phase supply and modulation.")]),
 ("Physics of Solids", "O II-17, N 11-5", [
   ("types", "Types of solids", "Crystalline, amorphous, glassy and polymeric solids."),
   ("elastic", "Stress, strain and moduli", "Young's, bulk and shear moduli, elastic limit and strain energy."),
   ("bands", "Energy bands and semiconductors", "Conductors, insulators and semiconductors; doping."),
   ("magnetic", "Superconductors and magnetic materials", "Superconductors, dia-, para- and ferromagnetism, hysteresis.")]),
 ("Electronics", "O II-18, N 12-17", [
   ("diode", "p-n junction and rectification", "Biasing of a diode and half- and full-wave rectification."),
   ("devices", "LED, photodiode and solar cell", "LED, photodiode and photovoltaic cell."),
   ("transistor", "Transistor", "Transistor currents, amplifier and switch."),
   ("opamp", "Operational amplifier", "Inverting and non-inverting amplifiers and comparators."),
   ("gates", "Logic gates", "Logic gates and truth tables.")]),
 ("Special Theory of Relativity", "O II-19, N 11-11", [
   ("frames", "Frames and postulates", "Inertial and non-inertial frames and the postulates."),
   ("effects", "Time dilation and length contraction", "Simultaneity, time dilation, length contraction and mass increase."),
   ("massenergy", "Mass–energy equivalence", "E = mc² and its uses.")]),
 ("Quantum Physics", "O II-19, N 12-18", [
   ("blackbody", "Black-body radiation", "Black-body radiation and Planck's hypothesis."),
   ("photo", "Photoelectric effect", "Photoelectric effect, work function and the photocell."),
   ("compton", "Compton effect and pair production", "Compton effect, pair production and annihilation."),
   ("debroglie", "Wave nature of particles", "de Broglie waves, electron diffraction and the electron microscope."),
   ("uncertainty", "Uncertainty principle", "Heisenberg's uncertainty principle.")]),
 ("Atomic Spectra", "O II-20, N 12-18", [
   ("hydrogen", "Hydrogen spectrum and Bohr model", "Spectral series, Bohr's model and energy levels."),
   ("xrays", "X-rays", "Production, properties and uses of X-rays."),
   ("lasers", "Lasers", "Excitation, ionisation and lasers.")]),
 ("Nuclear Physics", "O II-21, N 11-12, N 12-19", [
   ("nucleus", "The nucleus", "Rutherford scattering, isotopes and the mass spectrograph."),
   ("binding", "Mass defect and binding energy", "Mass defect and binding energy per nucleon."),
   ("decay", "Radioactivity and half-life", "α, β, γ radiation, decay law, activity and half-life."),
   ("detectors", "Radiation and detectors", "Interaction of radiation with matter, detectors, dosimetry and biological effects."),
   ("reactions", "Fission, fusion and reactors", "Nuclear reactions, fission, fusion and reactors.")]),
 ("Particle Physics", "N 11-12, N 12-19", [
   ("quarks", "Quarks, hadrons and leptons", "Quarks, baryons, mesons and leptons; antiparticles."),
   ("forces", "Force carriers", "Fundamental forces, W and Z bosons, gluons, photons and the Higgs boson."),
   ("beta", "β-decay at the quark level", "β-decay explained with quarks and neutrinos.")]),
 ("Medical Physics", "N 12-20", [
   ("ultrasound", "Ultrasound", "Piezoelectric effect and diagnostic ultrasound."),
   ("imaging", "Medical imaging", "X-ray imaging, CT and PET scanning.")]),
 ("Space and Environment", "N 12-21", [
   ("stars", "Stars and standard candles", "Luminosity, radiant flux, standard candles, Wien's law and stellar radius."),
   ("universe", "Expanding universe", "Hubble's law and the expanding universe."),
   ("climate", "Earth's climate system", "Climate system, ocean currents and atmospheric circulation.")]),
]),
"chem": ("CHEM", [
 ("Basic Concepts and Stoichiometry", "O I-1, N 11-4", [
   ("atoms", "Atoms, ions and isotopes", "Relative atomic mass, isotopes and the mass spectrometer."),
   ("mole", "Mole and Avogadro's number", "Mole, molar mass, Avogadro's number and molar volume."),
   ("formula", "Empirical and molecular formula", "Combustion analysis and empirical and molecular formulas."),
   ("stoich", "Stoichiometric calculations", "Mass and volume calculations from equations."),
   ("limiting", "Limiting reactant and yield", "Limiting and excess reactants; theoretical, actual and percentage yield.")]),
 ("Experimental and Separation Techniques", "O I-2, N 11-15, N 11-16, N 12-28", [
   ("filtration", "Filtration and crystallisation", "Filtration, crystallisation and sublimation."),
   ("extraction", "Solvent extraction and distillation", "Solvent extraction and distillation."),
   ("chroma", "Chromatography", "Paper, thin-layer and gas chromatography; Rf values."),
   ("lab", "Lab safety and analysis", "Lab safety, titration and tests for ions.")]),
 ("Gases", "O I-3, N 11-5", [
   ("laws", "Gas laws", "Boyle's, Charles's, Avogadro's, Dalton's and Graham's laws; absolute zero."),
   ("ideal", "Ideal gas equation", "pV = nRT and gas density."),
   ("kmt", "Kinetic molecular theory", "Postulates of kinetic molecular theory."),
   ("real", "Real gases", "Non-ideal behaviour, van der Waals equation, liquefaction and plasma.")]),
 ("Liquids and Solids", "O I-4, N 11-5", [
   ("imf", "Intermolecular forces", "Dipole–dipole, London forces and hydrogen bonding."),
   ("liquids", "Properties of liquids", "Evaporation, vapour pressure, boiling point, surface tension and viscosity; liquid crystals."),
   ("solids", "Types of solids", "Ionic, covalent, molecular and metallic solids."),
   ("lattice", "Crystal lattice", "Unit cell, crystal systems and lattice energy.")]),
 ("Atomic Structure", "O I-5, N 11-2", [
   ("particles", "Subatomic particles", "Discovery and properties of the electron, proton and neutron."),
   ("bohr", "Bohr's model and spectra", "Rutherford and Bohr models, radius and energy of orbits, spectra."),
   ("quantum", "Quantum numbers and orbitals", "Quantum numbers and shapes of orbitals."),
   ("config", "Electronic configuration", "Aufbau principle, Pauli exclusion principle and Hund's rule.")]),
 ("Chemical Bonding", "O I-6, N 11-3", [
   ("types", "Types of bonds", "Ionic, covalent, coordinate and metallic bonds."),
   ("trends", "Atomic properties and bonding", "Ionisation energy, electron affinity, electronegativity and polarity."),
   ("vsepr", "VSEPR theory", "Shapes of molecules by VSEPR."),
   ("vbt", "Hybridisation", "Valence bond theory and hybridisation."),
   ("mot", "Molecular orbital theory", "Molecular orbitals and bond order."),
   ("props", "Bond energy, length and dipole moment", "Bond energy, bond length and dipole moment.")]),
 ("Thermochemistry", "O I-7, N 11-6", [
   ("basics", "Enthalpy change", "System, surroundings, state functions, exothermic and endothermic reactions."),
   ("standard", "Standard enthalpies", "Standard enthalpies of formation, combustion, neutralisation and others."),
   ("calorimetry", "Calorimetry", "Measuring enthalpy changes."),
   ("hess", "Hess's law and Born–Haber cycle", "Hess's law, Born–Haber cycle and lattice energy."),
   ("entropy", "Entropy", "Entropy and the energetics of solution.")]),
 ("Chemical Equilibrium", "O I-8, N 11-8", [
   ("dynamic", "Reversible reactions", "Reversible reactions and dynamic equilibrium."),
   ("constants", "Kc and Kp", "Law of mass action, Kc and Kp."),
   ("lechatelier", "Le Chatelier's principle", "Effect of concentration, pressure, temperature and catalyst."),
   ("industry", "Industrial applications", "Haber and contact processes.")]),
 ("Acids, Bases and Ionic Equilibria", "O I-8, N 11-9", [
   ("concepts", "Acid–base concepts", "Arrhenius, Brønsted–Lowry and Lewis concepts."),
   ("ph", "pH and the ionic product of water", "Kw, pH and pOH."),
   ("ka", "Ka, Kb and buffers", "Ionisation constants, buffers and salt hydrolysis."),
   ("ksp", "Solubility product and common ion effect", "Ksp and the common ion effect; indicators.")]),
 ("Solutions and Colloids", "O I-9", [
   ("conc", "Concentration units", "Percentage, molarity, molality, mole fraction and ppm."),
   ("raoult", "Raoult's law", "Ideal and non-ideal solutions."),
   ("colligative", "Colligative properties", "Vapour-pressure lowering, boiling-point elevation, freezing-point depression, osmotic pressure."),
   ("colloids", "Hydration, hydrolysis and colloids", "Hydration, hydrolysis and colloids.")]),
 ("Electrochemistry", "O I-10, N 11-10", [
   ("redox", "Oxidation numbers and redox", "Oxidation numbers, redox and balancing redox equations."),
   ("electrolysis", "Electrolysis", "Electrolytic cells and Faraday's laws."),
   ("cells", "Galvanic cells and electrode potentials", "Electrode potentials, SHE, E° cell and the electrochemical series."),
   ("batteries", "Batteries and fuel cells", "Batteries, fuel cells and the Nernst equation.")]),
 ("Reaction Kinetics", "O I-11, N 11-7", [
   ("rate", "Rate of reaction", "Rate, rate constant and collision theory."),
   ("order", "Order and half-life", "Order of reaction, rate law and half-life."),
   ("arrhenius", "Activation energy", "Activation energy and the Arrhenius equation."),
   ("factors", "Factors affecting rate and catalysis", "Factors affecting rate and catalysis.")]),
 ("Periodic Table and Periodicity", "O II-1, N 11-1", [
   ("table", "Modern periodic table", "History, blocks, groups and periods."),
   ("trends", "Periodic trends", "Atomic radius, ionisation energy, electron affinity, electronegativity, metallic character."),
   ("compounds", "Oxides, chlorides and hydrides", "Trends in oxides, chlorides and hydrides across a period.")]),
 ("s-Block Elements", "O II-2, N 12-17", [
   ("trends", "Alkali and alkaline earth metals", "Properties and trends of groups 1 and 2."),
   ("compounds", "Compounds and their stability", "Thermal decomposition of carbonates and nitrates, solubility of sulphates and hydroxides."),
   ("industry", "Industrial compounds", "NaOH (Nelson cell), Downs cell, lime and gypsum."),
   ("anomalous", "Peculiar behaviour of Li and Be", "Anomalous behaviour of lithium and beryllium.")]),
 ("Group IIIA and IVA Elements", "O II-3", [
   ("boron", "Boron and aluminium", "Borax, boric acid and alums."),
   ("carbon", "Carbon, silicon and lead", "Silicates, silicones and lead compounds.")]),
 ("Nitrogen, Oxygen and Sulphur", "O II-4, N 11-12", [
   ("nitrogen", "Nitrogen and its compounds", "Ammonia, nitrogen oxides, nitric acid and the nitrogen cycle."),
   ("phosphorus", "Phosphorus", "Phosphorus and its acids."),
   ("sulphur", "Sulphur and sulphuric acid", "Sulphur, its compounds and the contact process.")]),
 ("Halogens and Noble Gases", "O II-5, N 11-13", [
   ("trends", "Halogen trends", "Volatility, bond strength, oxidising power and HX stability."),
   ("reactions", "Reactions of halogens", "Reactions with hydrogen and alkali; halide ion tests; bleaching powder."),
   ("noble", "Noble gases", "Noble gas compounds.")]),
 ("Transition Elements", "O II-6, N 12-18", [
   ("props", "Properties", "Variable oxidation states, colour, magnetism and catalysis."),
   ("complexes", "Complexes", "Ligands, coordination number, geometry, nomenclature and isomerism."),
   ("compounds", "Important compounds", "Iron and steel, chromate, dichromate and KMnO4.")]),
 ("Fundamentals of Organic Chemistry", "O II-7, N 12-19", [
   ("sources", "Sources and classification", "Coal, petroleum, cracking and classification of organic compounds."),
   ("groups", "Functional groups and nomenclature", "Functional groups and IUPAC naming."),
   ("isomerism", "Isomerism", "Structural and stereoisomerism."),
   ("mechanisms", "Reactions and mechanisms", "Bond fission, reactive intermediates and types of reactions.")]),
 ("Aliphatic Hydrocarbons", "O II-8, N 11-11", [
   ("alkanes", "Alkanes", "Preparation and free-radical substitution."),
   ("alkenes", "Alkenes", "Preparation, electrophilic addition, Markovnikov's rule and ozonolysis."),
   ("alkynes", "Alkynes", "Preparation, reactions and acidity of alkynes.")]),
 ("Aromatic Hydrocarbons", "O II-9, N 12-20", [
   ("benzene", "Structure of benzene", "Structure, resonance and stability of benzene."),
   ("substitution", "Electrophilic substitution", "Nitration, halogenation, sulphonation and Friedel–Crafts."),
   ("orientation", "Orientation effects", "Directing groups and side-chain reactions.")]),
 ("Alkyl Halides", "O II-10, N 12-21", [
   ("prep", "Preparation and naming", "Naming and preparation of halogenoalkanes."),
   ("sn", "Substitution and elimination", "SN1, SN2, E1 and E2 reactions."),
   ("grignard", "Grignard reagents", "Grignard reagent and its uses.")]),
 ("Alcohols, Phenols and Ethers", "O II-11, N 12-22", [
   ("alcohols", "Alcohols", "Classification, preparation, reactions and tests."),
   ("phenols", "Phenols", "Acidity and reactions of phenol."),
   ("ethers", "Ethers", "Preparation and properties of ethers.")]),
 ("Aldehydes and Ketones", "O II-12, N 12-23", [
   ("prep", "Preparation", "Preparation of aldehydes and ketones."),
   ("addition", "Nucleophilic addition", "Nucleophilic addition, aldol and Cannizzaro reactions."),
   ("tests", "Oxidation, reduction and tests", "Tollens', Fehling's, 2,4-DNPH and iodoform tests.")]),
 ("Carboxylic Acids and Derivatives", "O II-13, N 12-23", [
   ("acids", "Carboxylic acids", "Preparation, reactions and relative acidity."),
   ("derivatives", "Acid derivatives", "Esters, amides, acyl chlorides and anhydrides."),
   ("amino", "Amino acids and peptides", "Amino acids, zwitterions and peptides.")]),
 ("Organic Nitrogen Compounds and Synthesis", "N 12-24, N 12-25", [
   ("amines", "Amines, nitriles and amides", "Preparation, reactions and basicity of amines; nitriles and amides."),
   ("synthesis", "Organic synthesis", "Functional-group interconversions and retrosynthesis.")]),
 ("Macromolecules and Biochemistry", "O II-14, N 12-26, N 12-27", [
   ("polymers", "Polymers", "Addition and condensation polymerisation, plastics and fibres."),
   ("carbs", "Carbohydrates and lipids", "Carbohydrates and lipids."),
   ("proteins", "Proteins, enzymes and nucleic acids", "Proteins, enzymes and nucleic acids.")]),
 ("Spectroscopy", "N 12-29, N 12-30", [
   ("uvir", "UV/visible and infrared", "UV/visible and infrared spectroscopy; index of hydrogen deficiency."),
   ("ms", "Mass spectrometry", "Mass spectra and molecular ions."),
   ("nmr", "NMR", "¹H NMR, chemical shift and structure determination.")]),
 ("Industrial Chemistry and Materials", "O II-15, N 12-31, N 12-32", [
   ("fertilisers", "Fertilisers", "Urea, ammonium nitrate and other fertilisers."),
   ("cement", "Cement, paper and other industries", "Cement, paper and pulp and chemical industries of Pakistan."),
   ("materials", "Materials and energy", "Fossil fuels, refining, energy density and materials.")]),
 ("Environmental Chemistry", "O II-16, N 11-14, N 12-33", [
   ("air", "Atmosphere and air pollution", "Layers of the atmosphere, pollutants, smog and catalytic converters."),
   ("global", "Acid rain, ozone and the greenhouse effect", "Acid rain, ozone depletion and global warming."),
   ("water", "Water pollution and treatment", "Water quality, pollutants, treatment, BOD and DO.")]),
]),
"cs": ("CS", [
 ("Computer Basics and Architecture", "O I-1, O I-5", [
   ("it", "Information technology basics", "Hardware, software, data and the information-processing cycle."),
   ("cpu", "CPU and buses", "ALU, control unit, registers, buses and the instruction cycle."),
   ("memory", "Memory and storage", "RAM, ROM, cache and storage devices."),
   ("numbers", "Number systems", "Binary, octal and hexadecimal conversions.")]),
 ("Networks and Data Communication", "O I-2, O I-3, O I-10, N 12-1", [
   ("types", "Network types and topologies", "LAN, WAN, MAN; topologies; client-server and peer-to-peer."),
   ("osi", "OSI model and protocols", "OSI layers, TCP/IP, HTTP, FTP and DNS; IP addressing."),
   ("devices", "Network devices", "NIC, switch, router, modem and access point."),
   ("comm", "Data communication", "Signals, modulation, transmission modes and media."),
   ("internet", "The Internet", "Internet services, browsers, search engines and ISPs.")]),
 ("Security, Ethics and Law", "O I-6, N 11-7, N 12-9", [
   ("threats", "Threats and protection", "Viruses, malware, antivirus, passwords and encryption."),
   ("law", "Copyright, privacy and computer crime", "Copyright, privacy, legal and ethical issues."),
   ("safe", "Safe digital practice", "Digital divide, bias and safe collaboration.")]),
 ("Applications and Emerging Technologies", "O I-4, N 11-6, N 12-8", [
   ("uses", "Uses of computers", "Computers in education, business, medicine, banking and industry."),
   ("cloud", "Cloud computing", "Virtualisation, IaaS, PaaS, SaaS and deployment models."),
   ("emerging", "AI, IoT and blockchain", "AI and machine learning, IoT and blockchain.")]),
 ("Operating Systems and Office Software", "O I-7, O I-8, O I-9", [
   ("os", "Operating systems and Windows", "OS functions, files and folders, Control Panel."),
   ("word", "Word processing", "Formatting, tables and mail merge."),
   ("excel", "Spreadsheets", "Worksheets, formulas, functions and charts.")]),
 ("Databases", "O II-1, O II-2, O II-3, O II-4", [
   ("files", "Files and data processing", "File systems, file organisation and their limits."),
   ("terms", "Database concepts", "DBMS, entities, attributes, keys and data models."),
   ("design", "Database design and ER modelling", "Development life cycle, ER diagrams, relationships and cardinality."),
   ("normal", "Integrity and normalisation", "Integrity constraints, anomalies, dependencies, 1NF, 2NF and 3NF.")]),
 ("MS Access", "O II-5, O II-6, O II-7", [
   ("tables", "Tables and relationships", "Access objects, field types and relationships."),
   ("queries", "Queries", "Select and action queries and criteria."),
   ("forms", "Forms and reports", "Forms, controls and reports.")]),
 ("C Programming Basics", "O II-8, O II-9, O II-10", [
   ("structure", "Structure of a C program", "Compiling, linking and preprocessor directives."),
   ("elements", "Data types and operators", "Identifiers, keywords, data types, variables, constants, operators and precedence."),
   ("io", "Input and output", "printf, scanf, format specifiers and escape sequences.")]),
 ("C Control Structures and Functions", "O II-11, O II-12, O II-13, O II-14", [
   ("decisions", "Decision constructs", "if, if-else, else-if, switch and the conditional operator."),
   ("loops", "Loops", "while, do-while, for, nested loops, break and continue."),
   ("functions", "Functions", "Prototypes, parameters, return values and variable scope."),
   ("files", "File handling", "Opening, reading, writing and closing text files.")]),
 ("Software Development", "N 11-1, N 12-5", [
   ("sdlc", "SDLC and methods", "SDLC stages, Waterfall and Agile, project planning."),
   ("testing", "Testing and debugging", "Syntax, runtime and logic errors; testing methods and debugging.")]),
 ("Python Programming", "N 11-2, N 12-3, N 12-4", [
   ("basics", "Python basics", "Syntax, variables, data types, input and output."),
   ("control", "Operators, decisions and loops", "Operators, if statements and loops."),
   ("functions", "Functions and data structures", "Functions, lists, tuples and dictionaries."),
   ("oop", "Object-oriented Python", "Classes, objects, inheritance, encapsulation and polymorphism."),
   ("gui", "GUI with Tkinter", "Windows, widgets and event-driven programs.")]),
 ("Algorithms and Data Structures", "N 11-3, N 11-4, N 12-2", [
   ("algorithms", "Algorithms and complexity", "Problem types, design techniques, P, NP and NP-complete."),
   ("sortsearch", "Sorting and searching", "Common sorting and searching algorithms."),
   ("structures", "Data structures", "Lists, stacks, queues, trees and graphs."),
   ("logic", "Computational thinking and logic", "Decomposition, propositional and predicate logic.")]),
 ("Data Analytics", "N 11-5, N 12-6, N 12-7", [
   ("stats", "Descriptive statistics and models", "Descriptive statistics, models and evaluation."),
   ("viz", "Data science and visualisation", "Data science workflow, cleaning and visualisation."),
   ("hypothesis", "Hypothesis testing", "Null and alternative hypotheses and significance.")]),
 ("Digital Literacy and Entrepreneurship", "N 11-8, N 11-9", [
   ("research", "Online research and digital literacy", "Searching, evaluating sources and advanced search."),
   ("business", "Entrepreneurship in the digital age", "Design thinking and business plans.")]),
]),
}

def main():
    p = os.path.join(ROOT, "content", "syllabus.json")
    syl = json.load(open(p))
    syl["source"] = ("UET Lahore ECAT 2026 (ecat.uet.edu.pk; admission FAQ Fall 2026): 'entire Intermediate syllabus'. "
                     "Chapters follow the Punjab textbooks, old PTB (2002 curriculum) and new PECTAA (National Curriculum 2023), "
                     "checked 9 Nov 2026 (docs/textbook-chapters.md).")
    for s in syl["subjects"]:
        if s["id"] not in DATA:
            continue
        code, units = DATA[s["id"]]
        s["units"] = []
        for n, (name, bk, topics) in enumerate(units, 1):
            uid = f"{s['id']}-{n:02d}"
            s["units"].append({"id": uid, "n": n, "name": name, "books": books(bk), "topics": [
                {"id": f"{uid}-{slug}", "name": tname, "los": [{"code": f"{code}-{n}.{k}", "text": text}]}
                for k, (slug, tname, text) in enumerate(topics, 1)]})
    with open(p, "w") as f:
        json.dump(syl, f, indent=2, ensure_ascii=False)
        f.write("\n")
    for s in syl["subjects"]:
        print(s["id"], len(s["units"]), "units", sum(len(u["topics"]) for u in s["units"]), "topics")

main()

# Simulated eclipse demonstration

`SIM_Eclipse_Demo.csv` is an educational, fictional dataset. It is not an observation of a real star and must not be submitted as scientific measurement data.

Download it from the analyzer's **Download simulated eclipse CSV** button, or use the bundled CSV, then select it in the normal file importer. Its target name is **SIM Eclipse Demo (synthetic)**, so it stays separate from real targets even when adding files to a session.

- Recorded interval: October 19, 2026, 21:00 to October 20, 2026, 03:00 (synthetic UTC clock).
- 1,081 measurements, 20-second cadence, 10-second exposures. The final exposure ends at 03:00:10.
- Uneclipsed magnitude: 10.00.
- Model eclipse minimum: 10.65 at midnight; the larger magnitude appears lower on the inverted chart.
- Illustrative eclipse lasts from 22:30 to 01:30, with 90 minutes of baseline on each side.
- Gaussian magnitude noise with reported uncertainty increasing from 0.018 to 0.022 mag near minimum. SNR is generated consistently with the chosen uncertainty using 1.085736 / uncertainty.
- Stable coordinates with gentle drift and small random scatter; no simulated sudden slew. Reference-star count is a fictional 15, not a catalog result. RA/DEC and reference magnitude are intentionally unspecified.

The profile is a smooth cosine-shaped loss of relative flux converted into magnitude. It is an illustrative single dip, not a physical fit incorporating binary geometry or limb darkening. No orbital period or recurrence is assigned. Fixed seeded randomness makes the in-app download identical to the bundled CSV.

With five-minute bins and default filters, screening flags the fading and recovery legs. These are changes detected by a heuristic, not an independently confirmed eclipse classification. Changing bins or filters can change the screening intervals.

Validation: all 1,081 rows imported with zero rejected rows, including midnight. The first-hour median is 10.0019475; the median within five minutes of minimum is 10.643327. Both sustained-change directions are detected, and no tracking jumps exceed 30 pixels.

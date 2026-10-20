# Purpose, audience and development boundaries

Agreed product direction — 2026-10-20. This document is the reference for feature proposals, implementation reviews and user-facing claims. It applies to the photometry analyzer, not to every future app in SeeStarApps.

## Our promise

> Explore your Seestar measurements, assess their consistency, and identify observations worth investigating further.

A useful result can be an observed change, a possible measurement effect, an unresolved candidate, or an inconclusive assessment with an explanation and a practical next step. Do not turn those categories into confidence probabilities without a validated statistical method.

## Who this is for

Seestar owners taking their first steps beyond imaging into variable-star observation, budget-conscious observers, astronomy clubs and educators. Users should not need PixInsight, paid software, programming experience, an account or a server.

The analyzer helps users understand existing Seestar measurements and prepare observations for deeper work in dedicated measurement tools, including open-source tools. It does not attempt to replace a complete photometric reduction pipeline.

## What reasonably good means

- Trustworthy imports: preserve original values, missing values, timing, units, source files and row provenance; explain rejected or unsupported records accurately.
- Reliable associations: track stars with stable internal IDs separate from optional names. Match sky positions with tolerance and ambiguity checks; never use exact RA/Dec strings, row order or moving sensor positions as permanent identity.
- Honest observation counts: a target log and its matching per-frame row are the same observation. Reconcile overlaps and expose conflicts rather than double-counting.
- Clear light curves: explain binning, filtering, gaps, uncertainties and the evidence behind annotations.
- Supporting diagnostics: assess comparison-star behaviour, reference selection changes, position and frame metadata. Correlated changes can arise from the measurement process; they do not alone establish the cause.
- Traceable exports: preserve what was measured, what was derived, the settings used and outstanding limitations.
- Reproducible quality checks: validate new matching and candidate screening with synthetic ground truth, including no-event, ambiguous-match and shared-systematic cases. Describe coverage and false-positive limitations rather than claiming completeness.

## Current capability versus planned work

The current app imports named-target CSVs and provides binning, quality filters, tracking diagnostics, exploratory variability screening and exports. It excludes unnamed rows; importing per-frame field CSVs is not a supported whole-field analysis. Current cross-file overlap handling does not reconcile target logs with frame measurements.

The following are development goals, not claims of shipped functionality:

| Mode | Input and purpose |
|---|---|
| Targeted analysis — first priority | A dedicated target log or a selected session star; optionally attach the session folder to reconcile observations and inspect supporting evidence. |
| General field scan — subsequent work | A session folder; associate measured stars across frames, construct light curves and flag candidates for targeted inspection. |

General scanning must build on tested association and quality diagnostics. It is not an automatic discovery or eclipse-confirmation engine.

## Browser and source-file safety

All user workflows remain browser-local and usable without a required backend, runtime service or installation. No observation uploads or telemetry. Source folders are read-only: never move, rename, overwrite or delete observations.

Recommend copying a completed session with Finder/Explorer before analysis. Do not describe temporary browser reads as a durable local copy. Browser-managed copying and live acquisition monitoring are outside the initial scope.

Scan progressively with bounded memory, visible progress and cancellation. A failed or cancelled scan must leave originals untouched and label partial results explicitly. Retain the last valid session until a replacement is accepted. Read CSVs and FITS headers first; load previews or image pixels only on demand. Do not decode an entire large image collection into memory.

Keep ordinary target-log import available when folder selection is unavailable. Test supported desktop browsers and disclose mobile/folder-access limits. Do not claim USB-folder access until tested with the relevant device and browser.

## Measurement boundaries

CSVs contain Seestar's derived measurements; FITS headers add capture metadata. JPEGs can be previews, not a quantitative brightness source. FITS pixels are needed for independent image remeasurement, which is outside this initial roadmap.

Do not promise:
- detection of every eclipse, variable star or scientifically interesting event;
- confirmed discoveries, eclipse classifications, forecasts or validated event probabilities;
- automatic standard-passband calibration or publication-ready scientific measurements;
- AAVSO-ready submissions without the required metadata and measurement validation;
- independent confirmation from two exports of the same underlying observation.

Do not infer calibrated passband solely from the physical IRCUT/LP filter, treat Seestar's Is Variable flag as a discovery verdict, or silently use timestamp span as integration time or exposure midpoint.

## Handoff to specialist tools

Prepare a selected target, coordinates, relevant exposure references, original measurements, diagnostic findings and uncertainties. Add formats for specific downstream tools only after verifying their requirements. An export is not an endorsement of scientific validity. Independent FITS photometry, full astrometric solving, catalogue/passband calibration and specialist event modelling remain work for dedicated measurement tools unless separately scoped and validated.

## Keep this promise visible during development

Every substantive photometry proposal or pull request should state:
1. Which audience need it serves and whether it is current behaviour or planned capability.
2. What observation or diagnostic it can establish, and what it cannot.
3. How source safety, provenance, overlap handling and uncertainty are preserved.
4. Which meaningful checks ran, which environments remain untested, and the next handoff.

Keep the user guide, relevant interface/report wording and validation notes consistent with this document as each capability ships. Do not expand the scientific promise by adding a feature label. Update this scope explicitly when the owner changes direction.

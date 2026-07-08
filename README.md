# ADVIS Forward Vision Console

Premium ADAS forward-perception console prototype for the ADVIS / IND-VIAS program.

This repository contains a React + Vite based HMI prototype inspired by the frozen forward-vision console design. It is currently a static/mock-telemetry implementation and is prepared for later integration with `ind-vias-perception-engine-v2` outputs.

## Current goal

Build a production-looking forward-vision console that can later consume perception telemetry such as:

- Ego speed, RPM / power, gear, range / battery
- Lane status and predicted path
- Lead vehicle distance and TTC
- Object detections: cars, buses, auto-rickshaws, two-wheelers, pedestrians
- ADAS states: lane centering, AEB, FCW, scene quality
- Runtime debug signals: FPS, latency, sensor / vision health

## Local run

```bash
npm install
npm run dev
```

Then open the Vite local URL shown in the terminal.

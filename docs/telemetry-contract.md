# ADVIS Forward Vision Console Telemetry Contract

The current console renders from `src/data/mockTelemetry.js`. Later, the same object shape can be replaced by a WebSocket / REST stream from `ind-vias-perception-engine-v2`.

## Recommended live frame payload

```json
{
  "ego": {
    "speedKmh": 102,
    "rpmX1000": 1.7,
    "powerKw": 28,
    "gear": "D",
    "batteryPercent": 78,
    "rangeKm": 412,
    "temperatureC": 23,
    "time": "09:28"
  },
  "navigation": {
    "instruction": "Stay on NH48",
    "distanceKm": 2.6,
    "direction": "SOUTH",
    "speedLimitKmh": 80
  },
  "adas": {
    "laneCentering": true,
    "aebReady": true,
    "leadVehicleDistanceM": 24,
    "ttcSec": 2.8,
    "laneStatus": "Centered",
    "objectCount": 6,
    "roadCondition": "Dry",
    "sceneQuality": "Good"
  },
  "runtime": {
    "fps": 30,
    "latencyMs": 68,
    "sensors": "OK",
    "vision": "OK"
  },
  "objects": [
    {
      "id": "lead-car",
      "type": "car",
      "label": "Lead Vehicle",
      "distanceM": 24,
      "risk": "high",
      "lane": "center"
    }
  ]
}
```

## Mapping from IND-VIAS perception

| Console field | IND-VIAS source idea |
|---|---|
| `ego.speedKmh` | OBD-II / CAN speed input |
| `adas.leadVehicleDistanceM` | lead tracked object distance |
| `adas.ttcSec` | TTC module output |
| `adas.laneStatus` | lane model / road geometry state |
| `objects[]` | detector + tracker output |
| `runtime.fps` | pipeline frame-rate measurement |
| `runtime.latencyMs` | end-to-end perception latency |
| `runtime.vision` | scene quality + SafetyGate status |

## Next integration step

Add a small adapter layer:

```text
IND-VIAS perception output -> telemetry adapter -> WebSocket -> React console
```

The UI should remain independent of the perception stack. Only the telemetry adapter should know the exact IND-VIAS internal classes.

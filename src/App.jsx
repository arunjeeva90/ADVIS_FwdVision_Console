import {
  BatteryCharging,
  CarFront,
  Fuel,
  Gauge,
  GitBranch,
  Navigation,
  Settings2,
  ShieldCheck,
  Thermometer,
  Timer,
} from 'lucide-react';
import { telemetry } from './data/mockTelemetry.js';
import './objectAssets.css';
import './frozenRefinements.css';

const objectClassName = {
  car: 'object-card object-car',
  bus: 'object-card object-bus',
  auto: 'object-card object-auto',
  'two-wheeler': 'object-card object-bike',
  pedestrian: 'object-card object-pedestrian',
};

const objectAssetSrc = {
  'lead-car': '/assets/vehicles/same_lane_vehicle/samelane_vehicle_orange.png',
  'left-car': '/assets/vehicles/car/car_left_lane.png',
  'bus-right': '/assets/vehicles/bus/bus_right_lane.png',
  'auto-right': '/assets/vehicles/autorickshaw/autorickshaw_right_lane.png',
  'bike-left': '/assets/vehicles/2W_rider/2W_rider_left_lane.png',
  'ped-right': '/assets/vehicles/pedestrian/pedestrian_crossing_left_to_right.png',
};

function StatusPill({ icon, label }) {
  return (
    <div className="status-pill">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function GlassGauge({ side, value, unit, label, min = '0', max = '6' }) {
  return (
    <section className={`glass-gauge glass-gauge--${side}`}>
      <div className="gauge-orb">
        <div className="orb-ring" />
        <div className="orb-shine" />
        <div className="gauge-value">{value}</div>
        <div className="gauge-unit">{unit}</div>
        <div className="gauge-label">{label}</div>
      </div>
      <div className="gauge-scale">
        <span>{min}</span>
        <div className="gauge-track"><i /></div>
        <span>{max}</span>
      </div>
    </section>
  );
}

function DetectionSilhouette({ type }) {
  if (type === 'pedestrian') {
    return <span className="pedestrian-figure" />;
  }

  return (
    <span className={`silhouette silhouette-${type}`}>
      <i />
      <b />
    </span>
  );
}

function RoadObject({ object }) {
  const assetSrc = objectAssetSrc[object.id];

  return (
    <div className={`${objectClassName[object.type]} ${object.risk === 'high' ? 'is-risk' : ''}`} data-lane={object.lane}>
      <div className="object-distance">{object.distanceM} m</div>
      <div className="object-outline">
        {assetSrc ? (
          <>
            <img className="object-asset" src={assetSrc} alt={object.label} />
            <DetectionSilhouette type={object.type} />
          </>
        ) : (
          <DetectionSilhouette type={object.type} />
        )}
      </div>
      <span>{object.label}</span>
    </div>
  );
}

function RoadScene() {
  return (
    <main className="road-scene" aria-label="Forward perception road visualization">
      <div className="horizon-glow" />
      <div className="mountains mountains-left" />
      <div className="mountains mountains-right" />
      <div className="city-line" />
      <div className="road-shoulder road-shoulder-left" />
      <div className="road-shoulder road-shoulder-right" />
      <div className="streetlights streetlights-left" />
      <div className="streetlights streetlights-right" />
      <div className="road-surface">
        <div className="lane-edge lane-edge-left" />
        <div className="lane-edge lane-edge-right" />
        <div className="lane lane-left" />
        <div className="lane lane-center-left" />
        <div className="lane lane-center-right" />
        <div className="lane lane-right" />
        <div className="ego-path" />
        <div className="lane-dashes lane-dashes-left" />
        <div className="lane-dashes lane-dashes-right" />
      </div>

      {telemetry.objects.map((object) => <RoadObject key={object.id} object={object} />)}

      <div className="ego-vehicle">
        <div className="sensor-halo halo-1" />
        <div className="sensor-halo halo-2" />
        <div className="car-body">
          <div className="rear-glass" />
          <div className="tail-light" />
          <div className="bumper" />
        </div>
      </div>
    </main>
  );
}

function MetricTile({ title, value, icon }) {
  return (
    <div className="metric-tile">
      <span>{title}</span>
      <strong>{value}</strong>
      <div className="metric-icon">{icon}</div>
    </div>
  );
}

function RuntimePanel() {
  const rows = [
    ['FPS', telemetry.runtime.fps],
    ['Latency', `${telemetry.runtime.latencyMs} ms`],
    ['Sensors', telemetry.runtime.sensors],
    ['Vision', telemetry.runtime.vision],
  ];

  return (
    <section className="runtime-panel">
      {rows.map(([key, value]) => (
        <div key={key}>
          <span>{key}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </section>
  );
}

function SpeedLimit() {
  return (
    <section className="speed-limit">
      <div>{telemetry.navigation.speedLimitKmh}</div>
      <span>Speed Limit</span>
    </section>
  );
}

export function App() {
  return (
    <div className="cluster-shell">
      <div className="ambient ambient-blue" />
      <div className="ambient ambient-violet" />
      <div className="radial-speed-arc" />

      <header className="top-bar">
        <div className="battery-range">
          <BatteryCharging size={24} />
          <div className="battery-track"><i style={{ width: `${telemetry.ego.batteryPercent}%` }} /></div>
          <strong>{telemetry.ego.batteryPercent}%</strong>
          <span>{telemetry.ego.rangeKm} km</span>
        </div>
        <div className="drive-info">
          <strong>{telemetry.ego.gear}</strong>
          <span>{telemetry.ego.temperatureC}°C</span>
          <span>{telemetry.ego.time}</span>
        </div>
      </header>

      <aside className="navigation-card">
        <div className="turn-arrow" />
        <div>
          <strong>{telemetry.navigation.distanceKm} km</strong>
          <em>{telemetry.navigation.direction}</em>
          <span>{telemetry.navigation.instruction}</span>
        </div>
        <div className="route-progress"><i /></div>
      </aside>

      <section className="speed-core">
        <div className="speed-number">{telemetry.ego.speedKmh}</div>
        <div className="speed-unit">KM/H</div>
        <div className="speed-status-row">
          <StatusPill icon={<Gauge size={19} />} label="Lane Centering ON" />
          <StatusPill icon={<ShieldCheck size={19} />} label="AEB Ready" />
        </div>
      </section>

      <SpeedLimit />
      <GlassGauge side="left" value={telemetry.ego.powerKw} unit="kW" label="Power" min="CHARGE" max="POWER" />
      <GlassGauge side="right" value={telemetry.ego.rpmX1000} unit="x1000 rpm" label="RPM" />
      <RoadScene />
      <RuntimePanel />

      <section className="bottom-metrics">
        <MetricTile title="Lead Vehicle" value={`${telemetry.adas.leadVehicleDistanceM} m`} icon={<CarFront />} />
        <MetricTile title="TTC" value={`${telemetry.adas.ttcSec} s`} icon={<Timer />} />
        <MetricTile title="Lane Status" value={telemetry.adas.laneStatus} icon={<GitBranch />} />
        <MetricTile title="Objects" value={telemetry.adas.objectCount} icon={<Settings2 />} />
        <MetricTile title="Road" value={telemetry.adas.roadCondition} icon={<Navigation />} />
      </section>

      <footer className="bottom-bar">
        <div className="fuel-block"><Fuel size={24} /><span>E</span><i /><strong>F</strong><em>{telemetry.ego.rangeKm} km</em></div>
        <div className="thermal-block"><Thermometer size={24} /><span>C</span><i /><strong>H</strong></div>
        <div className="headlight-block"><span className="headlight-symbol">▰▰▰</span><span>AUTO</span></div>
      </footer>
    </div>
  );
}

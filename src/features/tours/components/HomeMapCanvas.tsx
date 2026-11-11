import type { MapPoint } from '../types';

export interface HomeMapCanvasProps {
  points: MapPoint[];
  selectedId: string;
  onSelect: (point: MapPoint) => void;
}

/** Lề trong khung (%) để ghim ở mép không bị cắt */
const PAD_X = 12;
const PAD_Y = 14;

/**
 * Đổi kinh độ / vĩ độ thật của điểm đến thành vị trí % trong khung bản đồ.
 * Phép chiếu tuyến tính đơn giản — đủ chính xác cho phạm vi một tỉnh.
 */
function createProjection(points: MapPoint[]) {
  const lats = points.map((p) => p.latitude);
  const lons = points.map((p) => p.longitude);
  const [minLat, maxLat] = [Math.min(...lats), Math.max(...lats)];
  const [minLon, maxLon] = [Math.min(...lons), Math.max(...lons)];
  const spanLat = maxLat - minLat || 1;
  const spanLon = maxLon - minLon || 1;
  return {
    x: (lon: number) => PAD_X + ((lon - minLon) / spanLon) * (100 - PAD_X * 2),
    y: (lat: number) => PAD_Y + ((maxLat - lat) / spanLat) * (100 - PAD_Y * 2),
    /** Vĩ tuyến 17 có nằm trong khung không */
    hasParallel17: minLat < 17 && maxLat > 17,
  };
}

/**
 * Khung bản đồ: lưới tọa độ, đường Vĩ tuyến 17 và các ghim đặt theo tọa độ thật.
 */
export function HomeMapCanvas({ points, selectedId, onSelect }: HomeMapCanvasProps) {
  const project = createProjection(points);

  return (
    <div className="map-grid relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-on-media/10 bg-on-media/[0.03] sm:aspect-[16/10]">
      <div aria-hidden="true" className="absolute -right-10 top-1/4 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />

      {project.hasParallel17 ? (
        <div aria-hidden="true" className="absolute inset-x-0 border-t border-dashed border-warning/60" style={{ top: `${project.y(17)}%` }}>
          <span className="absolute left-3 -translate-y-full pb-1 text-[11px] font-bold uppercase tracking-wider text-warning">
            Vĩ tuyến 17
          </span>
        </div>
      ) : null}

      {points.map((pt) => {
        const isSelected = pt.id === selectedId;
        const x = project.x(pt.longitude);
        // Nhãn đặt cạnh ghim (không che ghim gần bên dưới); ở nửa phải thì đặt sang trái để không tràn mép
        const labelSide = x > 50 ? 'right-full mr-1.5' : 'left-full ml-1.5';
        return (
          <button
            key={pt.id}
            type="button"
            onClick={() => onSelect(pt)}
            aria-label={pt.name}
            aria-pressed={isSelected}
            style={{ left: `${x}%`, top: `${project.y(pt.latitude)}%` }}
            className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer ${isSelected ? 'z-20' : 'z-10 hover:z-30'}`}
          >
            <span aria-hidden="true" className="relative flex h-6 w-6 items-center justify-center">
              {isSelected ? <span className="absolute h-10 w-10 animate-ping rounded-full bg-primary-light/40" /> : null}
              <span
                className={`relative block rounded-full border-2 border-on-media shadow-lg transition-all duration-300 ${
                  isSelected ? 'h-[22px] w-[22px] bg-primary' : 'h-3.5 w-3.5 bg-primary-light group-hover:scale-125'
                }`}
              />
            </span>
            <span
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${labelSide} whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold shadow-md transition-all ${
                isSelected
                  ? 'bg-surface-card text-ink opacity-100'
                  : 'bg-scrim/80 text-on-media opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
              }`}
            >
              {pt.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

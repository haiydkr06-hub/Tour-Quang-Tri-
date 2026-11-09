import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { HistoricalDestination } from '../types';
import { ItineraryBuilder } from './ItineraryBuilder';
import { DND_DESTINATION_TYPE } from './LocationSelector';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const stop = (id: string, name: string): HistoricalDestination => ({
  id,
  name,
  region: 'Quảng Trị',
  description: '',
  entryFee: 0,
  imageUrl: '',
  timeRequired: '1 giờ',
});

const STOPS = [stop('a', 'Thành Cổ'), stop('b', 'Hiền Lương'), stop('c', 'Vịnh Mốc')];

/** DataTransfer giả lập (jsdom không có sẵn) — dùng chung giữa dragstart và drop như trình duyệt thật */
function createDataTransfer() {
  const store = new Map<string, string>();
  return {
    effectAllowed: 'all',
    dropEffect: 'none',
    setData: (type: string, value: string) => void store.set(type, value),
    getData: (type: string) => store.get(type) ?? '',
  };
}

function fire(target: Element, type: string, dataTransfer: ReturnType<typeof createDataTransfer>) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'dataTransfer', { value: dataTransfer });
  act(() => {
    target.dispatchEvent(event);
  });
}

let container: HTMLDivElement;
let root: Root;
const handlers = { onAdd: vi.fn(), onMove: vi.fn(), onRemove: vi.fn() };

function render(stops: HistoricalDestination[]) {
  act(() => root.render(<ItineraryBuilder stops={stops} {...handlers} />));
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  Object.values(handlers).forEach((fn) => fn.mockClear());
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('ItineraryBuilder — kéo thả lịch trình', () => {
  it('kéo điểm số 1 thả lên điểm số 3 → đứng trước điểm số 3 (vị trí 1)', () => {
    render(STOPS);
    const items = container.querySelectorAll('li');
    const dt = createDataTransfer();
    fire(items[0], 'dragstart', dt);
    fire(items[2], 'dragover', dt);
    fire(items[2], 'drop', dt);
    expect(handlers.onMove).toHaveBeenCalledWith(0, 1);
  });

  it('kéo điểm cuối thả lên điểm đầu → lên vị trí 0', () => {
    render(STOPS);
    const items = container.querySelectorAll('li');
    const dt = createDataTransfer();
    fire(items[2], 'dragstart', dt);
    fire(items[0], 'drop', dt);
    expect(handlers.onMove).toHaveBeenCalledWith(2, 0);
  });

  it('thả thẻ địa danh từ danh mục lên điểm số 2 → thêm vào vị trí 1', () => {
    render(STOPS);
    const dt = createDataTransfer();
    dt.setData(DND_DESTINATION_TYPE, 'la-vang');
    fire(container.querySelectorAll('li')[1], 'drop', dt);
    expect(handlers.onAdd).toHaveBeenCalledWith('la-vang', 1);
    expect(handlers.onMove).not.toHaveBeenCalled();
  });

  it('lịch trình rỗng: hiện hướng dẫn và thả vào vùng → thêm vào đầu', () => {
    render([]);
    expect(container.textContent).toContain('Chưa có điểm nào');
    const dt = createDataTransfer();
    dt.setData(DND_DESTINATION_TYPE, 'thanh-co');
    const zone = container.querySelector('section')!;
    fire(zone, 'dragover', dt);
    fire(zone, 'drop', dt);
    expect(handlers.onAdd).toHaveBeenCalledWith('thanh-co', 0);
  });

  it('nút bàn phím ↑ / ✕ thay thế cho kéo thả; nút ↑ của điểm đầu bị vô hiệu', () => {
    render(STOPS);
    const up = (name: string) => container.querySelector<HTMLButtonElement>(`button[aria-label="Đưa ${name} lên trước"]`)!;
    expect(up('Thành Cổ').disabled).toBe(true);
    act(() => up('Vịnh Mốc').click());
    expect(handlers.onMove).toHaveBeenCalledWith(2, 1);
    act(() => container.querySelector<HTMLButtonElement>('button[aria-label="Bỏ Hiền Lương khỏi lịch trình"]')!.click());
    expect(handlers.onRemove).toHaveBeenCalledWith('b');
  });
});

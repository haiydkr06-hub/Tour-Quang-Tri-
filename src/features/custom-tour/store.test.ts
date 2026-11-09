import { beforeEach, describe, expect, it } from 'vitest';
import { insertAt, moveItem, useCustomTourStore } from './store';

describe('insertAt (thả địa danh vào lịch trình)', () => {
  it('thêm vào cuối khi không truyền vị trí', () => {
    expect(insertAt(['a', 'b'], 'c')).toEqual(['a', 'b', 'c']);
  });

  it('chèn vào đúng vị trí được thả', () => {
    expect(insertAt(['a', 'b', 'c'], 'x', 1)).toEqual(['a', 'x', 'b', 'c']);
  });

  it('không tạo bản trùng nếu địa danh đã có — chỉ đổi chỗ', () => {
    expect(insertAt(['a', 'b', 'c'], 'c', 0)).toEqual(['c', 'a', 'b']);
  });

  it('kẹp vị trí ngoài phạm vi về đầu/cuối danh sách', () => {
    expect(insertAt(['a'], 'b', 99)).toEqual(['a', 'b']);
    expect(insertAt(['a'], 'b', -5)).toEqual(['b', 'a']);
  });
});

describe('moveItem (sắp xếp thứ tự tham quan)', () => {
  it('di chuyển phần tử xuống sau', () => {
    expect(moveItem(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a']);
  });

  it('di chuyển phần tử lên trước', () => {
    expect(moveItem(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b']);
  });

  it('giữ nguyên khi vị trí không hợp lệ', () => {
    const list = ['a', 'b'];
    expect(moveItem(list, 0, 5)).toBe(list);
    expect(moveItem(list, 1, 1)).toBe(list);
  });
});

describe('useCustomTourStore', () => {
  beforeEach(() => {
    useCustomTourStore.getState().resetBuilder();
  });

  it('thêm, đổi thứ tự và xóa địa danh trong lịch trình', () => {
    const { addDestination, moveDestination, removeDestination } = useCustomTourStore.getState();
    addDestination('thanh-co');
    addDestination('vinh-moc');
    addDestination('hien-luong', 0);
    expect(useCustomTourStore.getState().selectedDestinationIds).toEqual(['hien-luong', 'thanh-co', 'vinh-moc']);

    moveDestination(0, 2);
    expect(useCustomTourStore.getState().selectedDestinationIds).toEqual(['thanh-co', 'vinh-moc', 'hien-luong']);

    removeDestination('vinh-moc');
    expect(useCustomTourStore.getState().selectedDestinationIds).toEqual(['thanh-co', 'hien-luong']);
  });

  it('không cho số ngày / số khách nhỏ hơn 1', () => {
    const { setDays, setGuests } = useCustomTourStore.getState();
    setDays(0);
    setGuests(-3);
    expect(useCustomTourStore.getState().days).toBe(1);
    expect(useCustomTourStore.getState().guests).toBe(1);
  });
});

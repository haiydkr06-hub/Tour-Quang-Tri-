import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { BookingRecord } from '@/features/checkout/types';
import { getMyBookings } from '@/features/checkout/service';
import { MyBookingList } from '@/features/checkout/components/MyBookingList';
import { useAuthStore } from '@/features/auth/store';

/**
 * Container: Trang "Đơn đặt tour của tôi" (/my-bookings).
 * Khách đã đăng nhập thấy đơn theo tài khoản; khách vãng lai thấy các đơn đặt từ trình duyệt này.
 */
export function MyBookingsPage() {
  const user = useAuthStore((s) => s.user);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userId = user?.id ?? null;
  const userEmail = user?.email ?? null;

  useEffect(() => {
    let isMounted = true;
    const owner = userId && userEmail ? { id: userId, email: userEmail } : null;
    getMyBookings(owner).then((data) => {
      if (isMounted) {
        setBookings(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [userId, userEmail]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Đơn Đặt Tour Của Tôi</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {user
            ? `Xin chào ${user.name}, đây là các đơn gắn với tài khoản ${user.email}.`
            : 'Đây là các đơn bạn đã đặt trên trình duyệt này. '}
          {!user ? (
            <Link to="/login?redirectTo=%2Fmy-bookings" className="font-semibold text-primary hover:underline">
              Đăng nhập để xem đơn theo tài khoản
            </Link>
          ) : null}
        </p>
      </div>

      <MyBookingList bookings={bookings} isLoading={isLoading} />
    </div>
  );
}

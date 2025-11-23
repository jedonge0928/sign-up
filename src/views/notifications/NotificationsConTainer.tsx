// 'use client';

// import { useNotifications } from '@/libs/api/notifications/hook/useNotifications';
// import { useEffect } from 'react';
// import toast from 'react-hot-toast';

// interface NotificationItem {
//   id: number;
//   message: string;
//   isRead: boolean;
//   sentAt: string;
//   type: string;
// }

// export default function  NotificationConTainer() {
//   const { notificationQuery, readOneMutation, readAllMutation } = useNotifications();

//   const notifications: NotificationItem[] = notificationQuery.data ?? [];

//   const read = 'text-gray-500';
//   const unread = 'text-white';

//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   // 단일 읽음 처리
//   const markAsRead = (id: number) => {
//     readOneMutation.mutate(id, {
//       onSuccess: () => toast.success('읽음 처리 완료'),
//       onError: () => toast.error('읽음 처리 실패'),
//     });
//   };

//   // 전체 읽음 처리
//   const markAllAsRead = () => {
//     readAllMutation.mutate(undefined, {
//       onSuccess: () => toast.success('모든 알림을 읽음 처리했습니다.'),
//       onError: () => toast.error('전체 읽음 처리 실패'),
//     });
//   };

//   return (
//     <div className="relative mt-12 text-white">
//       <div className="absolute top-[-70px] right-0 z-100 mt-10 flex items-center gap-3 border-gray-700 pb-4">
//         {unreadCount > 0 && (
//           <span className="ml-3 rounded-full bg-[#FF5126] px-3 py-1 text-sm font-bold">
//             안읽은 {unreadCount}개
//           </span>
//         )}
//         {unreadCount > 0 && (
//           <button
//             onClick={markAllAsRead}
//             className="rounded-md bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
//           >
//             전체 읽음
//           </button>
//         )}
//       </div>

//       {/* 로딩 */}
//       {notificationQuery.isLoading && (
//         <div className="flex items-center justify-center py-10 text-gray-400">불러오는 중...</div>
//       )}

//       {/* 에러 */}
//       {notificationQuery.isError && (
//         <div className="flex items-center justify-center py-10 text-red-400">
//           알림을 불러오지 못했습니다.
//         </div>
//       )}

//       {/* 데이터 */}
//       {!notificationQuery.isLoading && notifications.length === 0 ? (
//         <div className="flex items-center justify-center py-10 text-gray-400">알림이 없습니다.</div>
//       ) : (
//         notifications.map((bell) => (
//           <div
//             key={bell.id}
//             className="mx-2 flex flex-col gap-7 border-b border-gray-700 pt-5 pb-7"
//           >
//             <div className="flex justify-between">
//               <p className="font-medium">{bell.message}</p>
//               <p className={!bell.isRead ? unread : read}>{bell.isRead ? '읽음' : '안읽음'}</p>
//             </div>

//             <div className="flex justify-between text-sm text-gray-400">
//               <p>
//                 {new Date(bell.sentAt).toLocaleDateString('ko-KR', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                   weekday: 'long',
//                 })}
//               </p>

//               {!bell.isRead && (
//                 <button
//                   onClick={() => markAsRead(bell.id)}
//                   className="rounded-md bg-[#FF5126] px-3 py-1 text-xs font-semibold text-white hover:bg-[#ff734b]"
//                 >
//                   읽음 처리
//                 </button>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
//--------------------------------------------------------
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface NotificationItem {
  id: number;
  message: string;
  isRead: boolean;
  sentAt: string;
  type: string;
}

export default function NotificationConTainer() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      message: "새로운 공지사항이 등록되었습니다!",
      isRead: false,
      sentAt: "2025-11-01",
      type: "NOTICE",
    },
    {
      id: 2,
      message: "11월 이벤트 참여 안내 드립니다!",
      isRead: false,
      sentAt: "2025-11-05",
      type: "EVENT",
    },
    {
      id: 3,
      message: "회원 등급이 상승했습니다!",
      isRead: true,
      sentAt: "2025-10-20",
      type: "LEVEL",
    },
  ]);

  const read = "text-gray-500";
  const unread = "text-white";

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    toast.success("읽음 처리 완료");
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success("모든 알림을 읽음 처리했습니다.");
  };

  return (
    <div className="relative mt-15 text-white bg-black">
      <div className="absolute top-[-80px] right-0 z-100 mt-10 flex items-center gap-3 border-gray-700 pb-4">
        {unreadCount > 0 && (
          <span className="ml-3 rounded-full bg-[#FF5126] px-3 py-1 text-sm font-bold">
            안읽은 {unreadCount}개
          </span>
        )}
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="rounded-md bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
          >
            전체 읽음
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex items-center justify-center py-10 text-gray-400">
          알림이 없습니다.
        </div>
      ) : (
        notifications.map((bell) => (
          <div
            key={bell.id}
            className="mx-2 flex flex-col gap-7 border-b border-gray-700 pt-5 pb-7"
          >
            <div className="flex justify-between">
              <p className={!bell.isRead ? unread : read}>{bell.message}</p>
              <p className={!bell.isRead ? unread : read}>
                {bell.isRead ? "읽음" : "안읽음"}
              </p>
            </div>

            <div className="flex justify-between text-sm text-gray-400">
              <p>
                {new Date(bell.sentAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </p>

              {!bell.isRead && (
                <button
                  onClick={() => markAsRead(bell.id)}
                  className="rounded-md bg-[#FF5126] px-3 py-1 text-xs font-semibold text-white hover:bg-[#ff734b]"
                >
                  읽음 처리
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

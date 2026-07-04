import { useEffect, useState } from "react";

import {
  Bell,
} from "lucide-react";

import {
  getNotifications,
  markAsRead,
} from "../api/notification";

const NotificationBell = () => {

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [open, setOpen] =
    useState(false);

  useEffect(() => {

    loadNotifications();

  }, []);

  const loadNotifications =
    async () => {

      try {

        const res =
          await getNotifications();

        setNotifications(
          res.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  const unreadCount =
    notifications.filter(
      (n) => !n.isRead
    ).length;

  const handleRead =
    async (id: string) => {

      try {

        await markAsRead(id);

        loadNotifications();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div className="relative">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="relative"
      >

        <Bell size={24} />

        {unreadCount > 0 && (

          <span className="absolute -top-2 -right-2 bg-red-600 w-5 h-5 rounded-full text-xs flex items-center justify-center">

            {unreadCount}

          </span>

        )}

      </button>

      {open && (

        <div className="absolute right-0 mt-4 w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl z-50">

          <div className="p-4 border-b border-slate-800">

            <h2 className="font-bold text-xl">

              Notifications

            </h2>

          </div>

          <div className="max-h-96 overflow-y-auto">

            {notifications.length === 0 ? (

              <p className="p-6 text-center text-slate-400">

                No Notifications

              </p>

            ) : (

              notifications.map(
                (notification) => (

                  <div
                    key={
                      notification._id
                    }
                    className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800 ${
                      !notification.isRead
                        ? "bg-slate-800"
                        : ""
                    }`}
                    onClick={() =>
                      handleRead(
                        notification._id
                      )
                    }
                  >

                    <h3 className="font-semibold">

                      {
                        notification.title
                      }

                    </h3>

                    <p className="text-sm text-slate-400 mt-1">

                      {
                        notification.message
                      }

                    </p>

                    <p className="text-xs text-slate-500 mt-2">

                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                )
              )

            )}

          </div>

        </div>

      )}

    </div>

  );

};

import { memo } from "react";

export default memo(NotificationBell);
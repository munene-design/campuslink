import React from "react";
import { CalendarDays, Bell } from "lucide-react";
import { motion } from "framer-motion";

const updates = [
  {
    icon: "📣",
    text: "KUCCPS portal Is now closed.",
    badge: "Official",
  },
  {
    icon: "🛠️",
    text: "Policy updates for 2025 programs released.",
    badge: "New",
  },
  {
    icon: "⏰",
    text: "Deadline for applications is June 30th.",
    badge: "Urgent",
  },
];

export default function UpdatesSection() {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 px-6" id="next-section">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          <span className="inline-block mr-2 text-blue-600">
            <CalendarDays className="inline-block w-6 h-6" />
          </span>
          Latest KUCCPS Updates
        </h2>
        <p className="text-gray-600 mb-10">
          Stay informed with the most recent changes and announcements.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {updates.map((update, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{update.icon}</span>
                <div>
                  <p className="text-gray-800 text-base font-medium">{update.text}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full animate-pulse
                      ${
                        update.badge === "Official"
                          ? "bg-green-100 text-green-600"
                          : update.badge === "New"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                  >
                    {update.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center items-center gap-2 text-blue-700 font-semibold">
          <Bell className="w-5 h-5 animate-bounce" />
          More announcements coming soon!
        </div>
      </div>
    </section>
  );
}


"use client";

import {
  Calendar as CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  title: string;
  color: keyof typeof eventVariants;
  location?: string;
  attendees?: number;
}

const eventVariants = {
  blue: {
    bg: "bg-blue-500/20 dark:bg-blue-500/30",
    dot: "bg-blue-500",
    border: "border-blue-500/30",
  },
  purple: {
    bg: "bg-purple-500/20 dark:bg-purple-500/30",
    dot: "bg-purple-500",
    border: "border-purple-500/30",
  },
  pink: {
    bg: "bg-pink-500/20 dark:bg-pink-500/30",
    dot: "bg-pink-500",
    border: "border-pink-500/30",
  },
  green: {
    bg: "bg-green-500/20 dark:bg-green-500/30",
    dot: "bg-green-500",
    border: "border-green-500/30",
  },
} as const;

function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  totalEvents,
}: {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  totalEvents: number;
}) {
  return (
    <div className="flex w-full items-center justify-between px-6 py-4">
      <div className="space-y-1">
        <AnimatePresence mode="wait">
          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            className="font-semibold text-xl"
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: -10 }}
            key={currentDate.toISOString()}
            transition={{ duration: 0.2 }}
          >
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </motion.h2>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            animate={{ opacity: 1 }}
            className="text-xs text-zinc-500 dark:text-zinc-400"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key={`${currentDate.toISOString()}-count`}
            transition={{ duration: 0.2 }}
          >
            {totalEvents} {totalEvents === 1 ? "event" : "events"} this month
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex gap-1">
        <button
          className="rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={onPrevMonth}
          type="button"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          className="rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={onNextMonth}
          type="button"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function CalendarGrid({
  currentDate,
  events,
  selectedDate,
  onSelectDate,
}: {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}) {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const numberOfRows = 6;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="grid grid-cols-7 gap-2 bg-white p-2 dark:bg-zinc-950"
        exit={{ opacity: 0, x: 20 }}
        initial={{ opacity: 0, x: -20 }}
        key={currentDate.toISOString()}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            className="flex h-8 items-center justify-center text-center font-medium text-xs text-zinc-600 dark:text-zinc-400"
            key={day}
          >
            {day[0]}
          </div>
        ))}

        {Array.from({ length: numberOfRows * 7 }, (_, i) => {
          const dayIndex = i - firstDayOfMonth;
          const day =
            dayIndex >= 0 && dayIndex < daysInMonth
              ? new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  dayIndex + 1
                )
              : null;

          if (!day) {
            return (
              <div
                className="aspect-square rounded-xl bg-zinc-50/50 dark:bg-zinc-900/30"
                key={i}
              />
            );
          }

          const dayEvents = events.filter(
            (event) => event.date.toDateString() === day.toDateString()
          );
          const isToday = new Date().toDateString() === day.toDateString();
          const isSelected =
            selectedDate?.toDateString() === day.toDateString();

          return (
            <div className="relative" key={i}>
              {isSelected && (
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-xl border-2 border-fuchsia-500/70 dark:border-fuchsia-400/70"
                  layoutId="selected-day"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
              <button
                className={cn(
                  "aspect-square w-full rounded-xl p-1.5",
                  "bg-zinc-50 dark:bg-zinc-900/50",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800/70",
                  "flex flex-col items-start",
                  "transition-all duration-200 ease-in-out",
                  isSelected && "bg-fuchsia-50/50 dark:bg-fuchsia-900/10"
                )}
                onClick={() => onSelectDate(day)}
                type="button"
              >
                <span
                  className={cn(
                    "inline-flex h-5 w-5 items-center justify-center rounded-md font-medium text-xs",
                    isToday
                      ? "bg-fuchsia-600 text-white"
                      : "text-zinc-900 dark:text-zinc-100",
                    isSelected &&
                      !isToday &&
                      "bg-fuchsia-100 dark:bg-fuchsia-900/20"
                  )}
                >
                  {day.getDate()}
                </span>
                <div className="mt-1 flex w-full flex-col gap-1">
                  {dayEvents.slice(0, 1).map((event) => (
                    <div
                      className={cn(
                        "truncate rounded-md py-0.5 text-[10px] leading-tight",
                        "flex items-center gap-1 font-medium",
                        eventVariants[event.color].bg
                      )}
                      key={event.id}
                      title={`${event.title}\n${event.startTime} - ${event.endTime}`}
                    >
                      <Clock className="h-2.5 w-2.5" />
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 1 && (
                    <span className="px-1.5 font-medium text-[9px] text-zinc-500 dark:text-zinc-400">
                      +{dayEvents.length - 1} more
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

function EventList({
  events,
  selectedDate,
}: {
  events: CalendarEvent[];
  selectedDate: Date;
}) {
  const dayEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <ScrollArea className="h-75 md:h-150">
      <div className="px-4 pt-2">
        {isToday && (
          <Badge className="mb-4" variant="secondary">
            Today
          </Badge>
        )}
      </div>
      {dayEvents.length === 0 ? (
        <div className="flex h-75 flex-col items-center justify-center p-4 text-center">
          <CalendarIcon className="mb-2 h-8 w-8 text-zinc-300 dark:text-zinc-600" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No events scheduled
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            Time for a coffee break ☕️
          </p>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {dayEvents.map((event) => (
            <div
              className={cn(
                "rounded-lg border p-3 transition-all duration-200",
                "hover:shadow-md",
                eventVariants[event.color].bg,
                eventVariants[event.color].border
              )}
              key={event.id}
            >
              <div className="flex items-start gap-2">
                <div
                  className={cn(
                    "mt-2 h-2 w-2 rounded-full",
                    eventVariants[event.color].dot
                  )}
                />
                <div className="flex-1 space-y-2">
                  <div>
                    <h4 className="mb-1 font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <Clock className="h-3 w-3" />
                      <span>
                        {event.startTime} - {event.endTime}
                      </span>
                    </div>
                  </div>
                  {(event.location || event.attendees) && (
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}


export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const baseDate = new Date();
    return [
      {
        id: "1",
        date: baseDate,
        startTime: "09:00",
        endTime: "10:30",
        title: "Team Stand-up",
        color: "blue",
        location: "Main Room",
        attendees: 8,
      },
      {
        id: "2",
        date: baseDate,
        startTime: "11:00",
        endTime: "12:00",
        title: "Client Meeting",
        color: "purple",
      },
      {
        id: "3",
        date: new Date(baseDate.setDate(baseDate.getDate() + 2)),
        startTime: "14:00",
        endTime: "15:30",
        title: "Product Review",
        color: "pink",
      },
      {
        id: "4",
        date: new Date(baseDate.setDate(baseDate.getDate() + 1)),
        startTime: "10:00",
        endTime: "11:00",
        title: "Design Workshop",
        color: "green",
      },
      {
        id: "5",
        date: new Date(baseDate.setDate(baseDate.getDate() + 3)),
        startTime: "15:00",
        endTime: "16:00",
        title: "Sprint Planning",
        color: "blue",
      },
      {
        id: "6",
        date: baseDate,
        startTime: "13:00",
        endTime: "14:00",
        title: "Lunch & Learn",
        color: "purple",
      },
      {
        id: "7",
        date: new Date(baseDate.setDate(baseDate.getDate() + 1)),
        startTime: "16:00",
        endTime: "17:00",
        title: "Code Review",
        color: "pink",
      },
      {
        id: "8",
        date: new Date(baseDate.setDate(baseDate.getDate() + 2)),
        startTime: "09:30",
        endTime: "10:30",
        title: "Team Building",
        color: "green",
      },
    ];
  });

  function handlePrevMonth() {
    setCurrentDate((prev) => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      updateEventsForMonth(newDate);
      return newDate;
    });
  }

  function handleNextMonth() {
    setCurrentDate((prev) => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      updateEventsForMonth(newDate);
      return newDate;
    });
  }

  function updateEventsForMonth(newDate: Date) {
    const updatedEvents = events.map((event) => ({
      ...event,
      date: new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        Math.min(
          new Date(event.date).getDate(),
          new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()
        )
      ),
    }));
    setEvents(updatedEvents);
  }

  const currentMonthEvents = events.filter(
    (event) =>
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
  );

  return (
    <div className="flex w-full flex-col-reverse gap-4 p-4 md:flex-row">
      <Card className="max-w-full flex-1 md:max-w-200">
        <CalendarHeader
          currentDate={currentDate}
          onNextMonth={handleNextMonth}
          onPrevMonth={handlePrevMonth}
          totalEvents={currentMonthEvents.length}
        />
        <CalendarGrid
          currentDate={currentDate}
          events={events}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </Card>

      <Card className="w-full md:w-80">
        <div className="border-b px-4 py-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-sm">
                <CalendarIcon className="h-4 w-4 text-zinc-500" />
                {selectedDate.toLocaleString("default", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <p className="mt-1 text-xs text-zinc-500">
                {(() => {
                  const today = new Date();
                  const normalizedToday = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  );
                  const normalizedSelected = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate()
                  );
                  const diffDays = Math.round(
                    (normalizedSelected.getTime() - normalizedToday.getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  if (diffDays === 0) return "";
                  if (diffDays > 0)
                    return `In ${diffDays} ${diffDays === 1 ? "day" : "days"}`;
                  return `${Math.abs(diffDays)} ${
                    Math.abs(diffDays) === 1 ? "day" : "days"
                  } ago`;
                })()}
              </p>
            </div>
            <button
              className="h-7 rounded-md bg-fuchsia-50 px-3 font-medium text-fuchsia-600 text-xs transition-colors hover:bg-fuchsia-100 dark:bg-fuchsia-900/20 dark:text-fuchsia-400 dark:hover:bg-fuchsia-900/30"
              type="button"
            >
              Add event
            </button>
          </div>
        </div>
        <EventList events={events} selectedDate={selectedDate} />
      </Card>
    </div>
  );
}

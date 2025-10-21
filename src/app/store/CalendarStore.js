'use client';
import { create } from "zustand";
import ICAL from "ical.js";
import Backend from "../api/Backend";

/**
 * Calendar storage. This is used for storing all the information about the calendar and adding new events.
 */
export const useCalendarStore = create((set, get) => ({
    icalURL: "",
    events: {},
    currentDayEvents: [],
    isRefreshing: false,
    currentPlannedEvents: [],
    chatLog:{},

    setCurrentPlannedEvents: (currentPlannedEvents) => {
        set({ currentPlannedEvents: currentPlannedEvents});
    },

    setCurrentDayEvents: (currentDayEvents) => {
        set({currentDayEvents: currentDayEvents});
    },

    setChatLog: (chatLog) => {
        set({...get(), chatLog: chatLog});
    },

    setUrl: (url) => {
        set({ ...get(), icalURL: url });
        get().refresh();
    },

    syncToStorage: (inState) => {
        if (inState == null) inState = get();
        localStorage.setItem("calendar", JSON.stringify(inState))
    },

    loadFromStorage: () => {
        try {
            const state = localStorage.getItem("calendar");
            if (state != null){
                let stateParsed = JSON.parse(state);
                stateParsed["events"] = undefined;
                set(stateParsed)
            }
            get().refresh()

        } catch (e) {
            console.log("Failed to load the state." + e)
        }
    },


    /**
     * Fetch an iCal file from the web.
     */
    refresh: async () => {

        set({ ...get(), isRefreshing: true });

        try {
            const icsData = await Backend.fetchICS(get().icalURL);

            let events = {};

            const addEvent = (event) => {
                let startDate = new Date(event.startDate.toJSDate());
                startDate.setHours(0,0,0,0);

                let endDate = new Date(event.endDate.toJSDate())
                endDate.setHours(0,0,0,0);

                let i = new Date(startDate);

                while (i <= endDate) {
                    let key = i.getTime()
                    if (events[key] == undefined) {
                        events[key] = []
                    }
                    events[key].push(event);
                    i.setTime(i.getTime() + 864e5);
                }
            }

            const parsedData = ICAL.parse(icsData);
            const componentizedData = new ICAL.Component(parsedData)

            for (const event of componentizedData.getAllSubcomponents("vevent")) {
                try {
                    const typedEvent = new ICAL.Event(event);
                    addEvent(typedEvent);
                } catch (err) {
                    console.warn("Could not add an event:" + err)
                }

            }

            let newState = {
                ...get(),
                events: events,
                isRefreshing: false
            }

            set(newState);
            get().syncToStorage(null);

        } catch (err) {
            console.error("Failed to fetch calendar:", err);
            return
        }

    }
}));
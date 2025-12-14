// File: src/data/nextEvents.js

const nextEvents = [
    {
        dayName: "Saturday",
        date: 13, // The number
        events: [
            { time: "7:15am", description: "Breakfast" },

            { time: "7:45am", description: "Bus to course" },
            { time: "9:20am", description: "Round 1 (Indian Wells)" },
        ],
    },
    {
        dayName: "Sunday",
        date: 14,
        events: [
            { time: "7:00am", description: "Breakfast" },
            { time: "7:30am", description: "Bus to course" },
            { time: "8:47am", description: "Round 2 Tee (Nicklaus)"},
            { time: "3:30pm", description: "Roundtable Pizza" },

        ],
    },
    {
        dayName: "Monday",
        date: 15,
        events: [
            { time: "TBD", description: "Breakfast" },
            { time: "TBD", description: "Bus to course" },
            { time: "TBD", description: "Round 3 Tee (Stadium)" },
        ],
    },
];

export default nextEvents;
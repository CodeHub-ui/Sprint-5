import { generateId } from "../utils/helpers.js";
const seedTasks = [
  {
    id: generateId(),
    title: "Fix VPN handshake timeout",
    description: "Remote users on 5.x client drop after ~90s on WPA3 networks.",
    priority: "High",
    status: "To Do",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Patch Tuesday rollout",
    description: "Stage KB5041 across the finance department test ring.",
    priority: "Medium",
    status: "To Do",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Onboard new hire laptop",
    description: "Image, enroll in MDM and hand off to facilities for desk 214.",
    priority: "Low",
    status: "In Progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Replace switch in server room B",
    description: "Port 14 flapping on the access switch, likely failing hardware.",
    priority: "High",
    status: "In Progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Archive Q2 ticket exports",
    description: "Move closed tickets older than 90 days to cold storage.",
    priority: "Low",
    status: "Done",
    createdAt: new Date().toISOString(),
  },
];

export const initialState = {
  tasks: seedTasks,
  theme: "light",
  search: "",
  priorityFilter: "all",
};

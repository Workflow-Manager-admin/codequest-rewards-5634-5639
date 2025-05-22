/**
 * Mock data for CodeQuest Rewards application
 * This file contains mock data that simulates the real data that would be fetched from an API
 */

// User data with reviewer statistics
export const users = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Senior Developer",
    department: "Frontend",
    points: 520,
    bugsFound: 28,
    mergeRequestsReviewed: 45,
    achievements: ["Bug Hunter", "Consistency King", "Detail Detective"],
    level: 5
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "Backend Engineer",
    department: "Backend",
    points: 680,
    bugsFound: 34,
    mergeRequestsReviewed: 52,
    achievements: ["Bug Hunter", "Code Wizard", "Reliability Champion"],
    level: 7
  },
  {
    id: 3,
    name: "Mohammed Ali",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "DevOps Engineer",
    department: "Infrastructure",
    points: 310,
    bugsFound: 15,
    mergeRequestsReviewed: 28,
    achievements: ["Early Bird", "Security Sentinel"],
    level: 3
  },
  {
    id: 4,
    name: "Lisa Chen",
    avatar: "https://i.pravatar.cc/150?img=4",
    role: "Full Stack Developer",
    department: "Product",
    points: 750,
    bugsFound: 42,
    mergeRequestsReviewed: 68,
    achievements: ["Bug Hunter", "Code Wizard", "Consistency King", "Top Reviewer"],
    level: 8
  },
  {
    id: 5,
    name: "Jake Miller",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "QA Engineer",
    department: "Quality",
    points: 630,
    bugsFound: 37,
    mergeRequestsReviewed: 41,
    achievements: ["Bug Hunter", "Detail Detective", "Security Sentinel"],
    level: 6
  }
];

// Projects with associated merge requests
export const projects = [
  {
    id: 101,
    name: "User Dashboard Redesign",
    description: "Redesigning the user dashboard for better user experience",
    team: "Frontend",
    activeMRs: 5,
    totalMRs: 12
  },
  {
    id: 102,
    name: "API Performance Optimization",
    description: "Improving API performance and reducing latency",
    team: "Backend",
    activeMRs: 8,
    totalMRs: 23
  },
  {
    id: 103,
    name: "CI/CD Pipeline Upgrade",
    description: "Upgrading the CI/CD pipeline for faster deployments",
    team: "Infrastructure",
    activeMRs: 3,
    totalMRs: 14
  },
  {
    id: 104,
    name: "Authentication Service",
    description: "Building a new authentication service",
    team: "Security",
    activeMRs: 6,
    totalMRs: 17
  }
];

// Merge requests with bugs/issues found
export const mergeRequests = [
  {
    id: 1001,
    title: "Add user profile settings page",
    projectId: 101,
    author: {
      id: 3,
      name: "Mohammed Ali"
    },
    status: "Open",
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2023-10-18T14:20:00Z",
    reviewers: [
      {
        id: 1,
        name: "Alex Johnson",
        status: "Approved"
      },
      {
        id: 4,
        name: "Lisa Chen",
        status: "Reviewing"
      }
    ],
    bugsFound: [
      {
        id: 10001,
        description: "Missing form validation for email field",
        severity: "Medium",
        foundBy: 1,
        points: 20,
        status: "Validated"
      },
      {
        id: 10002,
        description: "Password requirements not enforced",
        severity: "High",
        foundBy: 4,
        points: 40,
        status: "Validated"
      }
    ]
  },
  {
    id: 1002,
    title: "Implement caching for API responses",
    projectId: 102,
    author: {
      id: 2,
      name: "Sarah Williams"
    },
    status: "Merged",
    createdAt: "2023-10-10T09:15:00Z",
    updatedAt: "2023-10-14T16:45:00Z",
    reviewers: [
      {
        id: 5,
        name: "Jake Miller",
        status: "Approved"
      }
    ],
    bugsFound: [
      {
        id: 10003,
        description: "Cache invalidation not working properly",
        severity: "High",
        foundBy: 5,
        points: 50,
        status: "Validated"
      }
    ]
  },
  {
    id: 1003,
    title: "Update Docker configurations for prod environment",
    projectId: 103,
    author: {
      id: 1,
      name: "Alex Johnson"
    },
    status: "Open",
    createdAt: "2023-10-16T14:20:00Z",
    updatedAt: "2023-10-18T11:30:00Z",
    reviewers: [
      {
        id: 3,
        name: "Mohammed Ali",
        status: "Requested Changes"
      }
    ],
    bugsFound: [
      {
        id: 10004,
        description: "Incorrect memory limits for containers",
        severity: "Medium",
        foundBy: 3,
        points: 30,
        status: "Validated"
      },
      {
        id: 10005,
        description: "Missing environment variables for logging",
        severity: "Low",
        foundBy: 3,
        points: 10,
        status: "Pending"
      }
    ]
  },
  {
    id: 1004,
    title: "Implement JWT authentication",
    projectId: 104,
    author: {
      id: 5,
      name: "Jake Miller"
    },
    status: "Open",
    createdAt: "2023-10-17T08:45:00Z",
    updatedAt: "2023-10-18T09:30:00Z",
    reviewers: [
      {
        id: 2,
        name: "Sarah Williams",
        status: "Reviewing"
      },
      {
        id: 4,
        name: "Lisa Chen",
        status: "Approved"
      }
    ],
    bugsFound: [
      {
        id: 10006,
        description: "Token expiration not handled correctly",
        severity: "High",
        foundBy: 2,
        points: 45,
        status: "Validated"
      },
      {
        id: 10007,
        description: "Missing refresh token mechanism",
        severity: "Medium",
        foundBy: 4,
        points: 25,
        status: "Validated"
      }
    ]
  }
];

// Achievement definitions and descriptions
export const achievements = [
  {
    id: "bug-hunter",
    name: "Bug Hunter",
    description: "Found more than 20 bugs in merge requests",
    icon: "🐛",
    threshold: 20
  },
  {
    id: "code-wizard",
    name: "Code Wizard",
    description: "Found complex bugs that were difficult to identify",
    icon: "🧙‍♂️",
    threshold: 5
  },
  {
    id: "consistency-king",
    name: "Consistency King",
    description: "Reviewed merge requests consistently for 30 days",
    icon: "👑",
    threshold: 30
  },
  {
    id: "detail-detective",
    name: "Detail Detective",
    description: "Found subtle bugs that others missed",
    icon: "🔍",
    threshold: 10
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "First to review merge requests 15 times",
    icon: "🐦",
    threshold: 15
  },
  {
    id: "reliability-champion",
    name: "Reliability Champion",
    description: "Found bugs that would have affected system reliability",
    icon: "🏆",
    threshold: 8
  },
  {
    id: "security-sentinel",
    name: "Security Sentinel",
    description: "Found security vulnerabilities in code reviews",
    icon: "🛡️",
    threshold: 5
  },
  {
    id: "top-reviewer",
    name: "Top Reviewer",
    description: "In the top 10% of reviewers by points",
    icon: "⭐",
    threshold: null
  }
];

// Point system configuration
export const pointSystem = {
  bugSeverity: {
    Low: 10,
    Medium: 25,
    High: 50,
    Critical: 100
  },
  bonuses: {
    firstReview: 5,
    quickResponse: 10,
    thoroughReview: 15
  },
  levels: [
    { level: 1, minPoints: 0, maxPoints: 100, title: "Rookie Reviewer" },
    { level: 2, minPoints: 101, maxPoints: 250, title: "Code Observer" },
    { level: 3, minPoints: 251, maxPoints: 400, title: "Bug Spotter" },
    { level: 4, minPoints: 401, maxPoints: 500, title: "Quality Guardian" },
    { level: 5, minPoints: 501, maxPoints: 650, title: "Review Specialist" },
    { level: 6, minPoints: 651, maxPoints: 800, title: "Code Master" },
    { level: 7, minPoints: 801, maxPoints: 1000, title: "Review Expert" },
    { level: 8, minPoints: 1001, maxPoints: 1500, title: "Bug Hunter Elite" },
    { level: 9, minPoints: 1501, maxPoints: 2000, title: "Quality Champion" },
    { level: 10, minPoints: 2001, maxPoints: null, title: "Legendary Reviewer" }
  ]
};

// Recent activity feed
export const recentActivity = [
  {
    id: 1,
    type: "bug_found",
    user: users[0],
    details: {
      bugId: 10001,
      mergeRequestId: 1001,
      description: "Found a missing form validation issue",
      points: 20
    },
    timestamp: "2023-10-18T14:20:00Z"
  },
  {
    id: 2,
    type: "achievement_earned",
    user: users[3],
    details: {
      achievementId: "top-reviewer",
      name: "Top Reviewer",
      description: "In the top 10% of reviewers by points"
    },
    timestamp: "2023-10-18T10:15:00Z"
  },
  {
    id: 3,
    type: "level_up",
    user: users[2],
    details: {
      oldLevel: 2,
      newLevel: 3,
      title: "Bug Spotter"
    },
    timestamp: "2023-10-17T16:40:00Z"
  },
  {
    id: 4,
    type: "bug_found",
    user: users[4],
    details: {
      bugId: 10006,
      mergeRequestId: 1004,
      description: "Identified a token expiration handling issue",
      points: 45
    },
    timestamp: "2023-10-17T09:30:00Z"
  },
  {
    id: 5,
    type: "bug_found",
    user: users[1],
    details: {
      bugId: 10003,
      mergeRequestId: 1002,
      description: "Found cache invalidation problem",
      points: 50
    },
    timestamp: "2023-10-14T16:45:00Z"
  }
];

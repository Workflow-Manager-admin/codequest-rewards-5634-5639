import React, { createContext, useState, useContext, useEffect } from 'react';
import { users, projects, mergeRequests, achievements, pointSystem, recentActivity } from '../data/mockData';

// Create context
const AppContext = createContext();

/**
 * AppProvider component that wraps the application to provide global state
 */
export const AppProvider = ({ children }) => {
  // State for users
  const [allUsers, setAllUsers] = useState(users);
  
  // State for projects
  const [allProjects, setAllProjects] = useState(projects);
  
  // State for merge requests
  const [allMergeRequests, setAllMergeRequests] = useState(mergeRequests);
  
  // State for achievements
  const [allAchievements, setAllAchievements] = useState(achievements);
  
  // State for point system
  const [pointSystemConfig, setPointSystemConfig] = useState(pointSystem);
  
  // State for activity feed
  const [activityFeed, setActivityFeed] = useState(recentActivity);
  
  // State for selected user
  const [selectedUser, setSelectedUser] = useState(null);
  
  // State for selected project
  const [selectedProject, setSelectedProject] = useState(null);
  
  // State for selected merge request
  const [selectedMergeRequest, setSelectedMergeRequest] = useState(null);

  // Calculate leaderboard based on user points
  const [leaderboard, setLeaderboard] = useState([]);

  // Effect to initialize leaderboard
  useEffect(() => {
    const sortedUsers = [...allUsers].sort((a, b) => b.points - a.points);
    setLeaderboard(sortedUsers);
  }, [allUsers]);

  /**
   * Get user information by ID
   * @param {number} userId - The ID of the user to retrieve
   * @returns {object|null} User object or null if not found
   */
  const getUserById = (userId) => {
    return allUsers.find(user => user.id === userId) || null;
  };

  /**
   * Get project information by ID
   * @param {number} projectId - The ID of the project to retrieve
   * @returns {object|null} Project object or null if not found
   */
  const getProjectById = (projectId) => {
    return allProjects.find(project => project.id === projectId) || null;
  };

  /**
   * Get merge request information by ID
   * @param {number} mrId - The ID of the merge request to retrieve
   * @returns {object|null} Merge request object or null if not found
   */
  const getMergeRequestById = (mrId) => {
    return allMergeRequests.find(mr => mr.id === mrId) || null;
  };

  /**
   * Get achievement information by ID
   * @param {string} achievementId - The ID of the achievement to retrieve
   * @returns {object|null} Achievement object or null if not found
   */
  const getAchievementById = (achievementId) => {
    return allAchievements.find(achievement => achievement.id === achievementId) || null;
  };

  /**
   * Get all merge requests for a specific project
   * @param {number} projectId - The ID of the project
   * @returns {array} Array of merge request objects
   */
  const getMergeRequestsByProject = (projectId) => {
    return allMergeRequests.filter(mr => mr.projectId === projectId);
  };

  /**
   * Get all merge requests reviewed by a specific user
   * @param {number} userId - The ID of the user
   * @returns {array} Array of merge request objects
   */
  const getMergeRequestsByReviewer = (userId) => {
    return allMergeRequests.filter(mr => 
      mr.reviewers.some(reviewer => reviewer.id === userId)
    );
  };

  /**
   * Get all bugs found by a specific user
   * @param {number} userId - The ID of the user
   * @returns {array} Array of bug objects with merge request information
   */
  const getBugsByUser = (userId) => {
    const bugs = [];
    allMergeRequests.forEach(mr => {
      mr.bugsFound.forEach(bug => {
        if (bug.foundBy === userId) {
          bugs.push({
            ...bug,
            mergeRequestId: mr.id,
            mergeRequestTitle: mr.title,
            projectId: mr.projectId
          });
        }
      });
    });
    return bugs;
  };

  /**
   * Get user level information based on points
   * @param {number} points - The number of points the user has
   * @returns {object} Level information including level number and title
   */
  const getLevelInfo = (points) => {
    for (const level of pointSystemConfig.levels) {
      if (points >= level.minPoints && 
          (level.maxPoints === null || points <= level.maxPoints)) {
        return level;
      }
    }
    return pointSystemConfig.levels[0]; // Default to level 1 if not found
  };

  // Context value
  const contextValue = {
    users: allUsers,
    projects: allProjects,
    mergeRequests: allMergeRequests,
    achievements: allAchievements,
    pointSystem: pointSystemConfig,
    activityFeed,
    leaderboard,
    selectedUser,
    selectedProject,
    selectedMergeRequest,
    setSelectedUser,
    setSelectedProject,
    setSelectedMergeRequest,
    getUserById,
    getProjectById,
    getMergeRequestById,
    getAchievementById,
    getMergeRequestsByProject,
    getMergeRequestsByReviewer,
    getBugsByUser,
    getLevelInfo
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to use the AppContext
 * @returns {object} Context value
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
